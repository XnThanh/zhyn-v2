---
timestamp: 'Thu Oct 16 2025 04:37:02 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251016_043702.f766eaa0.md]]'
content_id: a2f80a88136bddbf6508c187d28038193dface5f3acba67d91973e1ded7d1cca
---

# prompt: implement the following concept specs:

concept LevelMap
purpose generate sentences tailored to a User's level
principle maps levels with sets of characters, creates a random sentence with Chinese characters suitable to User level

state
a set of Levels with
  a set of Characters

actions
addCharacter (Character, Level)
  requires Character not already in Level
  effect associate Character to Level

removeCharacter (Character, Level)
  requires Character in Level
  effect remove Character from Level
