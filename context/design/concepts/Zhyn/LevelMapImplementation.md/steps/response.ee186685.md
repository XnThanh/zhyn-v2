---
timestamp: 'Thu Oct 16 2025 04:37:47 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251016_043747.172ae9fc.md]]'
content_id: ee1866852932c46ac5eba94c64a9758cbbcc83236ab67fedfd3dd90fba726902
---

# response:

The `LevelMapConcept.ts` implementation provided in the previous turn already perfectly aligns with the new (simplified) concept specification you've given. The `addCharacter` and `removeCharacter` actions are correctly implemented, including their preconditions and effects, and they appropriately handle `Character` and `Level` as polymorphic `ID` types.

The previously present `createLevel` and `generateSentence` actions (and their associated LLM/OpenCC logic) were intentionally excluded from the prior response to match the more concise specification provided at that time, which is consistent with the latest spec.

The queries `_getCharactersForLevel` and `_getAllLevels` are also consistent with the concept design philosophy, as they are "significant and non-trivial observations of the state" that directly support the concept's stated purpose, even if not explicitly listed in the 'actions' section of the spec.

Therefore, no functional changes are required. The update below focuses on refining the inline documentation to clearly reflect the latest concept specification and its underlying principles.

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
// The 'freshID' utility is not explicitly used by the LevelMap concept itself,
// as Character and Level are external IDs managed by other concepts or the system,
// meaning this concept does not generate them internally.

// Declare collection prefix, as per concept design guidelines.
const PREFIX = "LevelMap" + ".";

/**
 * Type parameter for an external Character identifier.
 * As per concept design, this `LevelMap` concept treats `Character` polymorphically,
 * only caring about its identity (represented as an `ID` string).
 * It does not assume any internal structure or specific properties of a Character object,
 * relying on other concepts to manage character-specific details.
 */
type Character = ID;

/**
 * Type parameter for an external Level identifier.
 * Similarly, this `LevelMap` concept treats `Level` polymorphically,
 * primarily concerned with its identity (`ID`).
 * Details about a Level (e.g., its name or other metadata) would be managed
 * by a separate 'Level' or 'LevelProfile' concept if needed.
 */
type Level = ID;

/**
 * Represents the internal state structure for a single Level within the LevelMap concept.
 * Each document in the 'levels' collection corresponds to an instance of a `Level` (identified by `_id`),
 * holding the set of `Characters` associated with that level.
 *
 * Corresponds to the concept's state declaration:
 * `a set of Levels with a set of Characters`
 */
interface LevelDoc {
  _id: Level; // The unique identifier for a learning level (e.g., "HSK1", "Beginner").
  characters: Character[]; // An array of Character IDs associated with this level.
}

/**
 * The `LevelMap` concept's purpose is to "generate sentences tailored to a User's level".
 * It achieves this by maintaining a mapping between abstract `Levels` and sets of `Characters`.
 *
 * Principle: "maps levels with sets of characters, creates a random sentence with Chinese
 * characters suitable to User level". This concept provides the core mapping mechanism,
 * enabling other components (e.g., an LLM integration) to use these character sets
 * to fulfill the ultimate purpose.
 */
export default class LevelMapConcept {
  private levels: Collection<LevelDoc>;

  /**
   * Constructs a new `LevelMapConcept` instance.
   *
   * @param db The MongoDB database instance to use for persistence.
   */
  constructor(private readonly db: Db) {
    // Initialize the MongoDB collection for storing level-character associations.
    // The collection name is prefixed with the concept name to ensure uniqueness.
    this.levels = this.db.collection(PREFIX + "levels");
  }

