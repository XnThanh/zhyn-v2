---
timestamp: 'Wed Oct 15 2025 14:21:20 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251015_142120.c2a16de9.md]]'
content_id: 10d37b676489071e3540bc660102d76bc53ddaf09e6000575badb7c479f667af
---

# prompt: I made the following changes to my quiz concept specification:

register (Character, ZhuyinRep): (questionId: String)\
  requires Character and ZhuyinRep are a valid pair in ZhuyinDict\
  effect Generate a questionId. Create a new Question with questionId, associated character and target ZhuyinRep, other fields unset. Return questionId.

**sync** register\
*when*\
  Quiz.register (Character, providedZhuyinRep: ZhuyinRep)\
*where*\
  ZhuyinDictionary.getAnswer(Character): (registeredZhuyinRep: ZhuyinRep)\
*then*\
  if providedZhuyinRep === registeredZhuyinRep: Quiz.register(Character, registeredZhuyinRep: ZhuyinRep): (questionId: String)\
  else: error
