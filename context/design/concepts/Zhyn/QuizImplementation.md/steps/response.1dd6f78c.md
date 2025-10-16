---
timestamp: 'Wed Oct 15 2025 14:22:04 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251015_142204.b5b07aa4.md]]'
content_id: 1dd6f78c3500897ed570ca998e0a883ed6c3418934c597a56aa554e57eee12de
---

# response:

The provided update focuses on modifying the `register` action of the `Quiz` concept and introducing a `sync` rule.

### Analysis of Changes:

1. **`Quiz.register` action update:**
   * The `requires` clause `Character and ZhuyinRep are a valid pair in ZhuyinDict` has been added.
   * **Important Consideration:** The core principle of concept design is *independence*. A concept should not directly reference or depend on the internal state or actions of another concept. Therefore, the `QuizConcept` implementation itself *cannot* directly perform the validation against `ZhuyinDictionary`.
   * **Interpretation:** The `requires` clause here is a *system-level precondition* that is expected to be enforced *externally* by mechanisms like the provided `sync`. The `QuizConcept`'s `register` action will assume its inputs (`character` and `zhuyinRep`) are already valid according to the `ZhuyinDictionary`. The implementation should primarily update its internal documentation to reflect this `requires` clause.

2. **`sync register` definition:**
   * This sync rule illustrates *how* the `requires` clause for `Quiz.register` would be enforced at a higher level of orchestration.
   * **Critical Detail:** As per the concept design principles (e.g., the `DeletePost` example using `Request` concept), the `when` clause of a `sync` typically listens for a *request* or an *external event*, not the ultimate concept action itself, if that action is subsequently triggered in the `then` clause.
   * The provided `sync` definition:
     ```
     when Quiz.register (Character, providedZhuyinRep: ZhuyinRep)
     ...
     then if providedZhuyinRep === registeredZhuyinRep: Quiz.register(Character, registeredZhuyinRep: ZhuyinRep): (questionId: String)
     ```
     This shows `Quiz.register` in both `when` and `then` clauses. In a strict interpretation, this creates a recursive trigger or assumes `Quiz.register` is both a request and the final action. A more robust and common pattern would be for the `when` clause to listen to an action from a pseudo-concept (e.g., `Request.registerQuizQuestion`), and then `then` clause to call the actual `Quiz.register` action.
   * **Impact on `QuizConcept.ts`:** The `sync` rule itself is an external composition mechanism and does *not* translate into code within the `QuizConcept.ts` file. The `QuizConcept` remains independent, its `register` method focusing solely on its own state updates.

### Implementation Update for `QuizConcept.ts`:

Based on the above, the primary change within `QuizConcept.ts` will be updating the JSDoc comments for the `register` action to include the new `requires` clause. The logical implementation of the `register` action remains the same, as it assumes the validity of its inputs due to external orchestration (the `sync`).

Additionally, I'll fix the `speed` calculation in `submitAnswer` to be robust, as `startTime` is guaranteed to exist by its `requires` clause.

