import { Collection, Db } from "npm:mongodb";
import { Character, Empty, ID, ZhuyinRep } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";

// Declare collection prefix, use concept name
const PREFIX = "Quiz" + ".";

// Internal entity type representing a quiz question.
// A question is an independent entity, referenced by QuizDoc.questionList
interface QuestionEntry {
  _id: ID;
  character: Character;
  target: ZhuyinRep;
  response?: ZhuyinRep;
  startTime?: Date;
  endTime?: Date;
  speed?: number; // milliseconds
  correct?: boolean;
}

// Represents a record of an incorrect answer, embedded within QuizDoc
export interface IncorrectRecord {
  character: Character;
  target: ZhuyinRep;
  response: ZhuyinRep;
}

// Top-level quiz entry, holding overall quiz state
interface QuizEntry {
  _id: ID;
  length: number; // seconds
  questionList: ID[];
  incorrectList: IncorrectRecord[];
  activeQuestionId?: ID; // ID of the currently active question, or undefined
  questionCount: number;
  completedCount: number;
  avgSpeed: number; // Average speed of completed questions (ms)
  avgAccuracy: number; // Average accuracy of completed questions (0.0 to 1.0)
  expiryTime?: Date;
}

/**
 * @concept Quiz [Character, ZhuyinRep]
 * @purpose To enable users to practice and improve their Zhuyin typing skills by providing immediate and aggregated feedback on their speed and accuracy for individual characters.
 * @principle If a user starts a quiz, answers multiple questions, and when the timer runs out they will receive a summary of their performance, including overall average speed and accuracy, and a list of specific characters they struggled with, allowing them to focus their practice.
 */
export default class QuizConcept {
  private readonly quizzesCollection: Collection<QuizEntry>;
  private readonly questionsCollection: Collection<QuestionEntry>;

  constructor(private readonly db: Db) {
    this.quizzesCollection = this.db.collection(PREFIX + "quizzes");
    this.questionsCollection = this.db.collection(PREFIX + "questions");
  }

  /**
   * **action** makeQuiz (length: Number): quizId: String
   *
   * @effects Initialize new empty quiz
   * @returns quizId
   */
  async makeQuiz(
    { length }: { length: number },
  ): Promise<ID> {
    const quizId = freshID();
    await this.quizzesCollection.insertOne({
      _id: quizId,
      length,
      questionList: [],
      incorrectList: [],
      questionCount: 0,
      completedCount: 0,
      avgSpeed: 0,
      avgAccuracy: 0,
    });

    console.log(
      `CREATED new quiz with ID: ${quizId}, length: ${length} seconds`,
    );
    return quizId;
  }

  /**
   * **action** endQuiz (quizId: String): {avgSpeed: Number, avgAccuracy: Number, incorrectRecords[]}
   *
   * @requires expiryTime <= current time
   * @returns { avgSpeed: number, avgAccuracy: number, incorrectRecords: IncorrectRecord[] }
   */
  async endQuiz(
    { quizId }: { quizId: ID },
  ): Promise<
    | {
      avgSpeed: number;
      avgAccuracy: number;
      incorrectRecords: IncorrectRecord[];
    }
    | { error: string }
  > {
    const quiz = await this.quizzesCollection.findOne({ _id: quizId });

    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }

    const currentTime = new Date();
    const isExpired = quiz.expiryTime && currentTime >= quiz.expiryTime;

    if (!isExpired) {
      return {
        error:
          `Quiz '${quizId}' cannot be ended yet. Timer has not run out. Current time: ${currentTime.toISOString()}, Expiry time: ${quiz.expiryTime?.toISOString()}`,
      };
    }

    console.log(`Time is up! ENDING quiz ${quizId} and calculating results.`);
    await this.quizzesCollection.updateOne(
      { _id: quizId },
      { $set: { activeQuestionId: "time's up" as ID } }, // prevent any more questions from being submitted
    );

    const stats = {
      avgSpeed: quiz.avgSpeed,
      avgAccuracy: quiz.avgAccuracy,
      incorrectRecords: quiz.incorrectList,
    };

