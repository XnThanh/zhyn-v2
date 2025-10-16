deno test --allow-read --allow-sys --allow-net --allow-env .\src\concepts\Quiz\QuizConcept.test.ts
Check file:///C:/Users/Thanh/dev/6.1040/zhyn-v2/src/concepts/Quiz/QuizConcept.test.ts
running 4 tests from ./src/concepts/Quiz/QuizConcept.test.ts
Principle: system makes quiz and registers questions, user responds, system collect statistics ...  
------- output -------  
CREATED new quiz with ID: 0199ee85-9d83-7775-8308-538e6d1a1146, length: 1 seconds  
你 REGISTERED as question 0199ee85-9dbb-7c1b-91d7-f4b58a9b7a75 in quiz 0199ee85-9d83-7775-8308-538e6d1a1146  
好 REGISTERED as question 0199ee85-9e06-7133-bd15-d6c6ada66fec in quiz 0199ee85-9d83-7775-8308-538e6d1a1146  
呢 REGISTERED as question 0199ee85-9e42-793a-bbf8-93787275674e in quiz 0199ee85-9d83-7775-8308-538e6d1a1146  
STARTED question 0199ee85-9dbb-7c1b-91d7-f4b58a9b7a75 in quiz 0199ee85-9d83-7775-8308-538e6d1a1146  
SUBMITTED CORRECT ㄋㄧˇ for question 0199ee85-9dbb-7c1b-91d7-f4b58a9b7a75 in quiz 0199ee85-9d83-7775-8308-538e6d1a1146  
STARTED question 0199ee85-9e06-7133-bd15-d6c6ada66fec in quiz 0199ee85-9d83-7775-8308-538e6d1a1146  
SUBMITTED INCORRECT ㄏㄠ for question 0199ee85-9e06-7133-bd15-d6c6ada66fec in quiz 0199ee85-9d83-7775-8308-538e6d1a1146  
STARTED question 0199ee85-9e42-793a-bbf8-93787275674e in quiz 0199ee85-9d83-7775-8308-538e6d1a1146  
Time is up! ENDING quiz 0199ee85-9d83-7775-8308-538e6d1a1146 and calculating results.  
Quiz 0199ee85-9d83-7775-8308-538e6d1a1146 results: {  
  "avgSpeed": 460,  
  "avgAccuracy": 0.5,  
  "incorrectRecords": [  
    {  
      "character": "好",  
      "target": "ㄏㄠˇ",  
      "response": "ㄏㄠ"  
    }  
  ]  
}  
----- output end -----  
Principle: system makes quiz and registers questions, user responds, system collect statistics ... ok (2s)  
registerQuestion: duplicate question ok ...  
------- output -------  
CREATED new quiz with ID: 0199ee85-a69f-7c1c-be3d-c76a8323b73b, length: 1 seconds  
你 REGISTERED as question 0199ee85-a6cf-75bc-8d45-c3feff00991f in quiz 0199ee85-a69f-7c1c-be3d-c76a8323b73b  
你 REGISTERED as question 0199ee85-a713-77ea-ba42-088ff3b298ca in quiz 0199ee85-a69f-7c1c-be3d-c76a8323b73b  
----- output end -----  
registerQuestion: duplicate question ok ... ok (679ms)  
startQuestion ...  
------- output -------  
CREATED new quiz with ID: 0199ee85-a926-7810-bcc2-501eb9987ec5, length: 1 seconds  
你 REGISTERED as question 0199ee85-a96b-7887-b8dc-3a85a887de67 in quiz 0199ee85-a926-7810-bcc2-501eb9987ec5  
----- output end -----  
  cannot start question that already started ...  
------- output -------  
STARTED question 0199ee85-a96b-7887-b8dc-3a85a887de67 in quiz 0199ee85-a926-7810-bcc2-501eb9987ec5  
----- output end -----  
  cannot start question that already started ... ok (94ms)  
  cannot start non-existent question ... ok (16ms)  
startQuestion ... ok (743ms)  
submitAnswer ...  
------- output -------  
CREATED new quiz with ID: 0199ee85-ac1e-7412-bbbc-88a7903714ce, length: 1 seconds   
你 REGISTERED as question 0199ee85-ac4d-70d6-8a87-ca567a1e9d31 in quiz 0199ee85-ac1e-7412-bbbc-88a7903714ce  
----- output end -----  
  cannot submit with invalid questionId ... ok (17ms)  
  cannot submit answer to a question that has not started ... ok (16ms)  
submitAnswer ... ok (640ms)  
  
ok | 4 passed (4 steps) | 0 failed (4s)  