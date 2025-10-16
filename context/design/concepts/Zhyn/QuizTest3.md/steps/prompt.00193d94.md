---
timestamp: 'Thu Oct 16 2025 01:54:14 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251016_015414.b9debf52.md]]'
content_id: 00193d94a7f0adf4e96b05b7f449be0f4aa597c066b0980d338986ab1a150000
---

# prompt: Using the following as an example, create the remaining testcases outlined in quiz-testcases:

/\*
Principle Test Case:

1. system makes new quiz with 1 second timer (for testing feasibility)
2. system register 3 questions
3. user correctly answers question 1
4. user incorrectly answers question 2
5. timer runs out before user finishes question 3, system gets speed and accuracy of quiz
   \*/
   Deno.test("Principle: system makes quiz and registers questions, user responds, system collect statistics", async (t) => {
   const \[db, client] = await testDb();
   const quizConcept = new QuizConcept(db);

try {
// Action 1: Make new quiz
const quizId = await quizConcept.makeQuiz({ length: 3 });

```
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
```

} finally {
await client.close();
}
});
