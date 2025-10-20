---
timestamp: 'Mon Oct 20 2025 01:11:18 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251020_011118.278b003d.md]]'
content_id: 70453bfe4e73cf1fe1347b9b834d25cb6449919ec7334dc978620a29739c3173
---

# API Specification: Quiz Concept

**Purpose:** To enable users to practice and improve their Zhuyin typing skills by providing immediate and aggregated feedback on their speed and accuracy for individual characters.

***

## API Endpoints

### POST /api/Quiz/makeQuiz

**Description:** Creates a new quiz instance with a specified duration.

**Requirements:**

* (Implicit: none beyond valid input type)

**Effects:**

* Create a new QuizEntry with new quizId, length=length, empty questionList, empty incorrectList, activeQuestionId = "", questionCount=0, completedCount=0, avgSpeed=0, avdAccuracy=0.
* ExpiryTime unset.
* Return quizId.

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

***

### POST /api/Quiz/endQuiz

**Description:** Ends a quiz, calculates final statistics, and returns the summary.

**Requirements:**

* expiryTime < current time

**Effects:**

* Set activeQuestionId to "time's up"
* Return \[avgSpeed, avgAccuracy, incorrectList] corresponding to quizId

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

***

### POST /api/Quiz/registerQuestion

**Description:** Registers a new question within an existing quiz.

**Requirements:**

* quizId exists
* Character and ZhuyinRep are a valid pair in ZhuyinDict

**Effects:**

* Get QuizEntry with quizId.
* Generate a questionId.
* Create new Question with questionId, Character, and target ZhuyinRep, other fields unset.
* Set QuizEntry questionCount += 1.
* Add questionId to QuizEntry questionList.
* Return questionId.

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

***

### POST /api/Quiz/startQuestion

**Description:** Marks a specific question in a quiz as started, beginning the quiz timer if it's the first question.

**Requirements:**

* questionId in QuizEntry questionList
* QuizEntry activeQuestionId is empty string

**Effects:**

* Get QuizEntry corresponding to quizId
* If expiryTime unset: set expiryTime = current time + length (in essence, begin quiz when user attempts first question)
* Update startTime of corresponding Question to current time
* Set QuizEntry activeQuestionId = questionId

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

***

### POST /api/Quiz/submitAnswer

**Description:** Submits an answer for the currently active question, updates quiz statistics, and records incorrect attempts.

**Requirements:**

* QuizEntry activeQuestionId === questionId

**Effects:**

* Set Question endTime = current time
* Set Question response = response
* Set Question speed = endTime - startTime (in milliseconds)
* Set Question correct = (response = target)
* Set QuizEntry activeQuestionId = "" (empty string)
* Set QuizEntry completedCount += 1
* If correct == False: create new IncorrectRecord and add to Quiz incorrectList
* Set QuizEntry avgSpeed = *new avg speed calculated by [incremental average formula](#incremental-average-formula)*
* Set QuizEntry avgAccuracy = *new avg accuracy calculated by [incremental average formula](#incremental-average-formula)*

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

***
