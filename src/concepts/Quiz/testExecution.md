deno test .\src\concepts\Quiz\QuizConcept.test.ts --allow-read --allow-sys --allow-net --allow-env     
Check file:///C:/Users/Thanh/dev/6.1040/zhyn-v2/src/concepts/Quiz/QuizConcept.test.ts
running 4 tests from ./src/concepts/Quiz/QuizConcept.test.ts
Principle: system makes quiz and registers questions, user responds, system collect statistics ... ok (2s)
registerQuestion: duplicate question ok ... ok (662ms)
startQuestion ...
  cannot start question that already started ... ok (101ms)
  cannot start non-existent question ... ok (20ms)
startQuestion ... ok (741ms)
submitAnswer ...
  cannot submit with invalid questionId ... ok (17ms)
  cannot submit answer to a question that has not started ... ok (16ms)
submitAnswer ... ok (607ms)

ok | 4 passed (4 steps) | 0 failed (4s)