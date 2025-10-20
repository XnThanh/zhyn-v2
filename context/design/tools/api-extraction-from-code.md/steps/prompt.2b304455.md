---
timestamp: 'Mon Oct 20 2025 01:10:53 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251020_011053.f6c54b3e.md]]'
content_id: 2b304455fc7975c519cdb476adcd9e92689e13a177c6736f86727b772455d908
---

# prompt:

Please extract an API for this app from the following two concepts:

## ZhuyinDictionary

Specification:

**concept** ZhuyinDictionary

**purpose** tracks the Zhuyin Representation of Characters

**principle** registers Chinese Characters and their ZhuyinRep, performs lookup of both Character and Zhuyin

**state**\
a set of CharacterEntries with\
  a Character (unique identifier)\
  a ZhuyinRep

**actions**\
register (Character, ZhuyinRep)\
  requires Character doesn't already exist in CharacterEntries\
  effect create new CharacterEntry with given Character and ZhuyinRep

unregister (Character)\
  requires Character already exist in CharacterEntries\
  effect remove CharacterEntry associated with Character

getAnswer (Character): (ZhuyinRep)\
  requires Character already exist in CharacterEntries\
  effects returns the ZhuyinRep associated with the Character

lookupZhuyin (ZhuyinRep): (characters: Character\[])\
  effects Returns a list of all Characters whose Zhuyin representation matches ZhuyinRep. The pattern can be a full Zhuyin string or a partial prefix.

Code:
