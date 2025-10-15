**concept** Quiz  

**purpose** track User's Zhuyin typing ability

**principle** track the speed and accuracy for each Character that user typed

**state**  
a set of Questions with  
  &emsp; an questionId String  
  &emsp; a character Character  
  &emsp; a target ZhuyinRep  
  &emsp; a response ZhuyinRep?  
  &emsp; a startTime DateTime?  
  &emsp; an endTime DateTime?  
  &emsp; a speed Number?  
  &emsp; a correct Boolean?  

**actions**  
register (Character, ZhuyinRep): (questionId: String)  
  &emsp; effect Generate a questionId. Create a new Question with questionId, associated character and target ZhuyinRep, other fields unset. Return questionId.

startQuestion (questionId: String)  
  &emsp; requires Question not already started (startTime is unset)  
  &emsp; effects update startTime of coresponding Question to current time  

submitAnswer (questionId: String, response: ZhuyinRep)  
  &emsp; requires Question exists with endTime unset  
  &emsp; effects  
  &emsp; set endTime = current time  
  &emsp; set response = response  
  &emsp; set speed = endTime - startTime  
  &emsp; set correct = (response = target)  

**queries**  
getSpeed (questionId: String): (speed: Number)  
  &emsp; requires Question exists and endTime set  
  &emsp; effect return speed associated with Question  

getAccuracy (questionId: String): (correct: Boolean)  
  &emsp; requires Question exists and endTime set  
  &emsp; effect return correct Boolean associated with Question  