  /**
   * **Action: addCharacter**
   *
   * Associates a given `character` (by its ID) with a specified `level` (by its ID).
   * This action facilitates building the character sets for each learning level.
   * If the target `level` does not yet exist within this concept's state,
   * it will be implicitly created as an empty level when the first character is added to it.
   *
   * @param args - The input arguments for the action.
   * @param args.character - The `ID` of the character to be added.
   * @param args.level - The `ID` of the level to which the character should be associated.
   *
   * @requires `Character` not already in `Level`: The specified `character` must not currently be
   *           part of the set of characters associated with the given `level`.
   * @effects The `character` is added to the set of characters for the specified `level`.
   *          If the `level` document did not exist prior to this action, a new `level` entry
   *          is created in the state, containing the newly added character.
   * @returns An `Empty` object on successful execution, or an object `{ error: string }` if the
   *          precondition is violated (e.g., the character is already associated with the level).
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
      return {}; // Successful creation of level and association of character.
    }

    // Precondition check: Character not already in Level.
    if (levelDoc.characters.includes(character)) {
      return {
        error: `Character '${character}' is already associated with Level '${level}'.`,
      };
    }

    // Effect: Add the character to the existing level's character set.
    // `$addToSet` is used for atomicity and to prevent duplicates, though the explicit
    // precondition check already guards against adding existing characters.
    await this.levels.updateOne(
      { _id: level },
      { $addToSet: { characters: character } },
    );

    return {}; // Successful association.
  }

  /**
   * **Action: removeCharacter**
   *
   * Disassociates a `character` (by its ID) from a specified `level` (by its ID).
   * This action allows for the refinement and modification of character sets within levels.
   *
   * @param args - The input arguments for the action.
   * @param args.character - The `ID` of the character to be removed.
   * @param args.level - The `ID` of the level from which the character should be removed.
   *
   * @requires `Character` in `Level`: The specified `character` must currently be associated
   *           with the given `level`. Additionally, the `level` itself must exist in the state.
   * @effects The `character` is removed from the set of characters for the specified `level`.
   * @returns An `Empty` object on successful execution, or an object `{ error: string }` if the
   *          precondition is violated (e.g., the level does not exist, or the character is not found in the level).
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
    // `$pull` removes all instances of the specified value from an array.
    await this.levels.updateOne(
      { _id: level },
      { $pull: { characters: character } },
    );

    // Note: The concept specification does not explicitly require deleting the level document
    // if its 'characters' array becomes empty after removal. Thus, an empty level document
    // (representing a level with no associated characters) is a valid and persistent state.

    return {}; // Successful disassociation.
  }

  // --- Concept Queries ---
  // Per concept design guidelines, queries often do not need explicit specification
  // but can be defined for "particularly significant and non-trivial observations of the state."
  // These queries directly support the LevelMap's purpose by enabling external components
  // to retrieve the character sets needed for level-tailored content generation.

  /**
   * **Query: _getCharactersForLevel**
   *
   * Retrieves all characters currently associated with a specific learning level.
   * This is a fundamental query for any functionality that needs to operate on
   * the character set of a given level (e.g., an LLM prompt generator).
   *
   * @param args - The input arguments for the query.
   * @param args.level - The `ID` of the level for which to retrieve characters.
   *
   * @effects Returns an object `{ characters: Character[] }` containing an array
   *          of `ID`s for the characters associated with the specified `level`.
   *          Returns an object `{ error: string }` if the `level` does not exist in the concept's state.
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
   * **Query: _getAllLevels**
   *
   * Retrieves a list of all defined learning levels present within the concept's state.
   * This query is useful for displaying available levels to users, administrative interfaces,
   * or for iterating over all levels for bulk operations.
   *
   * @effects Returns an object `{ levels: Level[] }` containing an array of `ID`s
   *          for all levels that have been defined (i.e., exist as documents in the concept's state).
   */
  async _getAllLevels(): Promise<{ levels: Level[] }> {
    // Project only the _id field to retrieve only level identifiers efficiently.
    const levelDocs = await this.levels.find({}, { projection: { _id: 1 } }).toArray();
    return { levels: levelDocs.map((doc) => doc._id) };
  }
}
```
