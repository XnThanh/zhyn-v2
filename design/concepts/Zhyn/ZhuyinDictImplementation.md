[@concept-design-overview](../../background/concept-design-overview.md)

[@concept-specifications](../../background/concept-specifications.md)

[@implementing-concepts](../../background/implementing-concepts.md)

[@ZhuyinDictionary](ZhuyinDictionary.md)

# implement: ZhuyinDictionary
# response:

```typescript
// file: src/ZhuyinDictionary/ZhuyinDictionaryConcept.ts

import { Collection, Db } from "npm:mongodb";
import { ID, Empty } from "@utils/types.ts";
// freshID is not used for _id here because Character itself acts as the _id.
// import { freshID } from "@utils/database.ts"; 

/**
 * # concept: ZhuyinDictionary
 * 
 * **purpose** tracks the Zhuyin Representation of Characters.
 * 
 * **principle** (Clarified for this implementation, as the original seemed to describe sentence generation, not dictionary lookups)
 * If a character is registered with a specific Zhuyin representation, then querying that character will return its associated Zhuyin. 
 * If multiple characters are registered with the same Zhuyin, looking up that Zhuyin will return all associated characters.
 */

// Generic types for this concept: Character and ZhuyinRep are treated as opaque IDs.
type Character = ID;
type ZhuyinRep = ID;

/**
 * **state**
 * a set of Characters with
 *   a ZhuyinRep
 * 
 * Represents the mapping from a Character ID to its Zhuyin Representation ID.
 */
interface CharacterEntry {
  _id: Character; // The character itself acts as the unique identifier
  zhuyinRep: ZhuyinRep;
}

export default class ZhuyinDictionaryConcept {
  private readonly charactersCollection: Collection<CharacterEntry>;
  private readonly PREFIX = "ZhuyinDictionary" + ".";

  constructor(private readonly db: Db) {
    this.charactersCollection = this.db.collection(this.PREFIX + "characters");
  }

  /**
   * **action** register (character: Character, zhuyinRep: ZhuyinRep)
   * 
   * **requires** Character doesn't already exist
   * **effects** add Character and associate with that ZhuyinRep
   * 
   * @param {object} args - The arguments for the action.
   * @param {Character} args.character - The character to register.
   * @param {ZhuyinRep} args.zhuyinRep - The Zhuyin representation for the character.
   * @returns {Empty | {error: string}} An empty object on success, or an error object if the character already exists.
   */
  async register({ character, zhuyinRep }: { character: Character; zhuyinRep: ZhuyinRep }): Promise<Empty | { error: string }> {
    // Check if character already exists
    const existing = await this.charactersCollection.findOne({ _id: character });
    if (existing) {
      return { error: `Character '${character}' already registered.` };
    }

    // Insert the new character and its Zhuyin representation
    await this.charactersCollection.insertOne({ _id: character, zhuyinRep });
    return {};
  }

  /**
   * **action** unregister (character: Character)
   * 
   * **requires** Character already exist
   * **effects** remove Character and corresponding ZhuyinRep
   * 
   * @param {object} args - The arguments for the action.
   * @param {Character} args.character - The character to unregister.
   * @returns {Empty | {error: string}} An empty object on success, or an error object if the character does not exist.
   */
  async unregister({ character }: { character: Character }): Promise<Empty | { error: string }> {
    // Check if character exists
    const existing = await this.charactersCollection.findOne({ _id: character });
    if (!existing) {
      return { error: `Character '${character}' not found.` };
    }

    // Delete the character entry
    await this.charactersCollection.deleteOne({ _id: character });
    return {};
  }

  /**
   * **action** getAnswer (character: Character): (zhuyinRep: ZhuyinRep)
   * 
   * **effects** returns the ZhuyinRep associated with the Character
   * 
   * @param {object} args - The arguments for the action.
   * @param {Character} args.character - The character to look up.
   * @returns {{zhuyinRep: ZhuyinRep} | {error: string}} The Zhuyin representation on success, or an error object if not found.
   */
  async getAnswer({ character }: { character: Character }): Promise<{ zhuyinRep: ZhuyinRep } | { error: string }> {
    const entry = await this.charactersCollection.findOne({ _id: character });
    if (!entry) {
      return { error: `Zhuyin representation for character '${character}' not found.` };
    }
    return { zhuyinRep: entry.zhuyinRep };
  }

  /**
   * **action** lookupZhuyin (zhuyinRep: ZhuyinRep): (characters: Character[])
   * 
   * **effects** Returns a list of all Characters whose Zhuyin representation matches zhuyinRep. 
   * The pattern can be a full Zhuyin string, a partial prefix, or even support wildcards for more advanced search. 
   * This allows users to find all characters with a specific pronunciation.
   * 
   * @param {object} args - The arguments for the action.
   * @param {ZhuyinRep} args.zhuyinRep - The Zhuyin representation to search for (can be a prefix).
   * @returns {{characters: Character[]}} A list of matching characters.
   */
  async lookupZhuyin({ zhuyinRep }: { zhuyinRep: ZhuyinRep }): Promise<{ characters: Character[] }> {
    // For "partial prefix" and "wildcards", we use a regex query.
    // The given zhuyinRep is treated as a prefix.
    const query = { zhuyinRep: { $regex: `^${zhuyinRep}`, $options: "i" } }; // Case-insensitive prefix match

    const entries = await this.charactersCollection.find(query).toArray();
    const characters = entries.map(entry => entry._id);
    return { characters };
  }
}
```

# prompt: when a character is registered, the parameter is a string containing a chinese character. when it is unregistered, the parameter is also a string containing a chinese character. For the lookupZhuyin, the parameter is a single string containing the combination of several zhuyin symbols.
# response:

