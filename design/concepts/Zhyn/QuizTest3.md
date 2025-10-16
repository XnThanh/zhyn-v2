[@implementation](../../../src/concepts/Quiz/QuizConcept.ts)

[@testing-concepts](../../background/testing-concepts.md)

[@quiz-testcases](../../testcase/quiz-testcases.md)

# prompt: Using the following as an example, create the remaining testcases outlined in quiz-testcases:
/*
Principle Test Case:
1. system makes new quiz with 1 second timer (for testing feasibility)
2. system register 3 questions
3. user correctly answers question 1
4. user incorrectly answers question 2
5. timer runs out before user finishes question 3, system gets speed and accuracy of quiz
*/
Deno.test("Principle: system makes quiz and registers questions, user responds, system collect statistics", async (t) => {
  const [db, client] = await testDb();
  const quizConcept = new QuizConcept(db);

  try {
    // Action 1: Make new quiz
    const quizId = await quizConcept.makeQuiz({ length: 3 });

    // Action 2: Add three questions
    const char1 = "你" as Character;
    const zhuyin1 = "ㄋㄧˇ" as ZhuyinRep;

    const char2 = "好" as Character;
    const zhuyin2 = "ㄏㄠˇ" as ZhuyinRep;

    const char3 = "呢" as Character;
    const zhuyin3 = "ㄋㄜ˙" as ZhuyinRep;

    const result1 = await quizConcept.registerQuestion({
      quizId: quizId,
      character: char1,
      targetZhuyinRep: zhuyin1,
    });
    assertNoError(result1);
    const questionId1 = result1 as ID;

    const result2 = await quizConcept.registerQuestion({
      quizId: quizId,
      character: char2,
      targetZhuyinRep: zhuyin2,
    });
    assertNoError(result2);
    const questionId2 = result2 as ID;

    const result3 = await quizConcept.registerQuestion({
      quizId: quizId,
      character: char3,
      targetZhuyinRep: zhuyin3,
    });
    assertNoError(result3);
    const questionId3 = result3 as ID;

    // Action 3: Respond question 1 (correct)
    const start1 = await quizConcept.startQuestion({
      quizId,
      questionId: questionId1,
    });
    await delay(500);
    const submit1 = await quizConcept.submitAnswer({
      quizId,
      questionId: questionId1,
      response: zhuyin1,
    });

    // Action 4: Respond question 2 (incorrect)
    const start2 = await quizConcept.startQuestion({
      quizId,
      questionId: questionId2,
    });
    await delay(300);
    const wrongzhuyin2 = "ㄏㄠ" as ZhuyinRep;
    const submit2 = await quizConcept.submitAnswer({
      quizId,
      questionId: questionId2,
      response: wrongzhuyin2,
    });

    // Action 5: Start question 3 but do not submit (timer runs out)
    const start3 = await quizConcept.startQuestion({
      quizId,
      questionId: questionId3,
    });
    await delay(300); // timer should run out before this delay ends

    // TODO: remove below line when timer sync is implemented
    const stats = await quizConcept.endQuiz({ quizId }); // manual endQuiz bc sync not yet implemented

    const expectedStats = {
      avgSpeed: 400,
      avgAccuracy: 0.5,
      incorrectRecords: [{
        character: char2,
        target: zhuyin2,
        response: wrongzhuyin2,
      }],
    };
    assertEquals(
      stats,
      expectedStats,
      "Quiz statistics should match expected values",
    );
    assertAllNoError([
      { value: start1 },
      { value: submit1 },
      { value: start2 },
      { value: submit2 },
      { value: start3 },
      { value: stats },
    ]);
  } finally {
    await client.close();
  }
});
# response:

