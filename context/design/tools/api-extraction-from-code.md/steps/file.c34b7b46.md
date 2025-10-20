---
timestamp: 'Mon Oct 20 2025 01:10:53 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251020_011053.f6c54b3e.md]]'
content_id: c34b7b4630e0aaed1574c071f77bad619a85f556e954cb290cd90eab7f61038e
---

# file: src\concepts\ZhuyinDictionary\ZhuyinDictionaryConcept.ts

```typescript
import { Collection, Db } from "npm:mongodb";
import { Character, Empty, ZhuyinRep } from "@utils/types.ts";

// Internal entity type representing a character entry in the dictionary
interface CharacterEntry {
  _id: Character; // The character itself acts as the unique identifier
  zhuyinRep: ZhuyinRep;
}

/**
 * @concept ZhuyinDictionary
 * @purpose Track Characters and their Zhuyin Representation
 */
export default class ZhuyinDictionaryConcept {
  private readonly charactersCollection: Collection<CharacterEntry>;
  private readonly PREFIX = "ZhuyinDictionary" + ".";

  constructor(private readonly db: Db) {
    this.charactersCollection = this.db.collection(this.PREFIX + "characters");
  }

  /**
   * **action** register (character: Character, zhuyinRep: ZhuyinRep)
   *
   * @requires Character doesn't already exist
   * @effects add Character and associate with that ZhuyinRep
   */
  async register(
    { character, zhuyinRep }: {
      character: Character;
      zhuyinRep: ZhuyinRep;
    },
  ): Promise<Empty | { error: string }> {
    // Check if character already exists
    const existing = await this.charactersCollection.findOne({
      _id: character,
    });
    if (existing) {
      return { error: `Character '${character}' already registered.` };
    }

    // Insert the new character and its Zhuyin representation
    await this.charactersCollection.insertOne({ _id: character, zhuyinRep });

    console.log(`REGISTERED ${character} --> ${zhuyinRep}`);
    return {};
  }

  /**
   * **action** unregister (character: Character)
   *
   * @requires Character already exist
   * @effects remove Character and corresponding ZhuyinRep
   */
  async unregister(
    { character }: {
      character: Character;
    },
  ): Promise<Empty | { error: string }> {
    // Check if character exists
    const existing = await this.charactersCollection.findOne({
      _id: character,
    });
    if (!existing) {
      return { error: `Character '${character}' not found.` };
    }

    // Delete the character entry
    await this.charactersCollection.deleteOne({ _id: character });

    console.log(`UNREGISTERED ${character}`);
    return {};
  }

  /**
   * **action** getAnswer (character: Character): (zhuyinRep: ZhuyinRep)
   *
   * @requires Character exists
   * @effects returns the ZhuyinRep associated with the Character
   */
  async getAnswer(
    { character }: {
      character: Character;
    },
  ): Promise<{ zhuyinRep: ZhuyinRep } | { error: string }> {
    console.log(`RETRIEVING ${character}...`);
    const entry = await this.charactersCollection.findOne({ _id: character });
    if (!entry) {
      return {
        error: `Zhuyin representation for character '${character}' not found.`,
      };
    }

    console.log(`RETRIEVED ${entry.zhuyinRep} for ${character}`);
    return { zhuyinRep: entry.zhuyinRep };
  }

  /**
   * **action** lookupZhuyin (zhuyinRep: ZhuyinRep): (characters: Character[])
   *
   * @effects Returns a list of all Characters whose Zhuyin representation matches zhuyinRep.
   * The pattern can be a full Zhuyin string, a partial prefix, or even support wildcards for more advanced search.
   * This allows users to find all characters with a specific pronunciation.
   */
  async lookupZhuyin(
    { zhuyinRep }: { zhuyinRep: ZhuyinRep },
  ): Promise<{ characters: Character[] }> {
    // For "partial prefix" and "wildcards", we use a regex query.
    // The given zhuyinRep is treated as a prefix.
    const query = { zhuyinRep: { $regex: `^${zhuyinRep}`, $options: "i" } }; // Case-insensitive prefix match

    const entries = await this.charactersCollection.find(query).toArray();
    const characters = entries.map((entry) => entry._id);

    console.log(
      `LOOKUP ${zhuyinRep} FOUND [${characters}]`,
    );
    return { characters };
  }
}

```

