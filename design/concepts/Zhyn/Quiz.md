**concept** Quiz [Character, ZhuyinRep]
**purpose** track User's Zhuyin typing ability
**principle** track the speed and accuracy for each Character that user typed

**state**
a set of Questions with
  an questionId String
  a character Character
  a target ZhuyinRep
  a response ZhuyinRep?
  a startTime DateTime?
  an endTime DateTime?
  a speed Number?
  a correct Boolean?

**actions**
register (Character, ZhuyinRep): (questionId: String)
  effect Generate a questionId. Create a new Question with questionId, associated character and target ZhuyinRep, other fields unset. Return questionId.

startQuestion (questionId: String)
  requires Question not already started (startTime is unset)
  effects update startTime of coresponding Question to current time

submitAnswer (questionId: String, response: ZhuyinRep)
  requires Question exists with endTime unset
  effects
  set endTime = current time
  set response = response
  set speed = endTime - startTime
  set correct = (response = target)

**queries**
getSpeed (questionId: String): (speed: Number)
  requires Question exists and endTime set
  effect return speed associated with Question

getAccuracy (questionId: String): (correct: Boolean)
  requires Question exists and endTime set
  effect return correct Boolean associated with Question