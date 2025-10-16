import { assert, assertEquals, assertNotEquals } from "jsr:@std/assert";
import { testDb } from "@utils/database.ts";
import QuizConcept from "./QuizConcept.ts";
import { IncorrectRecord } from "./QuizConcept.ts";
import { Character, ID, ZhuyinRep } from "@utils/types.ts";
import {
  assertAllNoError,
  assertNoError,
} from "@utils/errors/assertNoError.ts";

// Helper for introducing a small delay if needed for time-sensitive tests
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/*
Principle Test Case:
1. system makes new quiz with 1 second timer (for testing feasibility)
2. system register 3 questions
3. user correctly answers question 1
4. user incorrectly answers question 2
5. timer runs out before user finishes question 3, system gets speed and accuracy of quiz
*/
Deno.test("Principle: system makes quiz and registers questions, user responds, system collect statistics", async () => {
  const [db, client] = await testDb();
  const quizConcept = new QuizConcept(db);

  try {
    // Action 1: Make new quiz
    // console.log("Making new quiz of length 1 second");
    const quizId = await quizConcept.makeQuiz({ length: 1 });

    // Action 2: Add three questions
    const char1 = "你" as Character;
    const zhuyin1 = "ㄋㄧˇ" as ZhuyinRep;

    const char2 = "好" as Character;
    const zhuyin2 = "ㄏㄠˇ" as ZhuyinRep;

    const char3 = "呢" as Character;
    const zhuyin3 = "ㄋㄜ˙" as ZhuyinRep;

    // console.log("Registering 3 questions")
    const question1 = await quizConcept.registerQuestion({
      quizId: quizId,
      character: char1,
      targetZhuyinRep: zhuyin1,
    });
    assertNoError(question1);
    const questionId1 = question1 as ID;

    const question2 = await quizConcept.registerQuestion({
      quizId: quizId,
      character: char2,
      targetZhuyinRep: zhuyin2,
    });
    assertNoError(question2);
    const questionId2 = question2 as ID;

    const question3 = await quizConcept.registerQuestion({
      quizId: quizId,
      character: char3,
      targetZhuyinRep: zhuyin3,
    });
    assertNoError(question3);
    const questionId3 = question3 as ID;

    // Action 3: Respond question 1 (correct)
    // console.log("correctly answering question 1")
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
    // console.log("incorrectly answering question 2")
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
    const quizResults = await quizConcept.endQuiz({ quizId }); // manual endQuiz bc sync not yet implemented
    assertNoError(quizResults);
    const stats = quizResults as {
      avgSpeed: number;
      avgAccuracy: number;
      incorrectRecords: IncorrectRecord[];
    };

    // Check that avgSpeed is between 400 and 500
    assert(
      stats.avgSpeed >= 400 && stats.avgSpeed <= 500,
      `Expected average speed ${stats.avgSpeed} to be between 400 and 500, Actual: ${stats.avgSpeed}`,
    );

    // Check accuracy
    assertEquals(
      stats.avgAccuracy,
      0.5,
      `Expected average accuracy: 0.5, Actual: ${stats.avgAccuracy}`,
    );

    // Check incorrectRecords
    const expectedInccorect = [{
      character: char2,
      target: zhuyin2,
      response: wrongzhuyin2,
    }];
    assertEquals(
      stats.incorrectRecords,
      expectedInccorect,
      `Expected: ${expectedInccorect}, Actual: ${stats.incorrectRecords}`,
    );

    assertAllNoError([
      { value: start1 },
      { value: submit1 },
      { value: start2 },
      { value: submit2 },
      { value: start3 },
    ]);
  } finally {
    await client.close();
  }
});

// The same character can be used again in another question
// In many typing practice, the same word/character can appear multiple times
Deno.test("registerQuestion: duplicate question ok", async () => {
  const [db, client] = await testDb();
  const quizConcept = new QuizConcept(db);

  try {
    const quizId = await quizConcept.makeQuiz({ length: 1 });

    const char1 = "你" as Character;
    const zhuyin1 = "ㄋㄧˇ" as ZhuyinRep;

    const question1 = await quizConcept.registerQuestion({
      quizId: quizId,
      character: char1,
      targetZhuyinRep: zhuyin1,
    });
    assertNoError(question1);
    const questionId1 = question1 as ID;

    const question2 = await quizConcept.registerQuestion({
      quizId: quizId,
      character: char1,
      targetZhuyinRep: zhuyin1,
    });
    assertNoError(question2);
    const questionId2 = question2 as ID;

    assertNotEquals(
      questionId1,
      questionId2,
      "Each question should have a unique ID",
    );
  } finally {
    await client.close();
  }
});

Deno.test("startQuestion", async (t) => {
  const [db, client] = await testDb();
  const quizConcept = new QuizConcept(db);

  try {
    const quizId = await quizConcept.makeQuiz({ length: 1 });

    const char1 = "你" as Character;
    const zhuyin1 = "ㄋㄧˇ" as ZhuyinRep;

    const question1 = await quizConcept.registerQuestion({
      quizId: quizId,
      character: char1,
      targetZhuyinRep: zhuyin1,
    });
    assertNoError(question1);
    const questionId1 = question1 as ID;

    await t.step("cannot start question that already started", async () => {
      await quizConcept.startQuestion({
        quizId,
        questionId: questionId1,
      });

      const startAgain = await quizConcept.startQuestion({
        quizId,
        questionId: questionId1,
      });
      assertEquals(
        "error" in startAgain,
        true,
        "Starting a question that already started should fail.",
      );
    });

    await t.step("cannot start non-existent question", async () => {
      const start = await quizConcept.startQuestion({
        quizId,
        questionId: "invalid-id" as ID,
      });
      assertEquals(
        "error" in start,
        true,
        "Starting a question with invalid questionId should fail.",
      );
    });
  } finally {
    await client.close();
  }
});

Deno.test("submitAnswer", async (t) => {
  const [db, client] = await testDb();
  const quizConcept = new QuizConcept(db);

  try {
    const quizId = await quizConcept.makeQuiz({ length: 1 });

    const char1 = "你" as Character;
    const zhuyin1 = "ㄋㄧˇ" as ZhuyinRep;

    const question1 = await quizConcept.registerQuestion({
      quizId: quizId,
      character: char1,
      targetZhuyinRep: zhuyin1,
    });
    assertNoError(question1);

    await t.step("cannot submit with invalid questionId", async () => {
      const submit = await quizConcept.submitAnswer({
        quizId,
        questionId: "invalid-id" as ID,
        response: "some response" as ZhuyinRep,
      });
      assertEquals(
        "error" in submit,
        true,
        "Submitting answer with invalid questionId should fail.",
      );
    });

    await t.step(
      "cannot submit answer to a question that has not started",
      async () => {
        const submit = await quizConcept.submitAnswer({
          quizId,
          questionId: question1 as ID,
          response: "some response" as ZhuyinRep,
        });
        assertEquals(
          "error" in submit,
          true,
          "Submitting answer to question that has not started should fail.",
        );
      },
    );
  } finally {
    await client.close();
  }
});
