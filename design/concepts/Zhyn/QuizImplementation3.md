[@concept-design-overview](../../background/concept-design-overview.md)

[@concept-specifications](../../background/concept-specifications.md)

[@implementing-concepts](../../background/implementing-concepts.md)

[@quiz-specs](Quiz.md)

[@current](../../../src/concepts/Quiz/QuizConcept.ts)

# prompt: I have made a lot of changes to my Quiz specifications. Help me update the implementation to match the new concept spec
# response:
# response:

Okay, let's update your `QuizConcept.ts` implementation to align with the new, more detailed concept specification.

The key changes involve:

1.  **New State Structure:**
    *   Introducing a `QuizDoc` interface for the overall quiz state, managing `questionList`, `incorrectList`, `activeQuestionId`, counters, and averages.
    *   Updating the `QuestionDoc` (formerly `QuestionEntry`) to reflect its role within a quiz.
    *   Defining an `IncorrectRecord` interface for embedded documents.
2.  **New Actions:**
    *   `makeQuiz`: To create a new quiz instance.
    *   `endQuiz`: To finalize a quiz and return summary results.
3.  **Modified Actions:**
    *   `registerQuestion`: Now takes a `quizId` and updates the `QuizDoc`.
    *   `startQuestion`: Now takes a `quizId`, manages `activeQuestionId` for the `QuizDoc`, and sets `expiryTime` if it's the first question.
    *   `submitAnswer`: Now takes a `quizId`, updates `QuizDoc` counters and averages incrementally, and adds `IncorrectRecords` if needed.
4.  **Updated JSDoc:** Reflecting the new purpose, principle, and action requirements/effects.
5.  **New Query:** `_getQuizDetails` for inspecting the `QuizDoc` state.

Here's the updated `src/concepts/Quiz/QuizConcept.ts` code:

```typescript
import { Collection, Db } from "npm:mongodb";
import { Character, Empty, ID, ZhuyinRep } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";

// Declare collection prefix, use concept name
const PREFIX = "Quiz" + ".";

// Internal entity type representing a quiz question.
// A question is an independent entity, referenced by QuizDoc.questionList
interface QuestionDoc {
  _id: ID; // The questionId
  character: Character;
  target: ZhuyinRep;
  response?: ZhuyinRep;
  startTime?: Date;
  endTime?: Date;
  speed?: number; // milliseconds
  correct?: boolean;
}

// Represents a record of an incorrect answer, embedded within QuizDoc
interface IncorrectRecord {
  character: Character;
  target: ZhuyinRep;
  response: ZhuyinRep;
}

// Top-level quiz entry, holding overall quiz state
interface QuizDoc {
  _id: ID; // The quizId
  length: number; // in seconds, total duration of the quiz
  questionList: ID[]; // References to QuestionDoc _id's
  incorrectList: IncorrectRecord[];
  activeQuestionId?: ID; // ID of the currently active question, or undefined
  questionCount: number; // Total questions generated for this quiz
  completedCount: number; // Questions for which an answer has been submitted
  avgSpeed: number; // Average speed of completed questions (ms)
  avgAccuracy: number; // Average accuracy of completed questions (0.0 to 1.0)
  expiryTime?: Date; // When the quiz should expire/end (set on first question start)
}

/**
 * @concept Quiz [Character, ZhuyinRep]
 * @purpose To enable users to practice and improve their Zhuyin typing skills by providing immediate and aggregated feedback on their speed and accuracy for individual characters.
 * @principle If a user starts a quiz, answers multiple questions, and when the timer runs out they will receive a summary of their performance, including overall average speed and accuracy, and a list of specific characters they struggled with, allowing them to focus their practice.
 */
export default class QuizConcept {
  private readonly quizzesCollection: Collection<QuizDoc>;
  private readonly questionsCollection: Collection<QuestionDoc>;

  constructor(private readonly db: Db) {
    this.quizzesCollection = this.db.collection(PREFIX + "quizzes");
    this.questionsCollection = this.db.collection(PREFIX + "questions");
  }

  /**
   * **action** makeQuiz (length: Number): quizId: String
   *
   * @effects create a new QuizEntry with new quizId, length=length, empty questionList, empty incorrectList, activeQuestionId = undefined, questionCount=0, completedCount=0, avgSpeed=0, avgAccuracy=0. expiryTime unset. Return quizId.
   * @returns { quizId: ID }
   */
  async makeQuiz(
    { length }: { length: number },
  ): Promise<{ quizId: ID }> {
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
      // expiryTime will be set when the first question is started
      // activeQuestionId is implicitly undefined
    });
    return { quizId };
  }

  /**
   * **action** endQuiz (quizId: String): {avgSpeed: Number, avgAccuracy: Number, incorrectRecords[]}
   *
   * @requires expiryTime < current time OR quiz has no active questions and all registered questions are completed.
   * @effects return [avgSpeed, avgAccuracy, incorrectList] corresponding to quizId.
   *          Note: This action primarily returns data and doesn't explicitly modify the quiz state
   *          to mark it as "ended" unless that specific behavior is added.
   * @returns { avgSpeed: number, avgAccuracy: number, incorrectRecords: IncorrectRecord[] }
   */
  async endQuiz(
    { quizId }: { quizId: ID },
  ): Promise<
    | { avgSpeed: number; avgAccuracy: number; incorrectRecords: IncorrectRecord[] }
    | { error: string }
  > {
    const quiz = await this.quizzesCollection.findOne({ _id: quizId });

    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }

    const currentTime = new Date();
    const isExpired = quiz.expiryTime && currentTime > quiz.expiryTime;
    const allQuestionsCompleted = quiz.questionCount > 0 &&
      quiz.completedCount === quiz.questionCount;

    // The 'requires' clause from the spec is implemented here:
    if (!isExpired && !allQuestionsCompleted) {
      return {
        error:
          `Quiz '${quizId}' cannot be ended yet. It is not expired and not all questions are completed.`,
      };
    }

    // Averages should already be up-to-date due to incremental calculation in submitAnswer.
    return {
      avgSpeed: quiz.avgSpeed,
      avgAccuracy: quiz.avgAccuracy,
      incorrectRecords: quiz.incorrectList,
    };
  }

  /**
   * **action** registerQuestion (quizId: String, character: Character, targetZhuyinRep: ZhuyinRep): (questionId: String)
   *
   * @requires quizId exists.
   * @effects Get QuizEntry with quizId. Generate a questionId. Create new Question with questionId, Character, and targetZhuyinRep, other fields unset. Set QuizEntry questionCount += 1. Add questionId to QuizEntry questionList. Return questionId.
   * @returns { questionId: ID }
   */
  async registerQuestion(
    { quizId, character, targetZhuyinRep }: {
      quizId: ID;
      character: Character;
      targetZhuyinRep: ZhuyinRep;
    },
  ): Promise<{ questionId: ID } | { error: string }> {
    const quiz = await this.quizzesCollection.findOne({ _id: quizId });

    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }
    // The spec notes that the validation "Character and ZhuyinRep are a valid pair in ZhuyinDict"
    // is handled by a synchronization mechanism, not within this concept action itself.

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

    return { questionId };
  }

  /**
   * **action** startQuestion (quizId: String, questionId: String)
   *
   * @requires questionId in QuizEntry questionList, QuizEntry activeQuestionId is undefined or matches questionId, Question not already started (startTime is unset).
   * @effects get QuizEntry corresponding to quizId. If expiryTime unset: set expiryTime = current time + length (in essence, begin quiz when user attempts first question). Update startTime of corresponding Question to current time. Set QuizEntry activeQuestionId = questionId.
   * @returns Empty
   */
  async startQuestion(
    { quizId, questionId }: { quizId: ID; questionId: ID },
  ): Promise<Empty | { error: string }> {
    const quiz = await this.quizzesCollection.findOne({ _id: quizId });
    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }
    if (!quiz.questionList.includes(questionId)) {
      return { error: `Question '${questionId}' is not part of Quiz '${quizId}'.` };
    }
    if (quiz.activeQuestionId && quiz.activeQuestionId !== questionId) {
      return {
        error: `Quiz '${quizId}' already has an active question '${quiz.activeQuestionId}'.`,
      };
    }

    const question = await this.questionsCollection.findOne({ _id: questionId });
    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` }; // Should ideally not happen if it's in questionList
    }
    if (question.startTime) {
      return { error: `Question '${questionId}' has already been started.` };
    }

    const quizUpdates: Partial<QuizDoc> = {};
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
    return {};
  }

  /**
   * **action** submitAnswer (quizId: ID, questionId: String, response: ZhuyinRep)
   *
   * @requires QuizEntry activeQuestionId === questionId. Question exists with startTime set and endTime unset.
   * @effects set Question endTime = current time. Set Question response = response. Set Question speed = endTime - startTime (in milliseconds). Set Question correct = (response = target). Set QuizEntry activeQuestionId = undefined. Set QuizEntry completedCount += 1. If correct == False: create new IncorrectRecord and add to Quiz incorrectList. Set QuizEntry avgSpeed = new avg speed calculated by incremental average formula. Set QuizEntry avgAccuracy = new avg accuracy calculated by incremental average formula.
   * @returns Empty
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

    const question = await this.questionsCollection.findOne({ _id: questionId });
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
    const speed = endTime.getTime() - question.startTime.getTime(); // Speed in milliseconds
    const correct = response === question.target;

    // 1. Update Question document
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

    // 2. Prepare updates for QuizDoc
    const newCompletedCount = quiz.completedCount + 1;

    // Calculate new average speed using incremental formula
    const newAvgSpeed = (quiz.avgSpeed * quiz.completedCount + speed) /
      newCompletedCount;

    // Calculate new average accuracy (correct is 1 for true, 0 for false)
    const newAccuracyValue = correct ? 1 : 0;
    const newAvgAccuracy = (quiz.avgAccuracy * quiz.completedCount +
      newAccuracyValue) / newCompletedCount;

    const quizUpdates: any = {
      $set: {
        activeQuestionId: undefined, // Clear active question
        avgSpeed: newAvgSpeed,
        avgAccuracy: newAvgAccuracy,
      },
      $inc: { completedCount: 1 },
    };

    if (!correct) {
      const incorrectRecord: IncorrectRecord = {
        character: question.character,
        target: question.target,
        response: response,
      };
      // Use $push to add to the incorrectList array
      quizUpdates.$push = { incorrectList: incorrectRecord };
    }

    // 3. Update Quiz document
    await this.quizzesCollection.updateOne(
      { _id: quizId },
      quizUpdates,
    );

    return {};
  }

  /**
   * **query** getSpeed (questionId: ID): (speed: number)
   *
   * @requires Question exists and endTime set
   * @effects return speed associated with Question
   * @returns { speed: number }
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
   * **query** getAccuracy (questionId: ID): (correct: boolean)
   *
   * @requires Question exists and endTime set
   * @effects return correct Boolean associated with Question
   * @returns { correct: boolean }
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
   * **query** _getQuestionDetails (questionId: ID): (details: QuestionDoc)
   *
   * @requires Question exists
   * @effects return all details associated with the Question.
   * This is a utility query for testing or advanced scenarios.
   * @returns { details: QuestionDoc }
   */
  async _getQuestionDetails( // Renamed to _get... as per convention
    { questionId }: { questionId: ID },
  ): Promise<{ details: QuestionDoc } | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    return { details: question };
  }

  /**
   * **query** _getQuizDetails (quizId: ID): (details: QuizDoc)
   *
   * @requires Quiz exists
   * @effects return all details associated with the Quiz.
   * This is a utility query for testing or advanced scenarios.
   * @returns { details: QuizDoc }
   */
  async _getQuizDetails(
    { quizId }: { quizId: ID },
  ): Promise<{ details: QuizDoc } | { error: string }> {
    const quiz = await this.quizzesCollection.findOne({ _id: quizId });
    if (!quiz) {
      return { error: `Quiz with ID '${quizId}' not found.` };
    }
    return { details: quiz };
  }
}
```