    console.log(`Quiz ${quizId} results: ${JSON.stringify(stats, null, 2)}`);
    return stats;
  }

  /**
   * **action** registerQuestion (quizId: String, character: Character, targetZhuyinRep: ZhuyinRep): (questionId: String)
   *
   * @requires quizId exists.
   * @effects Register a new question
   * @returns questionId
   */
  async registerQuestion(
    { quizId, character, targetZhuyinRep }: {
      quizId: ID;
      character: Character;
      targetZhuyinRep: ZhuyinRep;
    },
  ): Promise<ID | { error: string }> {
    const quiz = await this.quizzesCollection.findOne({ _id: quizId });

    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }
    // TODO: validation Character and ZhuyinRep are a valid pair in ZhuyinDict (via sync)

    const questionId = freshID();
    await this.questionsCollection.insertOne({
      _id: questionId,
      character: character,
      target: targetZhuyinRep,
    });

    await this.quizzesCollection.updateOne(
      { _id: quizId },
      {
        $push: { questionList: questionId },
        $inc: { questionCount: 1 },
      },
    );

    console.log(
      `${character} REGISTERED as question ${questionId} in quiz ${quizId}`,
    );
    return questionId;
  }

  /**
   * **action** startQuestion (quizId: String, questionId: String)
   *
   * @requires questionId belongs in quizId, QuizEntry has no active questions
   * @effects mark question as started
   */
  async startQuestion(
    { quizId, questionId }: { quizId: ID; questionId: ID },
  ): Promise<Empty | { error: string }> {
    const quiz = await this.quizzesCollection.findOne({ _id: quizId });
    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }
    if (!quiz.questionList.includes(questionId)) {
      return {
        error: `Question '${questionId}' is not part of Quiz '${quizId}'.`,
      };
    }
    if (quiz.activeQuestionId) {
      return {
        error:
          `Quiz '${quizId}' already has an active question '${quiz.activeQuestionId}'.`,
      };
    }

    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });
    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` }; // Should ideally not happen if it's in questionList
    }
    if (question.startTime) {
      return {
        error:
          `Unexpected error: Question '${questionId}' has already been started.`,
      };
    }

    const quizUpdates: Partial<QuizEntry> = {};
    if (!quiz.expiryTime) {
      // Begin quiz timer when the first question is started
      quizUpdates.expiryTime = new Date(Date.now() + quiz.length * 1000); // length is in seconds
    }
    quizUpdates.activeQuestionId = questionId;

    await this.quizzesCollection.updateOne(
      { _id: quizId },
      { $set: quizUpdates },
    );

    await this.questionsCollection.updateOne(
      { _id: questionId },
      { $set: { startTime: new Date() } },
    );

    console.log(`STARTED question ${questionId} in quiz ${quizId}`);
    return {};
  }

  /**
   * **action** submitAnswer (quizId: ID, questionId: String, response: ZhuyinRep)
   *
   * @requires question started but has not been submitted, question is the active question of quiz
   * @effects mark question as completed, update relevant statistics in QuizEntry and QuestionEntry
   */
  async submitAnswer(
    { quizId, questionId, response }: {
      quizId: ID;
      questionId: ID;
      response: ZhuyinRep;
    },
  ): Promise<Empty | { error: string }> {
    const quiz = await this.quizzesCollection.findOne({ _id: quizId });
    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }
    if (quiz.activeQuestionId !== questionId) {
      return {
        error:
          `Question '${questionId}' is not the currently active question for Quiz '${quizId}'.`,
      };
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
        error: `Question '${questionId}' not started.`,
      };
    }

    const endTime = new Date();
    const speed = endTime.getTime() - question.startTime.getTime(); // Speed in milliseconds
    const correct = response === question.target;

    // Update QuestionEntry
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

    // Calculations
    const newCompletedCount = quiz.completedCount + 1;

    // Calculate new average speed using incremental average formula
    const newAvgSpeed = (quiz.avgSpeed * quiz.completedCount + speed) /
      newCompletedCount;

    // Calculate new average accuracy (correct is 1 for true, 0 for false)
    const newAccuracyValue = correct ? 1 : 0;
    const newAvgAccuracy =
      (quiz.avgAccuracy * quiz.completedCount + newAccuracyValue) /
      newCompletedCount;

    const quizUpdates: Partial<QuizEntry> = {};
    quizUpdates.activeQuestionId = undefined;
    quizUpdates.avgSpeed = newAvgSpeed;
    quizUpdates.avgAccuracy = newAvgAccuracy;
    quizUpdates.completedCount = newCompletedCount;

    await this.quizzesCollection.updateOne(
      { _id: quizId },
      { $set: quizUpdates },
    );

    if (!correct) {
      const incorrectRecord: IncorrectRecord = {
        character: question.character,
        target: question.target,
        response: response,
      };

      await this.quizzesCollection.updateOne(
        { _id: quizId },
        { $push: { incorrectList: incorrectRecord } },
      );
    }

    console.log(
      `SUBMITTED ${
        correct ? "CORRECT" : "INCORRECT"
      } ${response} for question ${questionId} in quiz ${quizId}`,
    );
    return {};
  }
}
