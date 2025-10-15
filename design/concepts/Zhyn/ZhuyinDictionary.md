**concept** ZhuyinDictionary
**purpose** tracks the Zhuyin Representation of Characters
**principle** registers Chinese Characters and their ZhuyinRep, performs lookup of both Character and Zhuyin

**state**
a set of Characters with
  a ZhuyinRep

**actions**
register (Character, ZhuyinRep)
  requires Character doesn't already exist
  effect add Character and associate with that ZhuyinRep

unregister (Character, ZhuyinRep)
  requires Character already exist
  effect remove Character and corresponding ZhuyinRep

getAnswer (Character): (ZhuyinRep)
  effects returns the ZhuyinRep associated with the Character

lookupZhuyin (ZhuyinRep): (characters: Character[])
effects Returns a list of all Characters whose Zhuyin representation matches ZhuyinRep. The pattern can be a full Zhuyin string, a partial prefix, or even support wildcards for more advanced search. This allows users to find all characters with a specific pronunciation.