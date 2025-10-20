[@api-extraction-from-spec](api-extraction-from-spec.md)

# Extracting from code

The following is an explanation of how concepts are implemented, for the purposes of understanding how to extract an API.

[@implementing-concepts](../background/implementing-concepts.md)

# prompt: 

Please extract an API for this app from the following two concepts:

## ZhuyinDictionary

Specification:

[@ZhuyinDictionary](../../design/concepts/ZhynSpec/ZhuyinDictionary.md)

Code:

[@ZhuyinDictionaryConcept.ts](../../src/concepts/ZhuyinDictionary/ZhuyinDictionaryConcept.ts)

## Quiz

Specification:

[@Quiz](../../design/concepts/ZhynSpec/Quiz.md)

Code:

[@QuizConcept.ts](../../src/concepts/Quiz/QuizConcept.ts)

## LevelMap

Specification:

[@LevelMap](../../design/concepts/ZhynSpec/LevelMap.md)

Code:

[@LevelMapConcept.ts](../../src/concepts/LevelMap/LevelMapConcept.ts)
# response:

```markdown
# API Specification: ZhuyinDictionary Concept

**Purpose:** tracks the Zhuyin Representation of Characters

---

## API Endpoints

### POST /api/ZhuyinDictionary/register

**Description:** Registers a new Chinese character and its Zhuyin representation.

**Requirements:**
- Character doesn't already exist in CharacterEntries

**Effects:**
- Create new CharacterEntry with given Character and ZhuyinRep

**Request Body:**
```json
{
  "character": "string",
  "zhuyinRep": "string"
}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/ZhuyinDictionary/unregister

**Description:** Unregisters an existing Chinese character and its Zhuyin representation.

**Requirements:**
- Character already exist in CharacterEntries

**Effects:**
- Remove CharacterEntry associated with Character

**Request Body:**
```json
{
  "character": "string"
}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/ZhuyinDictionary/getAnswer

**Description:** Retrieves the Zhuyin representation for a given Chinese character.

**Requirements:**
- Character already exist in CharacterEntries

**Effects:**
- Returns the ZhuyinRep associated with the Character

**Request Body:**
```json
{
  "character": "string"
}
```

**Success Response Body (Action):**
```json
{
  "zhuyinRep": "string"
}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/ZhuyinDictionary/lookupZhuyin

**Description:** Looks up characters by their Zhuyin representation, supporting full or partial prefix matches.

**Requirements:**
- (Implicit: none beyond valid input type)

**Effects:**
- Returns a list of all Characters whose Zhuyin representation matches ZhuyinRep. The pattern can be a full Zhuyin string or a partial prefix.

**Request Body:**
```json
{
  "zhuyinRep": "string"
}
```

**Success Response Body (Action):**
```json
{
  "characters": [
    "string"
  ]
}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

# API Specification: Quiz Concept

**Purpose:** To enable users to practice and improve their Zhuyin typing skills by providing immediate and aggregated feedback on their speed and accuracy for individual characters.

---

## API Endpoints

### POST /api/Quiz/makeQuiz

**Description:** Creates a new quiz instance with a specified duration.

**Requirements:**
- (Implicit: none beyond valid input type)

**Effects:**
- Create a new QuizEntry with new quizId, length=length, empty questionList, empty incorrectList, activeQuestionId = "", questionCount=0, completedCount=0, avgSpeed=0, avdAccuracy=0.
- ExpiryTime unset.
- Return quizId.

**Request Body:**
```json
{
  "length": "number"
}
```

**Success Response Body (Action):**
```json
{
  "quizId": "string"
}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/Quiz/endQuiz

**Description:** Ends a quiz, calculates final statistics, and returns the summary.

**Requirements:**
- expiryTime < current time

**Effects:**
- Set activeQuestionId to "time's up"
- Return [avgSpeed, avgAccuracy, incorrectList] corresponding to quizId

