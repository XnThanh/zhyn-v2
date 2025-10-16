**concept** ZhuyinDictionary

**purpose** tracks the Zhuyin Representation of Characters

**principle** registers Chinese Characters and their ZhuyinRep, performs lookup of both Character and Zhuyin

**state**  
a set of CharacterEntries with  
  &emsp; a Character (unique identifier)  
  &emsp; a ZhuyinRep

**actions**  
register (Character, ZhuyinRep)  
  &emsp; requires Character doesn't already exist in CharacterEntries  
  &emsp; effect create new CharacterEntry with given Character and ZhuyinRep  

unregister (Character)  
  &emsp; requires Character already exist in CharacterEntries  
  &emsp; effect remove CharacterEntry associated with Character  

getAnswer (Character): (ZhuyinRep)  
  &emsp; requires Character already exist in CharacterEntries  
  &emsp; effects returns the ZhuyinRep associated with the Character  

lookupZhuyin (ZhuyinRep): (characters: Character[])  
  &emsp; effects Returns a list of all Characters whose Zhuyin representation matches ZhuyinRep. The pattern can be a full Zhuyin string or a partial prefix.