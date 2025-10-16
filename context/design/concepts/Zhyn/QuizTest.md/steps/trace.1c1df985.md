---
timestamp: 'Wed Oct 15 2025 03:36:15 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251015_033615.8064154e.md]]'
content_id: 1c1df985ebabccf8861b2837a02687e84db6532a28368d2e586f1ab0f41bbc0e
---

# trace:

The principle states: "track the speed and accuracy for each Character that user typed". This trace demonstrates how the `QuizConcept` fulfills this principle by tracking a user's interaction with two distinct questions, one answered correctly and one incorrectly, and then querying their speed and accuracy.

```typescript
// Inside Deno.test("QuizConcept", ...)
await t.step("Principle fulfillment: Track speed and accuracy for a character", async (t) => {
  const quizConcept = new QuizConcept(db); // Re-instantiate for clarity in trace or use the existing one
  const traceCharacter: Character = "地";
  const traceTargetZhuyin: ZhuyinRep = "ㄉㄧˋ";
  const traceWrongZhuyin: ZhuyinRep = "ㄉㄜ˙"; // example wrong Zhuyin for "地"

  // --- Trace for a correct answer scenario ---
  let correctQuestionId: ID;
  let correctSpeed: number;

  await t.step("Trace 1.1: Register a question for character '地' with target 'ㄉㄧˋ'", async () => {
    const { questionId } = await quizConcept.register({ character: traceCharacter, zhuyinRep: traceTargetZhuyin });
    correctQuestionId = questionId;
    assertExists(correctQuestionId);
    console.log(`[Trace] Registered question for '${traceCharacter}' with ID: ${correctQuestionId}`);

    const details = await quizConcept.getQuestionDetails({ questionId: correctQuestionId });
    if ("error" in details) { throw new Error(details.error); }
    assertEquals(details.details.character, traceCharacter, "Character should be set");
    assertEquals(details.details.target, traceTargetZhuyin, "Target Zhuyin should be set");
    assertEquals(details.details.startTime, undefined, "startTime should initially be unset");
  });

  await t.step("Trace 1.2: Start the question", async () => {
    await delay(10); // Simulate user seeing the question before starting
    const startResult = await quizConcept.startQuestion({ questionId: correctQuestionId });
    assertObjectMatch(startResult, {});
    console.log(`[Trace] Started question ${correctQuestionId}`);

    const details = await quizConcept.getQuestionDetails({ questionId: correctQuestionId });
    if ("error" in details) { throw new Error(details.error); }
    assertExists(details.details.startTime, "startTime should now be set");
  });

  await t.step("Trace 1.3: User submits a correct answer 'ㄉㄧˋ'", async () => {
    await delay(150); // Simulate typing time for the user
    const submitResult = await quizConcept.submitAnswer({ questionId: correctQuestionId, response: traceTargetZhuyin });
    assertObjectMatch(submitResult, {});
    console.log(`[Trace] Submitted correct answer '${traceTargetZhuyin}' for question ${correctQuestionId}`);

    const details = await quizConcept.getQuestionDetails({ questionId: correctQuestionId });
    if ("error" in details) { throw new Error(details.error); }
    assertExists(details.details.endTime, "endTime should be set after submission");
    assertEquals(details.details.response, traceTargetZhuyin, "Response should be recorded");
    assertEquals(details.details.correct, true, "Accuracy should be true for correct answer");
    assertExists(details.details.speed, "Speed should be calculated and recorded");
    correctSpeed = details.details.speed!;
    assert(correctSpeed >= 150, `Speed (${correctSpeed}) should be at least the simulated delay (150ms)`);
  });

  await t.step("Trace 1.4: Query for the speed of the correct attempt", async () => {
    const result = await quizConcept.getSpeed({ questionId: correctQuestionId });
    assertObjectMatch(result, { speed: correctSpeed });
    console.log(`[Trace] Retrieved speed for question ${correctQuestionId}: ${result.speed} ms`);
  });

  await t.step("Trace 1.5: Query for the accuracy of the correct attempt", async () => {
    const result = await quizConcept.getAccuracy({ questionId: correctQuestionId });
    assertObjectMatch(result, { correct: true });
    console.log(`[Trace] Retrieved accuracy for question ${correctQuestionId}: ${result.correct}`);
  });

  // --- Trace for an incorrect answer scenario ---
  let incorrectQuestionId: ID;
  let incorrectSpeed: number;

  await t.step("Trace 2.1: Register another question for character '地' with target 'ㄉㄧˋ'", async () => {
    const { questionId } = await quizConcept.register({ character: traceCharacter, zhuyinRep: traceTargetZhuyin });
    incorrectQuestionId = questionId;
    assertExists(incorrectQuestionId);
    console.log(`[Trace] Registered another question for '${traceCharacter}' with ID: ${incorrectQuestionId}`);
  });

  await t.step("Trace 2.2: Start the second question", async () => {
    await delay(10);
    const startResult = await quizConcept.startQuestion({ questionId: incorrectQuestionId });
    assertObjectMatch(startResult, {});
    console.log(`[Trace] Started question ${incorrectQuestionId}`);

    const details = await quizConcept.getQuestionDetails({ questionId: incorrectQuestionId });
    if ("error" in details) { throw new Error(details.error); }
    assertExists(details.details.startTime, "startTime should be set");
  });

  await t.step("Trace 2.3: User submits an incorrect answer 'ㄉㄜ˙'", async () => {
    await delay(200); // Simulate typing time
    const submitResult = await quizConcept.submitAnswer({ questionId: incorrectQuestionId, response: traceWrongZhuyin });
    assertObjectMatch(submitResult, {});
    console.log(`[Trace] Submitted incorrect answer '${traceWrongZhuyin}' for question ${incorrectQuestionId}`);

    const details = await quizConcept.getQuestionDetails({ questionId: incorrectQuestionId });
    if ("error" in details) { throw new Error(details.error); }
    assertExists(details.details.endTime, "endTime should be set after submission");
    assertEquals(details.details.response, traceWrongZhuyin, "Response should be recorded");
    assertEquals(details.details.correct, false, "Accuracy should be false for incorrect answer");
    assertExists(details.details.speed, "Speed should be calculated and recorded");
    incorrectSpeed = details.details.speed!;
    assert(incorrectSpeed >= 200, `Speed (${incorrectSpeed}) should be at least the simulated delay (200ms)`);
  });

  await t.step("Trace 2.4: Query for the speed of the incorrect attempt", async () => {
    const result = await quizConcept.getSpeed({ questionId: incorrectQuestionId });
    assertObjectMatch(result, { speed: incorrectSpeed });
    console.log(`[Trace] Retrieved speed for question ${incorrectQuestionId}: ${result.speed} ms`);
  });

  await t.step("Trace 2.5: Query for the accuracy of the incorrect attempt", async () => {
    const result = await quizConcept.getAccuracy({ questionId: incorrectQuestionId });
    assertObjectMatch(result, { correct: false });
    console.log(`[Trace] Retrieved accuracy for question ${incorrectQuestionId}: ${result.correct}`);
  });

  console.log(`\n[Principle Fulfillment Summary]
  The QuizConcept successfully tracked:
  - For Character '${traceCharacter}' (attempt 1, correct): Speed ${correctSpeed}ms, Accuracy True
  - For Character '${traceCharacter}' (attempt 2, incorrect): Speed ${incorrectSpeed}ms, Accuracy False
  This demonstrates that the concept can track speed and accuracy for each character, fulfilling its principle.`);
});
```
