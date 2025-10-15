**concept** LevelMap
**purpose** generate sentences tailored to a User's level
**principle** maps levels with sets of characters, creates a random sentence with Chinese characters suitable to User level

**state**  
a set of Levels with
  a set of Characters

**actions**
addCharacter (Character, Level)
  requires Character not already in Level
  effect associate Character to Level

removeCharacter (Character, Level)
  requires Character in Level
  effect remove Character from Level

generateSentence (Level, topic: String): (sentences: String[])  
    effect Get Characters in Level; Use LLM to generate a set of sentences on given topic using only characters in that Level. LLM takes a list of characters in Level and a topic. Generates valid sentences and Return sentences.
