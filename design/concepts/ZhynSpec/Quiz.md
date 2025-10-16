**concept** Quiz [Character, ZhuyinRep]

**purpose** To enable users to practice and improve their Zhuyin typing skills by providing immediate and aggregated feedback on their speed and accuracy for individual characters.

**principle** If a user starts a quiz, answers multiple questions, and when the timer runs out they will receive a summary of their performance, including overall average speed and accuracy, and a list of specific characters they struggled with, allowing them to focus their practice.

**state**  
a set of QuizEntries with  
  &emsp; a quizId String  
  &emsp; a length Number (seconds)  
  &emsp; a questionList set of Questions  
  &emsp; a incorrectList set of IncorrectRecords  
  &emsp; an activeQuestionId String  
  &emsp; a questionCount Number  
  &emsp; a completedCount Number  
  &emsp; an avgSpeed Number  
  &emsp; an avgAccuracy Number  
  &emsp; an expiryTime DateTime?  
  
a set of Questions with  
  &emsp; an questionId String  
  &emsp; a character Character  
  &emsp; a target ZhuyinRep  
  &emsp; a response ZhuyinRep?  
  &emsp; a startTime DateTime?  
  &emsp; an endTime DateTime?  
  &emsp; a speed Number?  
  &emsp; a correct Boolean?  

a set of IncorrectRecords with  
  &emsp; a character Character  
  &emsp; a target ZhuyinRep  
  &emsp; a response ZhuyinRep

**actions**  
makeQuiz (length: Number): quizId: String  
  &emsp; effects create a new QuizEntry with new quizId, length=length, empty questionList, empty incorrectList, activeQuestionId = "", questionCount=0, completedCount=0, avgSpeed=0, avdAccuracy=0. expiryTime unset. Return quizId.

endQuiz (quizId: String): {[avgSpeed: Number, avgAccuracy: Number, incorrectRecords[]]}  
  &emsp; requires expiryTime < current time  
  &emsp; effects set activeQuestionId to "time's up", return [avgSpeed, avgAccuracy, incorrectList] corresponding to quizId

registerQuestion (quizId: String, Character, ZhuyinRep): (questionId: String)  
  &emsp; requires quizId exists, Character and ZhuyinRep are a valid pair in ZhuyinDict  
  &emsp; effects  
  &emsp; Get QuizEntry with quizId.  
  &emsp; Generate a questionId.  
  &emsp; Create new Question with questionId, Character, and target ZhuyinRep, other fields unset.  
  &emsp; Set QuizEntry questionCount += 1.  
  &emsp; Add questionId to QuizEntry questionList.  
  &emsp; Return questionId.

startQuestion (quizId: String, questionId: String)  
  &emsp; requires questionId in QuizEntry questionList, QuizEntry activeQuestionId is empty string  
  &emsp; effects  
  &emsp; get QuizEntry corresponding to quizId  
  &emsp; if expiryTime unset: set expiryTime = current time + length (in essence, begin quiz when user attempts first question)  
  &emsp; update startTime of coresponding Question to current time  
  &emsp; set QuizEntry activeQuestionId = questionId  

submitAnswer (quizId, questionId: String, response: ZhuyinRep)  
  &emsp; requires QuizEntry activeQuestionId === questionId  
  &emsp; effects  
  &emsp; set Question endTime = current time  
  &emsp; set Question response = response  
  &emsp; set Question speed = endTime - startTime (in milliseconds)  
  &emsp; set Question correct = (response = target)  
  &emsp; set QuizEntry activeQuestionId = "" (empty string)  
  &emsp; set QuizEntry completedCount += 1  
  &emsp; if correct == False: create new IncorrectRecord and add to Quiz incorrectList  
  &emsp; set QuizEntry avgSpeed = *new avg speed calculated by [incremental average formula](#incremental-average-formula)*  
  &emsp; set QuizEntry avgAccuracy = *new avg accuracy calculated by [incremental average formula](#incremental-average-formula)*


**sync** registerQuestion  
*when*  
  &emsp; Quiz.registerQuestion (Character, providedZhuyinRep: ZhuyinRep)  
*where*  
  &emsp; ZhuyinDictionary.getAnswer(Character): (registeredZhuyinRep: ZhuyinRep)  
*then*  
  &emsp; if providedZhuyinRep === registeredZhuyinRep: Quiz.registerQuestion(Character, registeredZhuyinRep: ZhuyinRep): (questionId: String)  
  &emsp; else: error  

**sync** endQuiz  
*when*  
  &emsp; system.currentTime == QuizEntry.expiryTime  
*then*  
  &emsp; Quiz.endQuiz()   


  **NOTES**

  #### Incremental average formula: 
  ( Old Average * Old Count + New Value ) / New Count