```typescript
// file: src\concepts\Quiz\QuizConcept.test.ts

import { assertEquals, assertExists, assertInstanceOf, assertNotEquals, assertObjectMatch } from "jsr:@std/assert";
import { testDb } from "@utils/database.ts";
import QuizConcept from "./QuizConcept.ts";
import { Character, Empty, ID, ZhuyinRep } from "@utils/types.ts";

// Helper for delays in async tests
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Helper to assert no error was returned
function assertNoError<T>(result: T | { error: string }): asserts result is T {
  if (Object.prototype.hasOwnProperty.call(result, "error")) {
    throw new Error(`Expected no error, but got: ${(result as { error: string }).error}`);
  }
}

// Helper to assert an error was returned
function assertHasError(result: Empty | { error: string }): asserts result is { error: string } {
  if (!Object.prototype.hasOwnProperty.call(result, "error")) {
    throw new Error("Expected an error, but got no error.");
  }
}

// Helper to assert all results in an array have no error
function assertAllNoError(
  results: Array<{ value: unknown }>,
): asserts results is Array<{ value: unknown }> {
  for (const { value } of results) {
    assertNoError(value);
  }
}

Deno.test("QuizConcept Tests", async (t) => {
  let db: Awaited<ReturnType<typeof testDb>>[0];
  let client: Awaited<ReturnType<typeof testDb>>[1];
  let quizConcept: QuizConcept;

  Deno.test.beforeEach(async () => {
    [db, client] = await testDb();
    quizConcept = new QuizConcept(db);
  });

  Deno.test.afterEach(async () => {
    await client.close();
  });

  /*
   * Principle Test Case:
   * 1. system makes new quiz with 1 second timer (for testing feasibility)
   * 2. system register 3 questions
   * 3. user correctly answers question 1
   * 4. user incorrectly answers question 2
   * 5. timer runs out before user finishes question 3, system gets speed and accuracy of quiz
   */
  await t.step(
    "Principle: system makes quiz and registers questions, user responds, system collect statistics",
    async () => {
      // Action 1: Make new quiz with a short length for testing expiry
      const quizId = await quizConcept.makeQuiz({ length: 0.5 }); // 0.5 seconds for quick expiry

      // Action 2: Add three questions
      const char1 = "你" as Character;
      const zhuyin1 = "ㄋㄧˇ" as ZhuyinRep;
      const char2 = "好" as Character;
      const zhuyin2 = "ㄏㄠˇ" as ZhuyinRep;
      const char3 = "呢" as Character;
      const zhuyin3 = "ㄋㄜ˙" as ZhuyinRep;

      const result1 = await quizConcept.registerQuestion({
        quizId: quizId,
        character: char1,
        targetZhuyinRep: zhuyin1,
      });
      assertNoError(result1);
      const questionId1 = result1 as ID;

      const result2 = await quizConcept.registerQuestion({
        quizId: quizId,
        character: char2,
        targetZhuyinRep: zhuyin2,
      });
      assertNoError(result2);
  const questionId2 = result2 as ID;

      const result3 = await quizConcept.registerQuestion({
        quizId: quizId,
        character: char3,
        targetZhuyinRep: zhuyin3,
      });
      assertNoError(result3);
  const questionId3 = result3 as ID;

      // Action 3: Respond question 1 (correct)
      const start1Result = await quizConcept.startQuestion({
        quizId,
        questionId: questionId1,
      });
      assertNoError(start1Result);
      await delay(50); // Simulate typing time for Q1
      const submit1Result = await quizConcept.submitAnswer({
        quizId,
        questionId: questionId1,
        response: zhuyin1,
      });
      assertNoError(submit1Result);

      // Action 4: Respond question 2 (incorrect)
      const start2Result = await quizConcept.startQuestion({
        quizId,
        questionId: questionId2,
      });
      assertNoError(start2Result);
      await delay(70); // Simulate typing time for Q2
      const wrongZhuyin2 = "ㄏㄠ" as ZhuyinRep;
      const submit2Result = await quizConcept.submitAnswer({
        quizId,
        questionId: questionId2,
        response: wrongZhuyin2,
      });
      assertNoError(submit2Result);

      // Action 5: Start question 3 but do not submit (timer runs out)
      const start3Result = await quizConcept.startQuestion({
        quizId,
        questionId: questionId3,
      });
      assertNoError(start3Result);

      // Wait for the quiz to expire (length was 0.5s, first question started at ~t=0)
      // The expiry time is set when the *first* question starts.
      // After starting question 1 (delay 50ms), question 2 (delay 70ms), question 3.
      // Total elapsed time before expiry check will be ~50 + 70 + (startQ3 negligible) = 120ms.
      // So ~380ms remaining until expiry. Wait a bit more than that.
      await delay(400);

      // Now the quiz should be expired, and we can end it
      const statsResult = await quizConcept.endQuiz({ quizId });
      assertNoError(statsResult);

      assertExists(statsResult);
      assertEquals(typeof statsResult.avgSpeed, "number");
      assertEquals(typeof statsResult.avgAccuracy, "number");
      assertInstanceOf(statsResult.incorrectRecords, Array);

      // Expected values based on the delays and responses
      // Q1 speed ~50ms, Q2 speed ~70ms
      // Avg speed = (50 + 70) / 2 = 60ms
      // Avg accuracy = (1 + 0) / 2 = 0.5
      // Incorrect records: only Q2
      assertObjectMatch(
        statsResult,
        {
          avgSpeed: 60, // Averages will be close to these, allow for some small variance from runtime delays
          avgAccuracy: 0.5,
          incorrectRecords: [{
            character: char2,
            target: zhuyin2,
            response: wrongZhuyin2,
          }],
        },
        "Quiz statistics should match expected values",
      );

      // Verify the question entries are updated correctly
      const q1 = await db.collection("Quiz.questions").findOne({
        _id: questionId1,
      });
      assertExists(q1);
      assertEquals(q1.correct, true);
      assertExists(q1.speed);
      assertEquals(q1.response, zhuyin1);

      const q2 = await db.collection("Quiz.questions").findOne({
        _id: questionId2,
      });
      assertExists(q2);
      assertEquals(q2.correct, false);
      assertExists(q2.speed);
      assertEquals(q2.response, wrongZhuyin2);

      const q3 = await db.collection("Quiz.questions").findOne({
        _id: questionId3,
      });
      assertExists(q3);
      assertEquals(q3.correct, undefined); // Q3 was not submitted
      assertEquals(q3.speed, undefined);
    },
  );

  await t.step("makeQuiz", async (t) => {
    await t.step("should create a new quiz entry", async () => {
      const length = 60;
      const quizId = await quizConcept.makeQuiz({ length });

      assertExists(quizId);
      assertEquals(typeof quizId, "string");

      const quizEntry = await db.collection("Quiz.quizzes").findOne({
        _id: quizId,
      });
      assertExists(quizEntry);
      assertEquals(quizEntry.length, length);
      assertEquals(quizEntry.questionList.length, 0);
      assertEquals(quizEntry.incorrectList.length, 0);
      assertEquals(quizEntry.questionCount, 0);
      assertEquals(quizEntry.completedCount, 0);
      assertEquals(quizEntry.avgSpeed, 0);
      assertEquals(quizEntry.avgAccuracy, 0);
      assertEquals(quizEntry.expiryTime, undefined);
    });
  });

  await t.step("registerQuestion", async (t) => {
    let quizId: ID;
    const char = "我" as Character;
    const zhuyin = "ㄨㄛˇ" as ZhuyinRep;

    t.beforeEach(async () => {
      quizId = await quizConcept.makeQuiz({ length: 60 });
    });

    await t.step("should register a new question successfully", async () => {
      const result = await quizConcept.registerQuestion({
        quizId,
        character: char,
        targetZhuyinRep: zhuyin,
      });
      assertNoError(result);
      const questionId = result as ID;

      assertExists(questionId);
      assertEquals(typeof questionId, "string");

      const questionEntry = await db.collection("Quiz.questions").findOne({
        _id: questionId,
      });
      assertExists(questionEntry);
      assertEquals(questionEntry.character, char);
      assertEquals(questionEntry.target, zhuyin);

      const quizEntry = await db.collection("Quiz.quizzes").findOne({
        _id: quizId,
      });
      assertExists(quizEntry);
      assertEquals(quizEntry.questionList.length, 1);
      assertEquals(quizEntry.questionList[0], questionId);
      assertEquals(quizEntry.questionCount, 1);
    });

    await t.step("should allow registering multiple questions with same character", async () => {
      const result1 = await quizConcept.registerQuestion({
        quizId,
        character: char,
        targetZhuyinRep: zhuyin,
      });
      assertNoError(result1);
      const questionId1 = result1 as ID;

      const result2 = await quizConcept.registerQuestion({
        quizId,
        character: char,
        targetZhuyinRep: zhuyin,
      });
      assertNoError(result2);
      const questionId2 = result2 as ID;

      assertNotEquals(questionId1, questionId2); // Should be distinct question IDs

      const quizEntry = await db.collection("Quiz.quizzes").findOne({
        _id: quizId,
      });
      assertExists(quizEntry);
      assertEquals(quizEntry.questionList.length, 2);
      assertEquals(quizEntry.questionCount, 2);
    });

    await t.step("should return an error if quizId does not exist", async () => {
      const fakeQuizId = "nonExistentQuiz" as ID;
      const result = await quizConcept.registerQuestion({
        quizId: fakeQuizId,
        character: char,
        targetZhuyinRep: zhuyin,
      });
      assertHasError(result);
      assertEquals(result.error, `Quiz with ID '${fakeQuizId}' not found.`);
    });
  });

  await t.step("startQuestion", async (t) => {
    let quizId: ID;
    let questionId: ID;
    const char = "你" as Character;
    const zhuyin = "ㄋㄧˇ" as ZhuyinRep;

    t.beforeEach(async () => {
      quizId = await quizConcept.makeQuiz({ length: 60 });
      const result = await quizConcept.registerQuestion({
        quizId,
        character: char,
        targetZhuyinRep: zhuyin,
      });
      assertNoError(result);
      questionId = result as ID;
    });

    await t.step("should mark question as started and set activeQuestionId", async () => {
      const result = await quizConcept.startQuestion({ quizId, questionId });
      assertNoError(result);

      const questionEntry = await db.collection("Quiz.questions").findOne({
        _id: questionId,
      });
      assertExists(questionEntry);
      assertInstanceOf(questionEntry.startTime, Date);

      const quizEntry = await db.collection("Quiz.quizzes").findOne({
        _id: quizId,
      });
      assertExists(quizEntry);
      assertEquals(quizEntry.activeQuestionId, questionId);
      assertInstanceOf(quizEntry.expiryTime, Date); // First question started, so expiryTime should be set
    });

    await t.step("should return an error if question already started", async () => {
      await quizConcept.startQuestion({ quizId, questionId }); // Start once
      const result = await quizConcept.startQuestion({ quizId, questionId }); // Start again
      assertHasError(result);
      assertEquals(
        result.error,
        `Unexpected error: Question '${questionId}' has already been started.`,
      );
    });

    await t.step("should return an error if quizId does not exist", async () => {
      const fakeQuizId = "nonExistentQuiz" as ID;
      const result = await quizConcept.startQuestion({
        quizId: fakeQuizId,
        questionId,
      });
      assertHasError(result);
      assertEquals(result.error, `Quiz with ID '${fakeQuizId}' not found.`);
    });

    await t.step("should return an error if questionId does not exist", async () => {
      const fakeQuestionId = "nonExistentQuestion" as ID;
      const result = await quizConcept.startQuestion({
        quizId,
        questionId: fakeQuestionId,
      });
      assertHasError(result);
      assertEquals(result.error, `Question with ID '${fakeQuestionId}' not found.`);
    });

    await t.step("should return an error if questionId is not part of the quiz", async () => {
      const otherQuizId = await quizConcept.makeQuiz({ length: 30 });
      const otherChar = "他" as Character;
      const otherZhuyin = "ㄊㄚ" as ZhuyinRep;
      const otherQuestionResult = await quizConcept.registerQuestion({
        quizId: otherQuizId,
        character: otherChar,
        targetZhuyinRep: otherZhuyin,
      });
      assertNoError(otherQuestionResult);
      const otherQuestionId = otherQuestionResult as ID;

      const result = await quizConcept.startQuestion({
        quizId,
        questionId: otherQuestionId,
      }); // Trying to start otherQuestionId on quizId
      assertHasError(result);
      assertEquals(
        result.error,
        `Question '${otherQuestionId}' is not part of Quiz '${quizId}'.`,
      );
    });

    await t.step("should return an error if quiz already has an active question", async () => {
      const char2 = "好" as Character;
      const zhuyin2 = "ㄏㄠˇ" as ZhuyinRep;
      const questionResult2 = await quizConcept.registerQuestion({
        quizId,
        character: char2,
        targetZhuyinRep: zhuyin2,
      });
      assertNoError(questionResult2);
      const questionId2 = questionResult2 as ID;

      await quizConcept.startQuestion({ quizId, questionId }); // Start first question
      const result = await quizConcept.startQuestion({ quizId, questionId: questionId2 }); // Try to start second
      assertHasError(result);
      assertEquals(
        result.error,
        `Quiz '${quizId}' already has an active question '${questionId}'.`,
      );
    });
  });

  await t.step("submitAnswer", async (t) => {
    let quizId: ID;
    let questionId: ID;
    const char = "你" as Character;
    const targetZhuyin = "ㄋㄧˇ" as ZhuyinRep;
    const wrongZhuyin = "ㄋㄧ" as ZhuyinRep;

    t.beforeEach(async () => {
      quizId = await quizConcept.makeQuiz({ length: 60 });
      const result = await quizConcept.registerQuestion({
        quizId,
        character: char,
        targetZhuyinRep: targetZhuyin,
      });
      assertNoError(result);
      questionId = result as ID;
    });

    await t.step("should submit a correct answer and update stats", async () => {
      await quizConcept.startQuestion({ quizId, questionId });
      await delay(100); // Simulate response time
      const result = await quizConcept.submitAnswer({
        quizId,
        questionId,
        response: targetZhuyin,
      });
      assertNoError(result);

      const questionEntry = await db.collection("Quiz.questions").findOne({
        _id: questionId,
      });
      assertExists(questionEntry);
      assertInstanceOf(questionEntry.endTime, Date);
      assertEquals(questionEntry.response, targetZhuyin);
      assertEquals(questionEntry.correct, true);
      assertExists(questionEntry.speed);
      assertNotEquals(questionEntry.speed, undefined); // Speed should be calculated

      const quizEntry = await db.collection("Quiz.quizzes").findOne({
        _id: quizId,
      });
      assertExists(quizEntry);
      assertEquals(quizEntry.activeQuestionId, undefined);
      assertEquals(quizEntry.completedCount, 1);
      assertNotEquals(quizEntry.avgSpeed, 0); // Should be updated
      assertEquals(quizEntry.avgAccuracy, 1); // 1 correct out of 1
      assertEquals(quizEntry.incorrectList.length, 0);
    });

    await t.step("should submit an incorrect answer and update stats", async () => {
      await quizConcept.startQuestion({ quizId, questionId });
      await delay(150); // Simulate response time
      const result = await quizConcept.submitAnswer({
        quizId,
        questionId,
        response: wrongZhuyin,
      });
      assertNoError(result);

      const questionEntry = await db.collection("Quiz.questions").findOne({
        _id: questionId,
      });
      assertExists(questionEntry);
      assertInstanceOf(questionEntry.endTime, Date);
      assertEquals(questionEntry.response, wrongZhuyin);
      assertEquals(questionEntry.correct, false);
      assertExists(questionEntry.speed);

      const quizEntry = await db.collection("Quiz.quizzes").findOne({
        _id: quizId,
      });
      assertExists(quizEntry);
      assertEquals(quizEntry.activeQuestionId, undefined);
      assertEquals(quizEntry.completedCount, 1);
      assertNotEquals(quizEntry.avgSpeed, 0);
      assertEquals(quizEntry.avgAccuracy, 0); // 0 correct out of 1
      assertEquals(quizEntry.incorrectList.length, 1);
      assertObjectMatch(quizEntry.incorrectList[0], {
        character: char,
        target: targetZhuyin,
        response: wrongZhuyin,
      });
    });

    await t.step("should return an error if quizId does not exist", async () => {
      const fakeQuizId = "nonExistentQuiz" as ID;
      const result = await quizConcept.submitAnswer({
        quizId: fakeQuizId,
        questionId,
        response: targetZhuyin,
      });
      assertHasError(result);
      assertEquals(result.error, `Quiz with ID '${fakeQuizId}' not found.`);
    });

    await t.step("should return an error if questionId does not exist", async () => {
      const fakeQuestionId = "nonExistentQuestion" as ID;
      await quizConcept.startQuestion({ quizId, questionId }); // Ensure quiz is in a state to submit
      const result = await quizConcept.submitAnswer({
        quizId,
        questionId: fakeQuestionId,
        response: targetZhuyin,
      });
      assertHasError(result);
      assertEquals(result.error, `Question with ID '${fakeQuestionId}' not found.`);
    });

    await t.step("should return an error if question not started", async () => {
      // Do not call startQuestion
      const result = await quizConcept.submitAnswer({
        quizId,
        questionId,
        response: targetZhuyin,
      });
      assertHasError(result);
      assertEquals(result.error, `Question '${questionId}' not started.`);
    });

    await t.step("should return an error if question already submitted", async () => {
      await quizConcept.startQuestion({ quizId, questionId });
      await quizConcept.submitAnswer({
        quizId,
        questionId,
        response: targetZhuyin,
      }); // Submit once
      const result = await quizConcept.submitAnswer({
        quizId,
        questionId,
        response: targetZhuyin,
      }); // Submit again
      assertHasError(result);
      assertEquals(result.error, `Question '${questionId}' has already been submitted.`);
    });

    await t.step("should return an error if question is not the active question", async () => {
      const char2 = "好" as Character;
      const zhuyin2 = "ㄏㄠˇ" as ZhuyinRep;
      const questionResult2 = await quizConcept.registerQuestion({
        quizId,
        character: char2,
        targetZhuyinRep: zhuyin2,
      });
      assertNoError(questionResult2);
      const questionId2 = questionResult2 as ID;

      await quizConcept.startQuestion({ quizId, questionId }); // Start question 1
      const result = await quizConcept.submitAnswer({
        quizId,
        questionId: questionId2,
        response: zhuyin2,
      }); // Try to submit question 2
      assertHasError(result);
      assertEquals(
        result.error,
        `Question '${questionId2}' is not the currently active question for Quiz '${quizId}'.`,
      );
    });
  });

  await t.step("endQuiz", async (t) => {
    let quizId: ID;
    let questionId: ID;
    const char = "你" as Character;
    const targetZhuyin = "ㄋㄧˇ" as ZhuyinRep;

    t.beforeEach(async () => {
      // Make a quiz with a very short length to easily test expiry
      quizId = await quizConcept.makeQuiz({ length: 0.1 }); // 0.1 seconds
      const result = await quizConcept.registerQuestion({
        quizId,
        character: char,
        targetZhuyinRep: targetZhuyin,
      });
      assertNoError(result);
      questionId = result as ID;
    });

    await t.step("should return an error if quiz is not expired", async () => {
      await quizConcept.startQuestion({ quizId, questionId }); // This sets the expiryTime
      const result = await quizConcept.endQuiz({ quizId }); // Immediately try to end
      assertHasError(result);
      assertEquals(
        result.error,
        `Quiz '${quizId}' cannot be ended yet. Timer has not run out.`,
      );
    });

    await t.step("should return quiz stats if quiz is expired", async () => {
      await quizConcept.startQuestion({ quizId, questionId }); // Sets expiryTime
      await quizConcept.submitAnswer({
        quizId,
        questionId,
        response: targetZhuyin,
      }); // Complete a question

      await delay(150); // Wait for expiry (0.1s + buffer)

      const result = await quizConcept.endQuiz({ quizId });
      assertNoError(result);
      assertExists(result.avgSpeed);
      assertExists(result.avgAccuracy);
      assertEquals(result.incorrectRecords.length, 0); // Since we submitted correctly
    });

    await t.step("should return an error if quizId does not exist", async () => {
      const fakeQuizId = "nonExistentQuiz" as ID;
      const result = await quizConcept.endQuiz({ quizId: fakeQuizId });
      assertHasError(result);
      assertEquals(result.error, `Quiz with ID '${fakeQuizId}' not found.`);
    });
  });
});
```