**Request Body:**
```json
{
  "quizId": "string"
}
```

**Success Response Body (Action):**
```json
{
  "avgSpeed": "number",
  "avgAccuracy": "number",
  "incorrectRecords": [
    {
      "character": "string",
      "target": "string",
      "response": "string"
    }
  ]
}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/Quiz/registerQuestion

**Description:** Registers a new question within an existing quiz.

**Requirements:**
- quizId exists
- Character and ZhuyinRep are a valid pair in ZhuyinDict

**Effects:**
- Get QuizEntry with quizId.
- Generate a questionId.
- Create new Question with questionId, Character, and target ZhuyinRep, other fields unset.
- Set QuizEntry questionCount += 1.
- Add questionId to QuizEntry questionList.
- Return questionId.

**Request Body:**
```json
{
  "quizId": "string",
  "character": "string",
  "targetZhuyinRep": "string"
}
```

**Success Response Body (Action):**
```json
{
  "questionId": "string"
}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/Quiz/startQuestion

**Description:** Marks a specific question in a quiz as started, beginning the quiz timer if it's the first question.

**Requirements:**
- questionId in QuizEntry questionList
- QuizEntry activeQuestionId is empty string

**Effects:**
- Get QuizEntry corresponding to quizId
- If expiryTime unset: set expiryTime = current time + length (in essence, begin quiz when user attempts first question)
- Update startTime of corresponding Question to current time
- Set QuizEntry activeQuestionId = questionId

**Request Body:**
```json
{
  "quizId": "string",
  "questionId": "string"
}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/Quiz/submitAnswer

**Description:** Submits an answer for the currently active question, updates quiz statistics, and records incorrect attempts.

**Requirements:**
- QuizEntry activeQuestionId === questionId

**Effects:**
- Set Question endTime = current time
- Set Question response = response
- Set Question speed = endTime - startTime (in milliseconds)
- Set Question correct = (response = target)
- Set QuizEntry activeQuestionId = "" (empty string)
- Set QuizEntry completedCount += 1
- If correct == False: create new IncorrectRecord and add to Quiz incorrectList
- Set QuizEntry avgSpeed = *new avg speed calculated by [incremental average formula](#incremental-average-formula)*
- Set QuizEntry avgAccuracy = *new avg accuracy calculated by [incremental average formula](#incremental-average-formula)*

**Request Body:**
```json
{
  "quizId": "string",
  "questionId": "string",
  "response": "string"
}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

# API Specification: LevelMap Concept

**Purpose:** generate sentences tailored to a User's level

---

## API Endpoints

### POST /api/LevelMap/createLevel

**Description:** Creates a new learning level with a given name and an empty set of characters.

**Requirements:**
- levelName not already existing Level

**Effects:**
- Create new Level with levelName and empty set of Characters

**Request Body:**
```json
{
  "levelName": "string"
}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/LevelMap/addCharacter

**Description:** Adds a character to a specified learning level.

**Requirements:**
- Character not already in Level

**Effects:**
- Associate Character to Level

**Request Body:**
```json
{
  "levelName": "string",
  "character": "string"
}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/LevelMap/removeCharacter

**Description:** Removes a character from a specified learning level.

**Requirements:**
- Character in Level

**Effects:**
- Remove Character from Level

**Request Body:**
```json
{
  "levelName": "string",
  "character": "string"
}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/LevelMap/generateSentences

**Description:** Generates a list of Chinese sentences tailored to a specific learning level and topic, using only allowed characters.

**Requirements:**
- (Implicit: none beyond valid input type)

**Effects:**
- Get Characters in Level
- Use LLM to generate a set of sentences on given topic using only characters in that Level.
- LLM takes a list of characters in Level and a topic.
- Generates valid sentences and Return sentences.

**Request Body:**
```json
{
  "levelName": "string",
  "topic": "string"
}
```

**Success Response Body (Action):**
```json
{
  "sentences": [
    "string"
  ]
}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```
```