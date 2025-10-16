---
timestamp: 'Wed Oct 15 2025 03:36:15 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251015_033615.8064154e.md]]'
content_id: 6f52bcb567dd096e18d869e84a29eec5f6912a639ae3c6a64098db9041e71bb3
---

# file: src\concepts\Quiz\QuizConcept.test.ts

```typescript
import { assertEquals, assertExists, assertInstanceOf, assertNotEquals, assertObjectMatch, assert } from "jsr:@std/assert";
import { testDb } from "@utils/database.ts";
import QuizConcept from "./QuizConcept.ts";
import { Character, ID, ZhuyinRep } from "@utils/types.ts"; // Assuming Character, ID, ZhuyinRep are defined here

Deno.test("QuizConcept", async (t) => {
  const [db, client] = await testDb();
  const quizConcept = new QuizConcept(db);

  // Define common test data
  const character1: Character = "你";
  const targetZhuyin1: ZhuyinRep = "ㄋㄧˇ";

  const character2: Character = "好";
  const targetZhuyin2: ZhuyinRep = "ㄏㄠˇ";

  // Helper to introduce a small delay for time-sensitive tests (e.g., speed calculation)
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  await t.step("1. Action: register (Character, ZhuyinRep)", async (t) => {
    let questionId1: ID;

    await t.step("effects: Generate a questionId and create a new Question", async () => {
      const result = await quizConcept.register({ character: character1, zhuyinRep: targetZhuyin1 });
      assertExists(result.questionId, "Should return a questionId");
      questionId1 = result.questionId;

      const details = await quizConcept.getQuestionDetails({ questionId: questionId1 });
      if ("error" in details) {
        throw new Error(`Failed to retrieve question details for verification: ${details.error}`);
      }

      assertObjectMatch(details.details, {
        _id: questionId1,
        character: character1,
        target: targetZhuyin1,
        response: undefined,
        startTime: undefined,
        endTime: undefined,
        speed: undefined,
        correct: undefined,
      }, "Initial question state should have only character, target, and ID set");
    });

    await t.step("should register another question independently with a unique ID", async () => {
      const result = await quizConcept.register({ character: character2, zhuyinRep: targetZhuyin2 });
      assertExists(result.questionId);
      const questionId2 = result.questionId;
      assertNotEquals(questionId2, questionId1, "Should generate a unique ID for the second question");

      const details = await quizConcept.getQuestionDetails({ questionId: questionId2 });
      if ("error" in details) {
        throw new Error(`Failed to retrieve question details for verification: ${details.error}`);
      }
      assertObjectMatch(details.details, {
        _id: questionId2,
        character: character2,
        target: targetZhuyin2,
      }, "Second question should also be registered correctly");
    });
  });

  // Setup a question for `startQuestion` and `submitAnswer` tests
  let registeredQuestionIdForActions: ID;
  Deno.test.beforeAll(async () => {
    const { questionId } = await quizConcept.register({ character: character1, zhuyinRep: targetZhuyin1 });
    registeredQuestionIdForActions = questionId;
  });

  await t.step("2. Action: startQuestion (questionId: String)", async (t) => {
    await t.step("requires: Question exists and startTime is unset - should succeed", async () => {
      const result = await quizConcept.startQuestion({ questionId: registeredQuestionIdForActions });
      assertObjectMatch(result, {}, "Should return an empty object on success");

      const details = await quizConcept.getQuestionDetails({ questionId: registeredQuestionIdForActions });
      if ("error" in details) { throw new Error(details.error); }
      assertExists(details.details.startTime, "startTime should be set after starting the question");
      assertInstanceOf(details.details.startTime, Date, "startTime should be a Date object");
    });

    await t.step("requires: Question not already started - should fail if already started", async () => {
      const result = await quizConcept.startQuestion({ questionId: registeredQuestionIdForActions });
      assertObjectMatch(result, { error: `Question '${registeredQuestionIdForActions}' has already been started.` },
        "Should return an error if the question is already started");
    });

    await t.step("requires: Question exists - should fail if question does not exist", async () => {
      const nonExistentId: ID = "nonExistentStartId";
      const result = await quizConcept.startQuestion({ questionId: nonExistentId });
      assertObjectMatch(result, { error: `Question with ID '${nonExistentId}' not found.` },
        "Should return an error if the question ID does not exist");
    });
  });

  await t.step("3. Action: submitAnswer (questionId: String, response: ZhuyinRep)", async (t) => {
    const wrongZhuyin: ZhuyinRep = "ㄒㄧㄥˊ"; // Example wrong Zhuyin for "你"

    let testQuestionIdCorrect: ID;
    await t.step("Setup: Register and start a fresh question for correct answer test", async () => {
      const { questionId } = await quizConcept.register({ character: character1, zhuyinRep: targetZhuyin1 });
      testQuestionIdCorrect = questionId;
      await delay(10); // Ensure a small time difference for speed calculation
      const startResult = await quizConcept.startQuestion({ questionId: testQuestionIdCorrect });
      if ("error" in startResult) { throw new Error(startResult.error); }
    });

    await t.step("effects: set endTime, response, speed, correct - should succeed with correct answer", async () => {
      await delay(50); // Simulate typing time
      const submitResult = await quizConcept.submitAnswer({ questionId: testQuestionIdCorrect, response: targetZhuyin1 });
      assertObjectMatch(submitResult, {}, "Should return an empty object on success");

      const details = await quizConcept.getQuestionDetails({ questionId: testQuestionIdCorrect });
      if ("error" in details) { throw new Error(details.error); }

      assertExists(details.details.endTime, "endTime should be set");
      assertInstanceOf(details.details.endTime, Date, "endTime should be a Date object");
      assertEquals(details.details.response, targetZhuyin1, "response should match the submitted Zhuyin");
      assertExists(details.details.speed, "speed should be calculated and set");
      assert(details.details.speed! >= 50, `Speed (${details.details.speed}) should reflect the simulated delay (>=50ms)`);
      assertEquals(details.details.correct, true, "correct should be true for a correct answer");
      assert(details.details.startTime! < details.details.endTime!, "endTime should be after startTime");
    });

    let testQuestionIdWrong: ID;
    await t.step("Setup: Register and start another fresh question for wrong answer test", async () => {
      const { questionId } = await quizConcept.register({ character: character1, zhuyinRep: targetZhuyin1 });
      testQuestionIdWrong = questionId;
      await delay(10);
      const startResult = await quizConcept.startQuestion({ questionId: testQuestionIdWrong });
      if ("error" in startResult) { throw new Error(startResult.error); }
    });

    await t.step("effects: set endTime, response, speed, correct - should succeed with wrong answer", async () => {
      await delay(50); // Simulate typing time
      const submitResult = await quizConcept.submitAnswer({ questionId: testQuestionIdWrong, response: wrongZhuyin });
      assertObjectMatch(submitResult, {}, "Should return an empty object on success");

      const details = await quizConcept.getQuestionDetails({ questionId: testQuestionIdWrong });
      if ("error" in details) { throw new Error(details.error); }

      assertExists(details.details.endTime, "endTime should be set");
      assertInstanceOf(details.details.endTime, Date, "endTime should be a Date object");
      assertEquals(details.details.response, wrongZhuyin, "response should match the submitted Zhuyin");
      assertExists(details.details.speed, "speed should be calculated and set");
      assert(details.details.speed! >= 50, `Speed (${details.details.speed}) should reflect the simulated delay (>=50ms)`);
      assertEquals(details.details.correct, false, "correct should be false for an incorrect answer");
      assert(details.details.startTime! < details.details.endTime!, "endTime should be after startTime");
    });

    await t.step("requires: Question exists - should fail if question does not exist", async () => {
      const nonExistentId: ID = "nonExistentSubmitId";
      const result = await quizConcept.submitAnswer({ questionId: nonExistentId, response: targetZhuyin1 });
      assertObjectMatch(result, { error: `Question with ID '${nonExistentId}' not found.` },
        "Should return an error if the question ID does not exist");
    });

    await t.step("requires: Question started - should fail if question not started", async () => {
      const { questionId: unstartedQuestionId } = await quizConcept.register({ character: character2, zhuyinRep: targetZhuyin2 });
      const result = await quizConcept.submitAnswer({ questionId: unstartedQuestionId, response: targetZhuyin2 });
      assertObjectMatch(result, { error: `Question '${unstartedQuestionId}' must be started before submitting an answer.` },
        "Should return an error if the question has not been started");
    });

    await t.step("requires: endTime unset - should fail if already submitted", async () => {
      // testQuestionIdCorrect is already submitted from a previous step
      const result = await quizConcept.submitAnswer({ questionId: testQuestionIdCorrect, response: targetZhuyin1 });
      assertObjectMatch(result, { error: `Question '${testQuestionIdCorrect}' has already been submitted.` },
        "Should return an error if the question has already been submitted");
    });
  });

  // Setup a completed question for `getSpeed` and `getAccuracy` tests
  let completedQuestionId: ID;
  let expectedSpeed: number;
  let isCorrect: boolean;

  Deno.test.beforeAll(async () => {
    const { questionId } = await quizConcept.register({ character: character1, zhuyinRep: targetZhuyin1 });
    completedQuestionId = questionId;
    await delay(10); // Start delay
    await quizConcept.startQuestion({ questionId: completedQuestionId });
    // Retrieve startTime right after setting it to get a more accurate duration base
    const startTime = (await quizConcept.getQuestionDetails({ questionId: completedQuestionId }) as any).details.startTime;
    await delay(100); // Simulate typing time
    await quizConcept.submitAnswer({ questionId: completedQuestionId, response: targetZhuyin1 });
    // Retrieve endTime right after setting it
    const endTime = (await quizConcept.getQuestionDetails({ questionId: completedQuestionId }) as any).details.endTime;
    expectedSpeed = endTime.getTime() - startTime.getTime();
    isCorrect = true;
  });

  await t.step("4. Query: getSpeed (questionId: String)", async (t) => {
    await t.step("requires: Question exists and endTime set - should return speed", async () => {
      const result = await quizConcept.getSpeed({ questionId: completedQuestionId });
      assertObjectMatch(result, { speed: expectedSpeed }, "Should return the correct calculated speed");
      assert(result.speed! >= 100, `Speed (${result.speed}) should reflect the simulated delay (>=100ms)`);
    });

    await t.step("requires: Question exists - should fail if question does not exist", async () => {
      const nonExistentId: ID = "nonExistentSpeedId";
      const result = await quizConcept.getSpeed({ questionId: nonExistentId });
      assertObjectMatch(result, { error: `Question with ID '${nonExistentId}' not found.` },
        "Should return an error if the question ID does not exist");
    });

    await t.step("requires: endTime set - should fail if question not completed", async () => {
      const { questionId: uncompletedQuestionId } = await quizConcept.register({ character: character2, zhuyinRep: targetZhuyin2 });
      await quizConcept.startQuestion({ questionId: uncompletedQuestionId }); // Only started, not submitted
      const result = await quizConcept.getSpeed({ questionId: uncompletedQuestionId });
      assertObjectMatch(result, { error: `Question '${uncompletedQuestionId}' has not been completed, speed not available.` },
        "Should return an error if the question has not been completed");
    });
  });

  await t.step("5. Query: getAccuracy (questionId: String)", async (t) => {
    await t.step("requires: Question exists and endTime set - should return accuracy", async () => {
      const result = await quizConcept.getAccuracy({ questionId: completedQuestionId });
      assertObjectMatch(result, { correct: isCorrect }, "Should return the correct accuracy status");
    });

    await t.step("requires: Question exists - should fail if question does not exist", async () => {
      const nonExistentId: ID = "nonExistentAccuracyId";
      const result = await quizConcept.getAccuracy({ questionId: nonExistentId });
      assertObjectMatch(result, { error: `Question with ID '${nonExistentId}' not found.` },
        "Should return an error if the question ID does not exist");
    });

    await t.step("requires: endTime set - should fail if question not completed", async () => {
      const { questionId: uncompletedQuestionId } = await quizConcept.register({ character: character2, zhuyinRep: targetZhuyin2 });
      await quizConcept.startQuestion({ questionId: uncompletedQuestionId }); // Only started, not submitted
      const result = await quizConcept.getAccuracy({ questionId: uncompletedQuestionId });
      assertObjectMatch(result, { error: `Question '${uncompletedQuestionId}' has not been completed, accuracy not available.` },
        "Should return an error if the question has not been completed");
    });
  });

  await client.close();
});
```
