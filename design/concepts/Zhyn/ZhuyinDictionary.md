**concept** ZhuyinDictionary

**purpose** tracks the Zhuyin Representation of Characters

**principle** registers Chinese Characters and their ZhuyinRep, performs lookup of both Character and Zhuyin

**state**  
a set of Characters with  
  &emsp; a ZhuyinRep

**actions**  
register (Character, ZhuyinRep)  
  &emsp; requires Character doesn't already exist  
  &emsp; effect add Character and associate with that ZhuyinRep  

unregister (Character, ZhuyinRep)  
  &emsp; requires Character already exist  
  &emsp; effect remove Character and corresponding ZhuyinRep  

getAnswer (Character): (ZhuyinRep)  
  &emsp; requires Character already exist  
  &emsp; effects returns the ZhuyinRep associated with the Character  

lookupZhuyin (ZhuyinRep): (characters: Character[])  
  &emsp; effects Returns a list of all Characters whose Zhuyin representation matches ZhuyinRep. The pattern can be a full Zhuyin string or a partial prefix.