---
timestamp: 'Thu Oct 16 2025 04:41:14 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251016_044114.6b146aae.md]]'
content_id: bbc6c02747471e9d282dfbe4507973b71c9851449016029dee2754664e8113f6
---

# response:

```typescript
import { Collection, Db } from "npm:mongodb";
import { Character, Empty, ID } from "@utils/types.ts";

const PREFIX = "LevelMap" + ".";
type LevelName = ID;

/**
 * Represents a learning level with associated characters.
 * @property _id - The unique identifier for a learning level (e.g., "Newbie", "Beginner").
 * @property characters - An array of character IDs associated with this level.
 */
interface Level {
  _id: LevelName;
  characters: Character[];
}

// This enum provides predefined level names, useful for consistency.
enum LevelEnum {
  Newbie = "newbie",
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
}

/**
 * The LevelMap concept manages the association of specific characters
 * with different learning levels, enabling the generation of level-appropriate
 * content.
 *
 * purpose: stores character in a level
 * principle: maps levels with sets of characters
 */
export default class LevelMapConcept {
  private levels: Collection<Level>;

  /**
   * Constructs a new LevelMapConcept instance.
   * @param db - The MongoDB database instance.
   */
  constructor(private readonly db: Db) {
    // Initialize the MongoDB collection for storing level-character associations.
    this.levels = this.db.collection(PREFIX + "levels");
  }

  /**
   * createLevel (levelName: String)
   *
   * requires: levelName not already existing Level
   * effects: create new Level with levelName and empty set of Characters
   * @param params - An object containing the levelName.
   * @returns An empty object on success, or an error object if the level already exists.
   */
  async createLevel({ levelName }: { levelName: LevelName }): Promise<Empty | { error: string }> {
    const existingLevel = await this.levels.findOne({ _id: levelName });
    if (existingLevel) {
      return { error: `Level '${levelName}' already exists.` };
    }

    await this.levels.insertOne({
      _id: levelName,
      characters: [],
    });

    return {};
  }

  /**
   * addCharacter (levelName: String, Character)
   *
   * requires: Character not already in Level
   * effect: associate Character to Level
   * @param params - An object containing the levelName and the character ID.
   * @returns An empty object on success, or an error object if the level is not found or the character is already in the level.
   */
  async addCharacter({
    levelName,
    character,
  }: {
    levelName: LevelName;
    character: Character;
  }): Promise<Empty | { error: string }> {
    const level = await this.levels.findOne({ _id: levelName });
    if (!level) {
      return { error: `Level '${levelName}' not found.` };
    }

    if (level.characters.includes(character)) {
      return { error: `Character '${character}' is already in level '${levelName}'.` };
    }

    await this.levels.updateOne(
      { _id: levelName },
      { $addToSet: { characters: character } }, // $addToSet is robust against race conditions
    );

    return {};
  }

  /**
   * removeCharacter (levelName: String, Character)
   *
   * requires: Character in Level
   * effect: remove Character from Level
   * @param params - An object containing the levelName and the character ID.
   * @returns An empty object on success, or an error object if the level is not found or the character is not in the level.
   */
  async removeCharacter({
    levelName,
    character,
  }: {
    levelName: LevelName;
    character: Character;
  }): Promise<Empty | { error: string }> {
    const level = await this.levels.findOne({ _id: levelName });
    if (!level) {
      return { error: `Level '${levelName}' not found.` };
    }

    if (!level.characters.includes(character)) {
      return { error: `Character '${character}' is not in level '${levelName}'.` };
    }

    await this.levels.updateOne(
      { _id: levelName },
      { $pull: { characters: character } },
    );

    return {};
  }

  /**
   * _getCharactersForLevel (levelName: String)
   *
   * effects: Returns the list of characters associated with a given level.
   * @param params - An object containing the levelName.
   * @returns An object containing the characters array, or an error object if the level is not found.
   */
  async _getCharactersForLevel(
    { levelName }: { levelName: LevelName },
  ): Promise<{ characters: Character[] } | { error: string }> {
    const level = await this.levels.findOne({ _id: levelName });
    if (!level) {
      return { error: `Level '${levelName}' not found.` };
    }
    return { characters: level.characters };
  }

  /**
   * _doesLevelExist (levelName: String)
   *
   * effects: Returns true if the level exists, false otherwise.
   * @param params - An object containing the levelName.
   * @returns An object containing a boolean `exists`.
   */
  async _doesLevelExist({ levelName }: { levelName: LevelName }): Promise<{ exists: boolean }> {
    const level = await this.levels.findOne({ _id: levelName });
    return { exists: !!level };
  }

  /**
   * _isCharacterInLevel (levelName: String, character: Character)
   *
   * effects: Returns true if the character is in the level, false otherwise.
   * @param params - An object containing the levelName and the character ID.
   * @returns An object containing a boolean `inLevel`, or an error object if the level is not found.
   */
  async _isCharacterInLevel(
    { levelName, character }: { levelName: LevelName; character: Character },
  ): Promise<{ inLevel: boolean } | { error: string }> {
    const level = await this.levels.findOne({ _id: levelName });
    if (!level) {
      return { error: `Level '${levelName}' not found.` };
    }
    return { inLevel: level.characters.includes(character) };
  }
}
```