```typescript
// file: src\concepts\Quiz\QuizConcept.ts

import { Collection, Db } from "npm:mongodb";
import { Empty, ID } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";

// Generic types for this concept, matching the specification.
export type Character = ID;
export type ZhuyinRep = ID;

// Internal entity type representing a quiz question.
// Corresponds to "a set of Questions" in the state description.
interface QuestionEntry {
  _id: ID; // questionId will be stored here
  character: Character;
  targetZhuyinRep: ZhuyinRep;
  response?: ZhuyinRep; // Optional, as it's set later
  startTime?: Date; // Optional, as it's set later
  endTime?: Date; // Optional, as it's set later
  speed?: number; // Optional, calculated later
  correct?: boolean; // Optional, calculated later
}

/**
 * @concept Quiz [Character, ZhuyinRep]
 * @purpose track User's Zhuyin typing ability
 * @principle track the speed and accuracy for each Character that user typed
 */
export default class QuizConcept {
  private readonly questionsCollection: Collection<QuestionEntry>;
  private readonly PREFIX = "Quiz" + ".";

  constructor(private readonly db: Db) {
    this.questionsCollection = this.db.collection(this.PREFIX + "questions");
  }

  /**
   * **action** register (character: Character, zhuyinRep: ZhuyinRep): (questionId: ID)
   *
   * @requires Character and ZhuyinRep are a valid pair in ZhuyinDict
   * @effects Generate a questionId. Create a new Question with questionId,
   * associated character and target ZhuyinRep, other fields unset. Return questionId.
   */
  async register(
    { character, zhuyinRep }: { character: Character; zhuyinRep: ZhuyinRep },
  ): Promise<{ questionId: ID }> {
    const questionId = freshID();
    await this.questionsCollection.insertOne({
      _id: questionId,
      character,
      targetZhuyinRep: zhuyinRep,
      // Other fields (response, startTime, endTime, speed, correct) are intentionally unset
    });
    return { questionId };
  }

  /**
   * **action** startQuestion (questionId: ID)
   *
   * @requires Question exists and not already started (startTime is unset)
   * @effects update startTime of corresponding Question to current time
   */
  async startQuestion(
    { questionId }: { questionId: ID },
  ): Promise<Empty | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.startTime) {
      return { error: `Question '${questionId}' has already been started.` };
    }

    await this.questionsCollection.updateOne(
      { _id: questionId },
      { $set: { startTime: new Date() } },
    );
    return {};
  }

  /**
   * **action** submitAnswer (questionId: ID, response: ZhuyinRep)
   *
   * @requires Question exists and started, with endTime unset
   * @effects set endTime = current time
   *          set response = response
   *          set speed = endTime - startTime (in milliseconds)
   *          set correct = (response = targetZhuyinRep)
   */
  async submitAnswer(
    { questionId, response }: { questionId: ID; response: ZhuyinRep },
  ): Promise<Empty | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.endTime) {
      return { error: `Question '${questionId}' has already been submitted.` };
    }
    if (!question.startTime) {
      // This case should ideally be prevented by the 'requires' clause
      return {
        error: `Question '${questionId}' must be started before submitting an answer.`,
      };
    }

    const endTime = new Date();
    // startTime is guaranteed to be set by the 'requires' clause.
    const speed = endTime.getTime() - question.startTime.getTime();
    const correct = response === question.targetZhuyinRep;

    await this.questionsCollection.updateOne(
      { _id: questionId },
      {
        $set: {
          endTime,
          response,
          speed,
          correct,
        },
      },
    );
    return {};
  }

  /**
   * **query** getSpeed (questionId: ID): (speed: number)
   *
   * @requires Question exists and endTime set
   * @effects return speed associated with Question
   */
  async getSpeed(
    { questionId }: { questionId: ID },
  ): Promise<{ speed: number } | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.endTime === undefined || question.speed === undefined) {
      return {
        error: `Question '${questionId}' has not been completed, speed not available.`,
      };
    }
    return { speed: question.speed };
  }

  /**
   * **query** getAccuracy (questionId: ID): (correct: boolean)
   *
   * @requires Question exists and endTime set
   * @effects return correct Boolean associated with Question
   */
  async getAccuracy(
    { questionId }: { questionId: ID },
  ): Promise<{ correct: boolean } | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.endTime === undefined || question.correct === undefined) {
      return {
        error: `Question '${questionId}' has not been completed, accuracy not available.`,
      };
    }
    return { correct: question.correct };
  }

  /**
   * **query** _getQuestionDetails (questionId: ID): (details: QuestionEntry)
   *
   * @requires Question exists
   * @effects return all details associated with the Question.
   * This is a utility query for testing or advanced scenarios.
   */
  async getQuestionDetails(
    { questionId }: { questionId: ID },
  ): Promise<{ details: QuestionEntry } | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    return { details: question };
  }
}
```
