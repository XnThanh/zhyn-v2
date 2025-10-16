---
timestamp: 'Thu Oct 16 2025 04:19:20 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251016_041920.8fd1245a.md]]'
content_id: 6aad8420bf66b246401897d695bf0439d09d2cf59a8aa0cfd4404f8451d82aae
---

# response:

```typescript
// # concept: LevelMap
// purpose generate sentences tailored to a User's level
// principle maps levels with sets of characters, creates a random sentence with Chinese characters suitable to User level

// state
// a set of Levels with
//   a set of Characters

// actions
// addCharacter (Character, Level)
//   requires Character not already in Level
//   effect associate Character to Level

// removeCharacter (Character, Level)
//   requires Character in Level
//   effect remove Character from Level

// # file: src/LevelMap/LevelMapConcept.ts

import { Collection, Db } from "npm:mongodb";
import { Empty, ID } from "@utils/types.ts";
// No freshID import needed, as Character and Level are external IDs for this concept.

// Declare collection prefix, use concept name
const PREFIX = "LevelMap" + ".";

/**
 * Type for an external Character identifier.
 * This concept treats Characters polymorphically, only caring about their identity.
 */
type Character = ID;

/**
 * Type for an external Level identifier.
 * This concept treats Levels polymorphically, only caring about their identity.
 */
type Level = ID;

/**
 * Represents the state structure for a Level within the LevelMap concept.
 *
 * Corresponds to:
 * a set of Levels with
 *   a set of Characters
 */
interface LevelDoc {
  _id: Level; // The unique identifier for a learning level (e.g., "HSK1", "Beginner").
  characters: Character[]; // An array of character IDs associated with this level.
}

/**
 * The LevelMap concept manages the association of specific characters
 * with different learning levels, enabling the generation of level-appropriate
 * content.
 */
export default class LevelMapConcept {
  private levels: Collection<LevelDoc>;

  /**
   * Constructs a new LevelMapConcept instance.
   *
   * @param db The MongoDB database instance to use for persistence.
   */
  constructor(private readonly db: Db) {
    // Initialize the MongoDB collection for storing level-character associations.
    this.levels = this.db.collection(PREFIX + "levels");
  }

  /**
   * addCharacter (character: Character, level: Level): Empty | { error: String }
   *
   * Associates a given character with a specified learning level.
   * If the level does not exist, it will be created.
   *
   * @param args - The input arguments for the action.
   * @param args.character - The `ID` of the character to be added.
   * @param args.level - The `ID` of the level to which the character should be associated.
   *
   * @requires The `character` must not already be associated with the `level`.
   * @effects The `character` is added to the set of characters for the specified `level`.
   *          If the `level` did not exist, a new `level` entry is created.
   */
  async addCharacter(
    { character, level }: { character: Character; level: Level },
  ): Promise<Empty | { error: string }> {
    // Attempt to find the existing level document.
    let levelDoc = await this.levels.findOne({ _id: level });

    if (!levelDoc) {
      // If the level does not exist, create a new document for it with the character.
      levelDoc = { _id: level, characters: [character] };
      await this.levels.insertOne(levelDoc);
      return {}; // Successful creation and association.
    }

    // Precondition check: Character not already in Level.
    if (levelDoc.characters.includes(character)) {
      return {
        error: `Character '${character}' is already associated with Level '${level}'.`,
      };
    }

    // Effect: Add the character to the existing level's character set.
    // $addToSet ensures that the character is only added if it's not already present,
    // though our explicit check above already handles this.
    await this.levels.updateOne(
      { _id: level },
      { $addToSet: { characters: character } },
    );

    return {}; // Successful association.
  }

  /**
   * removeCharacter (character: Character, level: Level): Empty | { error: String }
   *
   * Disassociates a character from a specified learning level.
   *
   * @param args - The input arguments for the action.
   * @param args.character - The `ID` of the character to be removed.
   * @param args.level - The `ID` of the level from which the character should be removed.
   *
   * @requires The `character` must currently be associated with the `level`.
   * @effects The `character` is removed from the set of characters for the specified `level`.
   */
  async removeCharacter(
    { character, level }: { character: Character; level: Level },
  ): Promise<Empty | { error: string }> {
    // Attempt to find the existing level document.
    const levelDoc = await this.levels.findOne({ _id: level });

    // Check if the level exists.
    if (!levelDoc) {
      return { error: `Level '${level}' does not exist.` };
    }

    // Precondition check: Character in Level.
    if (!levelDoc.characters.includes(character)) {
      return {
        error: `Character '${character}' is not associated with Level '${level}'.`,
      };
    }

    // Effect: Remove the character from the level's character set.
    await this.levels.updateOne(
      { _id: level },
      { $pull: { characters: character } },
    );

    // Optional: Could consider deleting the level document if its 'characters' array becomes empty.
    // The current specification does not explicitly require this, so the empty level document persists.

    return {}; // Successful disassociation.
  }

  // --- Queries (supporting the purpose and principle) ---
  // The principle mentions "creates a random sentence with Chinese characters suitable to User level".
  // A core part of enabling that is being able to query for the characters associated with a given level.

  /**
   * _getCharactersForLevel (level: Level): { characters: Character[] } | { error: String }
   *
   * Retrieves all characters associated with a specific learning level.
   *
   * @param args - The input arguments for the query.
   * @param args.level - The `ID` of the level for which to retrieve characters.
   *
   * @effects Returns an array of character IDs associated with the given `level`.
   *          Returns an error if the `level` does not exist.
   */
  async _getCharactersForLevel(
    { level }: { level: Level },
  ): Promise<{ characters: Character[] } | { error: string }> {
    const levelDoc = await this.levels.findOne({ _id: level });

    if (!levelDoc) {
      return { error: `Level '${level}' does not exist.` };
    }

    return { characters: levelDoc.characters };
  }

  /**
   * _getAllLevels (): { levels: Level[] }
   *
   * Retrieves a list of all defined learning levels within the concept.
   *
   * @effects Returns an array of `ID`s for all levels that have been defined.
   */
  async _getAllLevels(): Promise<{ levels: Level[] }> {
    const levelDocs = await this.levels.find({}, { projection: { _id: 1 } }).toArray();
    return { levels: levelDocs.map((doc) => doc._id) };
  }
}
```
