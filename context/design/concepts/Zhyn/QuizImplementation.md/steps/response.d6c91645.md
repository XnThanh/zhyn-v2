---
timestamp: 'Wed Oct 15 2025 14:21:20 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251015_142120.c2a16de9.md]]'
content_id: d6c916454b7e52d1879fb568c44037e13bfbfdbec6d29dd32804bb3633c6eb1d
---

# response:

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
   * @requires Question not already started (startTime is unset)
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
   * @requires Question exists with endTime unset
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
      return {
        error: `Question '${questionId}' must be started before submitting an answer.`,
      };
    }

    const endTime = new Date();
    const speed = (endTime.getTime() - question.startTime.getTime()) 
    
    // question.startTime
    //   ? (endTime.getTime() - question.startTime.getTime()) 
    //   : undefined;
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
