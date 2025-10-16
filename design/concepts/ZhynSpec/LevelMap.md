**concept** LevelMap  
**purpose** generate sentences tailored to a User's level  
**principle** maps levels with sets of characters, creates a random sentence with Chinese characters suitable to User level  

**state**    
a set of Levels with  
  &emsp; a levelName String  
  &emsp; a set of Characters  

**actions**  
createLevel (levelName: String)  
  &emsp; requires levelName not already existing Level  
  &emsp; create new Level with levelName and empty set of Characters  

addCharacter (levelName: String, Character)  
  &emsp; requires Character not already in Level  
  &emsp; effect associate Character to Level  

removeCharacter (levelName: String, Character)  
  &emsp; requires Character in Level  
  &emsp; effect remove Character from Level  

generateSentence (levelName: String, topic: String): (sentences: String[])  
  &emsp; effect Get Characters in Level; Use LLM to generate a set of sentences on given topic using only characters in that Level. LLM takes a list of characters in Level and a topic. Generates valid sentences and Return sentences.
