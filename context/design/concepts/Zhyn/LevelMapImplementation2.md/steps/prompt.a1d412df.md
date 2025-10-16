---
timestamp: 'Thu Oct 16 2025 04:40:52 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251016_044052.be964758.md]]'
content_id: a1d412dff2b2b64b6c7681350bf0a7fa47d4870f2f60c5fb9364633741f79ec4
---

# prompt: implement LevelMap, given the following:

**concept** LevelMap\
**purpose** stores character in a level
**principle** maps levels with sets of characters

**state**\
a set of Levels with\
  a levelName String\
  a set of Characters

**actions**\
createLevel (levelName: String)\
  requires levelName not already existing Level\
  create new Level with levelName and empty set of Characters

addCharacter (levelName: String, Character)\
  requires Character not already in Level\
  effect associate Character to Level

removeCharacter (levelName: String, Character)\
  requires Character in Level\
  effect remove Character from Level

import { Collection, Db } from "npm:mongodb";
import { Character, Empty, ID, ZhuyinRep } from "@utils/types.ts";

const PREFIX = "LevelMap" + ".";
type LevelName = ID;

interface Level {
\_id: LevelName; // The unique identifier for a learning level ("Newbie", "Beginner", "Intermediate", "Advanced").
characters: Character\[]; // An array of character IDs associated with this level.
}

enum LevelEnum {
Newbie = "newbie",
Beginner = "beginner",
Intermediate = "intermediate",
Advanced = "advanced",
}

/\*\*

* The LevelMap concept manages the association of specific characters
* with different learning levels, enabling the generation of level-appropriate
* content.
  \*/
  export default class LevelMapConcept {
  private levels: Collection<Level>;

// Constructs a new LevelMapConcept instance.
constructor(private readonly db: Db) {
// Initialize the MongoDB collection for storing level-character associations.
this.levels = this.db.collection(PREFIX + "levels");
}