## Quiz

Specification:

**concept** Quiz \[Character, ZhuyinRep]

**purpose** To enable users to practice and improve their Zhuyin typing skills by providing immediate and aggregated feedback on their speed and accuracy for individual characters.

**principle** If a user starts a quiz, answers multiple questions, and when the timer runs out they will receive a summary of their performance, including overall average speed and accuracy, and a list of specific characters they struggled with, allowing them to focus their practice.

**state**\
a set of QuizEntries with\
  a quizId String\
  a length Number (seconds)\
  a questionList set of Questions\
  a incorrectList set of IncorrectRecords\
  an activeQuestionId String\
  a questionCount Number\
  a completedCount Number\
  an avgSpeed Number\
  an avgAccuracy Number\
  an expiryTime DateTime?

a set of Questions with\
  an questionId String\
  a character Character\
  a target ZhuyinRep\
  a response ZhuyinRep?\
  a startTime DateTime?\
  an endTime DateTime?\
  a speed Number?\
  a correct Boolean?

a set of IncorrectRecords with\
  a character Character\
  a target ZhuyinRep\
  a response ZhuyinRep

**actions**\
makeQuiz (length: Number): quizId: String\
  effects create a new QuizEntry with new quizId, length=length, empty questionList, empty incorrectList, activeQuestionId = "", questionCount=0, completedCount=0, avgSpeed=0, avdAccuracy=0. expiryTime unset. Return quizId.

endQuiz (quizId: String): {\[avgSpeed: Number, avgAccuracy: Number, incorrectRecords\[]]}\
  requires expiryTime < current time\
  effects set activeQuestionId to "time's up", return \[avgSpeed, avgAccuracy, incorrectList] corresponding to quizId

registerQuestion (quizId: String, Character, ZhuyinRep): (questionId: String)\
  requires quizId exists, Character and ZhuyinRep are a valid pair in ZhuyinDict\
  effects\
  Get QuizEntry with quizId.\
  Generate a questionId.\
  Create new Question with questionId, Character, and target ZhuyinRep, other fields unset.\
  Set QuizEntry questionCount += 1.\
  Add questionId to QuizEntry questionList.\
  Return questionId.

startQuestion (quizId: String, questionId: String)\
  requires questionId in QuizEntry questionList, QuizEntry activeQuestionId is empty string\
  effects\
  get QuizEntry corresponding to quizId\
  if expiryTime unset: set expiryTime = current time + length (in essence, begin quiz when user attempts first question)\
  update startTime of coresponding Question to current time\
  set QuizEntry activeQuestionId = questionId

submitAnswer (quizId, questionId: String, response: ZhuyinRep)\
  requires QuizEntry activeQuestionId === questionId\
  effects\
  set Question endTime = current time\
  set Question response = response\
  set Question speed = endTime - startTime (in milliseconds)\
  set Question correct = (response = target)\
  set QuizEntry activeQuestionId = "" (empty string)\
  set QuizEntry completedCount += 1\
  if correct == False: create new IncorrectRecord and add to Quiz incorrectList\
  set QuizEntry avgSpeed = *new avg speed calculated by [incremental average formula](#incremental-average-formula)*\
  set QuizEntry avgAccuracy = *new avg accuracy calculated by [incremental average formula](#incremental-average-formula)*

**sync** registerQuestion\
*when*\
  Quiz.registerQuestion (Character, providedZhuyinRep: ZhuyinRep)\
*where*\
  ZhuyinDictionary.getAnswer(Character): (registeredZhuyinRep: ZhuyinRep)\
*then*\
  if providedZhuyinRep === registeredZhuyinRep: Quiz.registerQuestion(Character, registeredZhuyinRep: ZhuyinRep): (questionId: String)\
  else: error

**sync** endQuiz\
*when*\
  system.currentTime == QuizEntry.expiryTime\
*then*\
  Quiz.endQuiz()

**NOTES**

#### Incremental average formula:

( Old Average \* Old Count + New Value ) / New Count

Code:
