---
timestamp: 'Thu Oct 16 2025 04:18:45 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251016_041845.34d59026.md]]'
content_id: 9704ad45a56ed746d0fecefd945bf9e9126dcfcff4acea9dabbef63d937421c6
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
