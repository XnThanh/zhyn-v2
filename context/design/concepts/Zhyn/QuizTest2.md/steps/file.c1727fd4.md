---
timestamp: 'Wed Oct 15 2025 15:26:28 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251015_152628.c61a07b1.md]]'
content_id: c1727fd4343071776d1c1286fd98308528836935fb497c3d7bac168562c67e71
---

# file: src\concepts\Quiz\QuizConcept.test.ts

```typescript
import { assertEquals, assertNotEquals, assert, assertInstanceOf } from "jsr:@std/assert";
import { testDb } from "@utils/database.ts";
import QuizConcept from "./QuizConcept.ts";
import { ID } from "@utils/types.ts";

// Helper for introducing a small delay to ensure speed calculation is non-zero
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

Deno.test("Quiz Concept", async (t) => {
  let db, client;
  let quizConcept: QuizConcept;

  // Setup before each test block or step if needed (testDb handles collection clearing per file)
  t.beforeEach(async () => {
    [db, client] = await testDb();
    quizConcept = new QuizConcept(db);
  });

  // Teardown after each test block
  t.afterEach(async () => {
    await client.close();
  });

  await t.step("action: register", async (t) => {
    const char1 = "一";
    const zhuyin1 = "ㄧ";
    const char2 = "二";
    const zhuyin2 = "ㄦˋ";

    await t.step("add new question", async () => {
      const { questionId } = await quizConcept.register({
        character: char1,
        zhuyinRep: zhuyin1,
      });

      assert(questionId, "questionId should be returned");

      const result = await quizConcept.getQuestionDetails({ questionId });
      assert(!("error" in result), "Should not return an error");
      assertEquals(result.details.character, char1);
      assertEquals(result.details.target, zhuyin1);
      assertEquals(result.details._id, questionId);
      assertEquals(result.details.startTime, undefined);
      assertEquals(result.details.endTime, undefined);
    });

    await t.step("add new question with duplicate character (ok)", async () => {
      const { questionId: qId1 } = await quizConcept.register({
        character: char1,
        zhuyinRep: zhuyin1,
      });
      const { questionId: qId2 } = await quizConcept.register({
        character: char1,
        zhuyinRep: zhuyin1,
      });

      assert(qId1, "First questionId should be returned");
      assert(qId2, "Second questionId should be returned");
      assertNotEquals(qId1, qId2, "Should generate distinct question IDs");

      const details1 = await quizConcept.getQuestionDetails({ questionId: qId1 });
      const details2 = await quizConcept.getQuestionDetails({ questionId: qId2 });
      assert(!("error" in details1));
      assert(!("error" in details2));
      assertEquals(details1.details.character, char1);
      assertEquals(details2.details.character, char1);
    });
  });

  await t.step("action: startQuestion", async (t) => {
    const char = "三";
    const zhuyin = "ㄙㄢ";
    let questionId: ID;

    t.beforeEach(async () => {
      const { questionId: newId } = await quizConcept.register({
        character: char,
        zhuyinRep: zhuyin,
      });
      questionId = newId;
    });

    await t.step("start question with valid question id", async () => {
      const result = await quizConcept.startQuestion({ questionId });
      assert(!("error" in result), "Should not return an error");

      const detailsResult = await quizConcept.getQuestionDetails({ questionId });
      assert(!("error" in detailsResult));
      const { details } = detailsResult;
      assert(details.startTime, "startTime should be set");
      assertInstanceOf(details.startTime, Date, "startTime should be a Date object");
    });

    await t.step("start question that already started", async () => {
      await quizConcept.startQuestion({ questionId }); // First start
      const result = await quizConcept.startQuestion({ questionId }); // Second start
      assert("error" in result, "Should return an error");
      assertEquals(
        result.error,
        `Question '${questionId}' has already been started.`,
        "Error message should indicate already started",
      );
    });

    await t.step("start question with invalid question id", async () => {
      const invalidId = "invalid-id-123";
      const result = await quizConcept.startQuestion({ questionId: invalidId });
      assert("error" in result, "Should return an error");
      assertEquals(
        result.error,
        `Question with ID '${invalidId}' not found.`,
        "Error message should indicate question not found",
      );
    });
  });

  await t.step("action: submitAnswer", async (t) => {
    const char = "四";
    const targetZhuyin = "ㄙˋ";
    let questionId: ID;

    t.beforeEach(async () => {
      const { questionId: newId } = await quizConcept.register({
        character: char,
        zhuyinRep: targetZhuyin,
      });
      questionId = newId;
    });

    await t.step("submit correct answer", async () => {
      await quizConcept.startQuestion({ questionId });
      await delay(10); // Simulate user typing time
      const result = await quizConcept.submitAnswer({
        questionId,
        response: targetZhuyin,
      });
      assert(!("error" in result), "Should not return an error");

      const detailsResult = await quizConcept.getQuestionDetails({ questionId });
      assert(!("error" in detailsResult));
      const { details } = detailsResult;
      assert(details.endTime, "endTime should be set");
      assertInstanceOf(details.endTime, Date, "endTime should be a Date object");
      assertEquals(details.response, targetZhuyin);
      assert(details.speed! > 0, "speed should be a positive number");
      assertEquals(details.correct, true, "correct should be true for correct answer");
    });

    await t.step("submit incorrect answer", async () => {
      await quizConcept.startQuestion({ questionId });
      await delay(10); // Simulate user typing time
      const incorrectZhuyin = "ㄒㄧˋ";
      const result = await quizConcept.submitAnswer({
        questionId,
        response: incorrectZhuyin,
      });
      assert(!("error" in result), "Should not return an error");

      const detailsResult = await quizConcept.getQuestionDetails({ questionId });
      assert(!("error" in detailsResult));
      const { details } = detailsResult;
      assert(details.endTime, "endTime should be set");
      assertEquals(details.response, incorrectZhuyin);
      assert(details.speed! > 0, "speed should be a positive number");
      assertEquals(details.correct, false, "correct should be false for incorrect answer");
    });

    await t.step("submit with invalid question id", async () => {
      const invalidId = "invalid-id-456";
      const result = await quizConcept.submitAnswer({
        questionId: invalidId,
        response: targetZhuyin,
      });
      assert("error" in result, "Should return an error");
      assertEquals(
        result.error,
        `Question with ID '${invalidId}' not found.`,
        "Error message should indicate question not found",
      );
    });

    await t.step("submit question that has not started", async () => {
      // Don't call startQuestion
      const result = await quizConcept.submitAnswer({
        questionId,
        response: targetZhuyin,
      });
      assert("error" in result, "Should return an error");
      assertEquals(
        result.error,
        `Question '${questionId}' must be started before submitting an answer.`,
        "Error message should indicate question not started",
      );
    });

    await t.step("submit question that already submitted", async () => {
      await quizConcept.startQuestion({ questionId });
      await quizConcept.submitAnswer({ questionId, response: targetZhuyin }); // First submission
      const result = await quizConcept.submitAnswer({
        questionId,
        response: targetZhuyin,
      }); // Second submission
      assert("error" in result, "Should return an error");
      assertEquals(
        result.error,
        `Question '${questionId}' has already been submitted.`,
        "Error message should indicate already submitted",
      );
    });
  });

  await t.step("query: getSpeed", async (t) => {
    const char = "五";
    const targetZhuyin = "ㄨˇ";
    let questionId: ID;

    t.beforeEach(async () => {
      const { questionId: newId } = await quizConcept.register({
        character: char,
        zhuyinRep: targetZhuyin,
      });
      questionId = newId;
    });

    await t.step("valid question id, speed available", async () => {
      await quizConcept.startQuestion({ questionId });
      await delay(10); // Ensure speed is measurable
      await quizConcept.submitAnswer({ questionId, response: targetZhuyin });

      const result = await quizConcept.getSpeed({ questionId });
      assert(!("error" in result), "Should not return an error");
      assert(result.speed >= 10, "Speed should be at least 10ms (due to delay)");
      assert(typeof result.speed === "number", "Speed should be a number");
    });

    await t.step("valid question id, speed not available", async () => {
      // Question registered but not submitted
      const result = await quizConcept.getSpeed({ questionId });
      assert("error" in result, "Should return an error");
      assertEquals(
        result.error,
        `Question '${questionId}' has not been completed, speed not available.`,
        "Error message should indicate speed not available",
      );
    });

    await t.step("invalid question id", async () => {
      const invalidId = "invalid-id-789";
      const result = await quizConcept.getSpeed({ questionId: invalidId });
      assert("error" in result, "Should return an error");
      assertEquals(
        result.error,
        `Question with ID '${invalidId}' not found.`,
        "Error message should indicate question not found",
      );
    });
  });

  await t.step("query: getAccuracy", async (t) => {
    const char = "六";
    const targetZhuyin = "ㄌㄧㄡˋ";
    let questionId: ID;

    t.beforeEach(async () => {
      const { questionId: newId } = await quizConcept.register({
        character: char,
        zhuyinRep: targetZhuyin,
      });
      questionId = newId;
    });

    await t.step("valid question id, accuracy available (correct)", async () => {
      await quizConcept.startQuestion({ questionId });
      await quizConcept.submitAnswer({ questionId, response: targetZhuyin });

      const result = await quizConcept.getAccuracy({ questionId });
      assert(!("error" in result), "Should not return an error");
      assertEquals(result.correct, true, "Accuracy should be true");
    });

    await t.step("valid question id, accuracy available (incorrect)", async () => {
      await quizConcept.startQuestion({ questionId });
      await quizConcept.submitAnswer({ questionId, response: "ㄌㄧㄡ" }); // Incorrect
      const result = await quizConcept.getAccuracy({ questionId });
      assert(!("error" in result), "Should not return an error");
      assertEquals(result.correct, false, "Accuracy should be false");
    });

    await t.step("valid question id, accuracy not available", async () => {
      // Question registered but not submitted
      const result = await quizConcept.getAccuracy({ questionId });
      assert("error" in result, "Should return an error");
      assertEquals(
        result.error,
        `Question '${questionId}' has not been completed, accuracy not available.`,
        "Error message should indicate accuracy not available",
      );
    });

    await t.step("invalid question id", async () => {
      const invalidId = "invalid-id-abc";
      const result = await quizConcept.getAccuracy({ questionId: invalidId });
      assert("error" in result, "Should return an error");
      assertEquals(
        result.error,
        `Question with ID '${invalidId}' not found.`,
        "Error message should indicate question not found",
      );
    });
  });

  await t.step("query: getQuestionDetails", async (t) => {
    const char = "七";
    const zhuyin = "ㄑㄧ";
    let questionId: ID;

    t.beforeEach(async () => {
      const { questionId: newId } = await quizConcept.register({
        character: char,
        zhuyinRep: zhuyin,
      });
      questionId = newId;
    });

    await t.step("return all details associated with the Question", async () => {
      const result = await quizConcept.getQuestionDetails({ questionId });
      assert(!("error" in result), "Should not return an error");
      const { details } = result;
      assertEquals(details._id, questionId);
      assertEquals(details.character, char);
      assertEquals(details.target, zhuyin);
      // Other fields should be undefined initially
      assertEquals(details.startTime, undefined);
      assertEquals(details.endTime, undefined);
      assertEquals(details.response, undefined);
      assertEquals(details.speed, undefined);
      assertEquals(details.correct, undefined);
    });

    await t.step("invalid question id", async () => {
      const invalidId = "invalid-id-xyz";
      const result = await quizConcept.getQuestionDetails({ questionId: invalidId });
      assert("error" in result, "Should return an error");
      assertEquals(
        result.error,
        `Question with ID '${invalidId}' not found.`,
        "Error message should indicate question not found",
      );
    });
  });

  await t.step("trace: Principle fulfillment", async (t) => {
    let qId1: ID, qId2: ID, qId3: ID;

    await t.step("1. system register 3 questions", async () => {
      const { questionId: id1 } = await quizConcept.register({ character: "一", zhuyinRep: "ㄧ" });
      const { questionId: id2 } = await quizConcept.register({ character: "二", zhuyinRep: "ㄦˋ" });
      const { questionId: id3 } = await quizConcept.register({ character: "三", zhuyinRep: "ㄙㄢ" });
      qId1 = id1;
      qId2 = id2;
      qId3 = id3;

      assert(qId1 && qId2 && qId3, "All three question IDs should be generated");
    });

    await t.step("2. user starts question 1", async () => {
      const result = await quizConcept.startQuestion({ questionId: qId1 });
      assert(!("error" in result), "Question 1 should start successfully");
      const details = await quizConcept.getQuestionDetails({ questionId: qId1 });
      assert(!("error" in details));
      assert(details.details.startTime, "Question 1 startTime should be set");
    });

    await t.step("3. user completes question 1 (correct)", async () => {
      await delay(10);
      const result = await quizConcept.submitAnswer({ questionId: qId1, response: "ㄧ" });
      assert(!("error" in result), "Question 1 should submit successfully");
      const details = await quizConcept.getQuestionDetails({ questionId: qId1 });
      assert(!("error" in details));
      assert(details.details.endTime, "Question 1 endTime should be set");
      assert(details.details.speed! > 0, "Question 1 speed should be positive");
      assertEquals(details.details.correct, true, "Question 1 should be correct");
    });

    await t.step("4. user starts question 2", async () => {
      const result = await quizConcept.startQuestion({ questionId: qId2 });
      assert(!("error" in result), "Question 2 should start successfully");
      const details = await quizConcept.getQuestionDetails({ questionId: qId2 });
      assert(!("error" in details));
      assert(details.details.startTime, "Question 2 startTime should be set");
    });

    await t.step("5. user completes question 2 (incorrect)", async () => {
      await delay(10);
      const result = await quizConcept.submitAnswer({ questionId: qId2, response: "ㄦ" }); // Incorrect response
      assert(!("error" in result), "Question 2 should submit successfully");
      const details = await quizConcept.getQuestionDetails({ questionId: qId2 });
      assert(!("error" in details));
      assert(details.details.endTime, "Question 2 endTime should be set");
      assert(details.details.speed! > 0, "Question 2 speed should be positive");
      assertEquals(details.details.correct, false, "Question 2 should be incorrect");
    });

    await t.step("6. system gets speed and accuracy of all questions", async () => {
      // Question 1
      const speed1 = await quizConcept.getSpeed({ questionId: qId1 });
      assert(!("error" in speed1));
      assert(speed1.speed > 0);

      const accuracy1 = await quizConcept.getAccuracy({ questionId: qId1 });
      assert(!("error" in accuracy1));
      assertEquals(accuracy1.correct, true);

      // Question 2
      const speed2 = await quizConcept.getSpeed({ questionId: qId2 });
      assert(!("error" in speed2));
      assert(speed2.speed > 0);

      const accuracy2 = await quizConcept.getAccuracy({ questionId: qId2 });
      assert(!("error" in accuracy2));
      assertEquals(accuracy2.correct, false);

      // Question 3 (not started/submitted)
      const speed3 = await quizConcept.getSpeed({ questionId: qId3 });
      assert("error" in speed3);
      assertEquals(
        speed3.error,
        `Question '${qId3}' has not been completed, speed not available.`,
      );

      const accuracy3 = await quizConcept.getAccuracy({ questionId: qId3 });
      assert("error" in accuracy3);
      assertEquals(
        accuracy3.error,
        `Question '${qId3}' has not been completed, accuracy not available.`,
      );
    });
  });
});
```
