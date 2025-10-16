## Changes made

- LOTS of changes made to this spec
- Added to state so that there was a way to calculate speed and accuracy for each question the user answered. 
- Added a set of QuizEntries to allow tracking of avg speed and accuracy over multiple questions in one quiz session.
- Added incorrect records so that errors the user made is stored and recorded, so that the feedback can be given to user after they complete the typing practice.
- Added a sync to automatically end quiz when timer runs out.
- Added quiz-specific actions, like makeQuiz and endQuiz (and decided that endQuiz is automatically called by the system via a sync)
- Made starting quiz an effect of starting the first question to reduce state management of quiz start and end by overloading the expiryTime and activeQuestionId

## Issues

- Same issue as ZhuyinDict with LLM-generated test cases needing lots of refeactoring