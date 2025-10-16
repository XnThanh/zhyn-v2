[@concept-design-overview](../../background/concept-design-overview.md)

[@concept-specifications](../../background/concept-specifications.md)

[@implementing-concepts](../../background/implementing-concepts.md)

[@quiz-specs](Quiz.md)

[@current](../../../src/concepts/Quiz/QuizConcept.ts)

# prompt: I have made a lot of changes to my Quiz specifications. Help me update the implementation to match the new concept spec
# response:

```typescript
import { Collection, Db } from "npm:mongodb";
import { Character, Empty, ID, ZhuyinRep } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";

/**
 * Internal entity type representing a quiz question.
 * @state
 * a set of Questions with
 *   an questionId String
 *   a character Character
 *   a target ZhuyinRep
 *   a response ZhuyinRep?
 *   a startTime DateTime?
 *   an endTime DateTime?
 *   a speed Number?
 *   a correct Boolean?
 */
interface QuestionEntry {
  _id: ID; // questionId
  character: Character;
  target: ZhuyinRep;
  response?: ZhuyinRep;
  startTime?: Date;
  endTime?: Date;
  speed?: number; // in milliseconds
  correct?: boolean;
}

/**
 * Internal entity type representing an incorrect record.
 * @state
 * a set of IncorrectRecords with
 *   a character Character
 *   a target ZhuyinRep
 *   a response ZhuyinRep
 */
interface IncorrectRecordEntry {
  _id: ID; // Unique ID for the record
  character: Character;
  target: ZhuyinRep;
  response: ZhuyinRep;
}

/**
 * Represents the main Quiz entity.
 * @state
 * a Quiz with
 *   a set of questionList Questions (IDs)
 *   a set of incorrectList IncorrectRecords (IDs)
 *   a questionCount Number
 *   a completedCount Number
 *   an avgSpeed Number
 *   an avgAccuracy Number
 *   an active Boolean
 *   a countdown Timer (represented as an expiry Date)
 */
interface QuizEntry {
  _id: ID; // quizId
  questionList: ID[]; // Array of Question _id s
  incorrectList: ID[]; // Array of IncorrectRecord _id s
  questionCount: number;
  completedCount: number;
  avgSpeed: number; // in milliseconds
  avgAccuracy: number; // 0.0 - 1.0 (proportion)
  active: boolean;
  expiryTime: Date; // When the quiz should end
}

// Helper function for incremental average
// ( Old Average * Old Count + New Value ) / New Count
function calculateIncrementalAverage(
  oldAvg: number,
  oldCount: number,
  newValue: number,
): number {
  if (oldCount === 0) return newValue;
  return (oldAvg * oldCount + newValue) / (oldCount + 1);
}

/**
 * @concept Quiz
 * @purpose track User's Zhuyin typing ability
 * @principle track and compiles the speed and accuracy for Characters that user typed
 */
export default class QuizConcept {
  private readonly quizCollection: Collection<QuizEntry>;
  private readonly questionsCollection: Collection<QuestionEntry>;
  private readonly incorrectRecordsCollection: Collection<IncorrectRecordEntry>;
  private readonly PREFIX = "Quiz" + ".";

  constructor(private readonly db: Db) {
    this.quizCollection = this.db.collection(this.PREFIX + "quizzes");
    this.questionsCollection = this.db.collection(this.PREFIX + "questions");
    this.incorrectRecordsCollection = this.db.collection(
      this.PREFIX + "incorrectRecords",
    );
  }

  /**
   * **action** beginQuiz (time: Number): (quizId: ID)
   *
   * @effects create a new Quiz with empty Question set, questionCount=0, completedCount=0,
   *          avgSpeed=0, avgAccuracy=0, active=False. Set countdown timer to 'time'
   *          (in milliseconds from now) and set expiry time.
   * @returns quizId
   */
  async beginQuiz({ time }: { time: number }): Promise<{ quizId: ID }> {
    const quizId = freshID();
    const expiryTime = new Date(Date.now() + time); // 'time' is in milliseconds

    await this.quizCollection.insertOne({
      _id: quizId,
      questionList: [],
      incorrectList: [],
      questionCount: 0,
      completedCount: 0,
      avgSpeed: 0,
      avgAccuracy: 0,
      active: false, // Quiz starts as not active until a question is started
      expiryTime: expiryTime,
    });
    return { quizId };
  }

  /**
   * **action** endQuiz (quizId: ID): [avgSpeed: Number, avgAccuracy: Number, incorrectRecords[]]
   *
   * @requires countdown === 0:00 (i.e., current time is >= expiryTime)
   * @effects marks the quiz as inactive and returns quiz results.
   * @returns avgSpeed, avgAccuracy, and a list of IncorrectRecordEntry objects.
   */
  async endQuiz(
    { quizId }: { quizId: ID },
  ): Promise<
    | {
      avgSpeed: number;
      avgAccuracy: number;
      incorrectRecords: IncorrectRecordEntry[];
    }
    | { error: string }
  > {
    const quiz = await this.quizCollection.findOne({ _id: quizId });

    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }

    // Precondition check: countdown === 0:00 (current time >= expiryTime)
    // The sync typically ensures this, but a direct call might need it.
    if (Date.now() < quiz.expiryTime.getTime()) {
      return { error: `Quiz '${quizId}' has not yet expired.` };
    }

    // Ensure quiz is marked as inactive
    if (quiz.active) {
      await this.quizCollection.updateOne(
        { _id: quizId },
        { $set: { active: false } },
      );
      quiz.active = false; // Update local object for consistent return
    }

    const incorrectRecords = await this.incorrectRecordsCollection.find({
      _id: { $in: quiz.incorrectList },
    }).toArray();

    return {
      avgSpeed: quiz.avgSpeed,
      avgAccuracy: quiz.avgAccuracy,
      incorrectRecords: incorrectRecords,
    };
  }

  /**
   * **action** registerQuestion (quizId: ID, character: Character, targetZhuyinRep: ZhuyinRep): (questionId: ID)
   *
   * @requires Character and ZhuyinRep are a valid pair in ZhuyinDict (typically handled by sync)
   * @effects Generate a questionId. Create new Question with questionId, Character,
   *          and target ZhuyinRep, other fields unset.
   *          Set Quiz questionCount += 1. Add questionId to Quiz questionList.
   * @returns questionId
   */
  async registerQuestion(
    { quizId, character, targetZhuyinRep }: {
      quizId: ID;
      character: Character;
      targetZhuyinRep: ZhuyinRep;
    },
  ): Promise<{ questionId: ID } | { error: string }> {
    const quiz = await this.quizCollection.findOne({ _id: quizId });
    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }

    const questionId = freshID();
    await this.questionsCollection.insertOne({
      _id: questionId,
      character: character,
      target: targetZhuyinRep,
    });

    await this.quizCollection.updateOne(
      { _id: quizId },
      {
        $inc: { questionCount: 1 },
        $push: { questionList: questionId },
      },
    );

    return { questionId };
  }

  /**
   * **action** startQuestion (quizId: ID, questionId: ID)
   *
   * @requires Question exists and not already started (startTime is unset), Quiz active is False
   * @effects update startTime of corresponding Question to current time, set Quiz active = True
   */
  async startQuestion(
    { quizId, questionId }: { quizId: ID; questionId: ID },
  ): Promise<Empty | { error: string }> {
    const quiz = await this.quizCollection.findOne({ _id: quizId });
    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }
    if (quiz.active) {
      return { error: `Quiz '${quizId}' is already active with another question.` };
    }

    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });
    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.startTime) {
      return { error: `Question '${questionId}' has already been started.` };
    }

    // Update question startTime
    await this.questionsCollection.updateOne(
      { _id: questionId },
      { $set: { startTime: new Date() } },
    );

    // Set quiz active
    await this.quizCollection.updateOne(
      { _id: quizId },
      { $set: { active: true } },
    );

    return {};
  }

  /**
   * **action** submitAnswer (quizId: ID, questionId: ID, response: ZhuyinRep)
   *
   * @requires Question exists and started, with endTime unset, Quiz active is True
   * @effects set Question endTime = current time, set Question response = response,
   *          set Question speed = endTime - startTime (in milliseconds),
   *          set Question correct = (response = target).
   *          Set Quiz active = False, set Quiz completedCount += 1.
   *          If correct == False: create new IncorrectRecord and add to Quiz incorrectList.
   *          Set Quiz avgSpeed and avgAccuracy using incremental average formula.
   */
  async submitAnswer(
    { quizId, questionId, response }: {
      quizId: ID;
      questionId: ID;
      response: ZhuyinRep;
    },
  ): Promise<Empty | { error: string }> {
    const quiz = await this.quizCollection.findOne({ _id: quizId });
    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }
    if (!quiz.active) {
      return { error: `Quiz '${quizId}' is not active, cannot submit answer.` };
    }

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
        error:
          `Question '${questionId}' must be started before submitting an answer.`,
      };
    }

    const endTime = new Date();
    const speed = endTime.getTime() - question.startTime.getTime();
    const correct = response === question.target;

    // 1. Update Question Entry
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

    // 2. Update Quiz Entry
    let updateDoc: any = {
      $set: { active: false },
      $inc: { completedCount: 1 },
    };

    // Calculate new averages
    const newAvgSpeed = calculateIncrementalAverage(
      quiz.avgSpeed,
      quiz.completedCount,
      speed,
    );
    const newAvgAccuracy = calculateIncrementalAverage(
      quiz.avgAccuracy,
      quiz.completedCount,
      correct ? 1 : 0, // 1 for correct, 0 for incorrect
    );

    updateDoc.$set.avgSpeed = newAvgSpeed;
    updateDoc.$set.avgAccuracy = newAvgAccuracy;

    // Handle incorrect record if needed
    if (!correct) {
      const incorrectRecordId = freshID();
      await this.incorrectRecordsCollection.insertOne({
        _id: incorrectRecordId,
        character: question.character,
        target: question.target,
        response: response,
      });
      updateDoc.$push = { incorrectList: incorrectRecordId };
    }

    await this.quizCollection.updateOne({ _id: quizId }, updateDoc);

    return {};
  }

  /**
   * **query** getSpeed (questionId: ID): (speed: Number)
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
        error:
          `Question '${questionId}' has not been completed, speed not available.`,
      };
    }
    return { speed: question.speed };
  }

  /**
   * **query** getAccuracy (questionId: ID): (correct: Boolean)
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
        error:
          `Question '${questionId}' has not been completed, accuracy not available.`,
      };
    }
    return { correct: question.correct };
  }

  /**
   * **query** _getQuizDetails (quizId: ID): (details: QuizEntry)
   *
   * @requires Quiz exists
   * @effects return all details associated with the Quiz.
   * This is a utility query for testing or advanced scenarios.
   */
  async _getQuizDetails(
    { quizId }: { quizId: ID },
  ): Promise<{ details: QuizEntry } | { error: string }> {
    const quiz = await this.quizCollection.findOne({ _id: quizId });
    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }
    return { details: quiz };
  }
}
```