```typescript
// file: src/ZhuyinDictionary/ZhuyinDictionaryConcept.ts

import { Collection, Db } from "npm:mongodb";
import { ID, Empty } from "@utils/types.ts";
// freshID is not used for _id here because the Character itself acts as the _id.

/**
 * # concept: ZhuyinDictionary
 * 
 * **purpose** tracks the Zhuyin Representation of Characters.
 * 
 * **principle**
 * *Note: The original principle "each generate creates a random sentence with Chinese characters suitable to User level" appears to be
 * misaligned with the concept's purpose and actions. This implementation uses a more fitting principle for a dictionary concept.*
 * If a Chinese character is registered with a specific Zhuyin representation, then a subsequent query for that character will return its associated Zhuyin. 
 * Conversely, if multiple characters share the same Zhuyin representation, looking up that Zhuyin will correctly return all associated characters.
 */

// Generic types for this concept, specifically interpreting ID as the direct string content.
/**
 * Represents a Chinese character string. When used as an ID, it is the character itself.
 */
type Character = ID; 
/**
 * Represents a string combining several Zhuyin symbols. When used as an ID, it is the Zhuyin string itself.
 */
type ZhuyinRep = ID;

/**
 * **state**
 * a set of Characters with
 *   a ZhuyinRep
 * 
 * Represents the mapping from a Character (itself a string) to its Zhuyin Representation (also a string).
 */
interface CharacterEntry {
  _id: Character; // The Chinese character string acts as the unique identifier for the document.
  zhuyinRep: ZhuyinRep;
}

export default class ZhuyinDictionaryConcept {
  private readonly charactersCollection: Collection<CharacterEntry>;
  private readonly PREFIX = "ZhuyinDictionary" + ".";

  constructor(private readonly db: Db) {
    this.charactersCollection = this.db.collection(this.PREFIX + "characters");
  }

  /**
   * **action** register (character: Character, zhuyinRep: ZhuyinRep)
   * 
   * **requires** The `character` (Chinese character string) does not already exist in the dictionary.
   * **effects** Adds the `character` and associates it with the provided `zhuyinRep`.
   * 
   * @param {object} args - The arguments for the action.
   * @param {Character} args.character - The Chinese character string to register.
   * @param {ZhuyinRep} args.zhuyinRep - The Zhuyin representation string for the character.
   * @returns {Promise<Empty | {error: string}>} An empty object on success, or an error object if the character already exists.
   */
  async register({ character, zhuyinRep }: { character: Character; zhuyinRep: ZhuyinRep }): Promise<Empty | { error: string }> {
    // Check if the character string already exists as an _id.
    const existing = await this.charactersCollection.findOne({ _id: character });
    if (existing) {
      return { error: `Character '${character}' is already registered.` };
    }

    // Insert the new character and its Zhuyin representation.
    await this.charactersCollection.insertOne({ _id: character, zhuyinRep });
    return {};
  }

  /**
   * **action** unregister (character: Character)
   * 
   * **requires** The `character` (Chinese character string) must exist in the dictionary.
   * **effects** Removes the `character` and its corresponding `zhuyinRep` from the dictionary.
   * 
   * @param {object} args - The arguments for the action.
   * @param {Character} args.character - The Chinese character string to unregister.
   * @returns {Promise<Empty | {error: string}>} An empty object on success, or an error object if the character does not exist.
   */
  async unregister({ character }: { character: Character }): Promise<Empty | { error: string }> {
    // Check if the character string exists.
    const existing = await this.charactersCollection.findOne({ _id: character });
    if (!existing) {
      return { error: `Character '${character}' not found in the dictionary.` };
    }

    // Delete the character entry.
    await this.charactersCollection.deleteOne({ _id: character });
    return {};
  }

  /**
   * **action** getAnswer (character: Character): (zhuyinRep: ZhuyinRep)
   * 
   * **effects** Returns the `zhuyinRep` string associated with the given `character` string.
   * 
   * @param {object} args - The arguments for the action.
   * @param {Character} args.character - The Chinese character string to look up.
   * @returns {Promise<{ zhuyinRep: ZhuyinRep } | { error: string }>} The Zhuyin representation string on success, or an error object if not found.
   */
  async getAnswer({ character }: { character: Character }): Promise<{ zhuyinRep: ZhuyinRep } | { error: string }> {
    const entry = await this.charactersCollection.findOne({ _id: character });
    if (!entry) {
      return { error: `Zhuyin representation for character '${character}' not found.` };
    }
    return { zhuyinRep: entry.zhuyinRep };
  }

  /**
   * **action** lookupZhuyin (zhuyinRep: ZhuyinRep): (characters: Character[])
   * 
   * **effects** Returns a list of all `Character` strings whose Zhuyin representation matches the provided `zhuyinRep` string.
   * The `zhuyinRep` parameter can be a full Zhuyin string or a partial prefix.
   * (Advanced wildcard support within the `zhuyinRep` pattern, e.g., using `*` or `?`, would require specific syntax definition and regex escaping/transformation).
   * 
   * @param {object} args - The arguments for the action.
   * @param {ZhuyinRep} args.zhuyinRep - The Zhuyin representation string to search for (treated as a prefix for partial matches).
   * @returns {Promise<{ characters: Character[] }>} A list of matching Chinese character strings.
   */
  async lookupZhuyin({ zhuyinRep }: { zhuyinRep: ZhuyinRep }): Promise<{ characters: Character[] }> {
    // Uses a regex query for prefix matching on the zhuyinRep field.
    // The `$options: "i"` ensures case-insensitive matching, if Zhuyin symbols have case variants.
    const query = { zhuyinRep: { $regex: `^${zhuyinRep}`, $options: "i" } };

    const entries = await this.charactersCollection.find(query).toArray();
    const characters = entries.map(entry => entry._id);
    return { characters };
  }
}
```