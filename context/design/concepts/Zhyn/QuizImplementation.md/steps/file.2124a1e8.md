---
timestamp: 'Wed Oct 15 2025 14:21:20 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251015_142120.c2a16de9.md]]'
content_id: 2124a1e8e284a45a2d121ceea9781ad8fab781e62baea52e9bbe30aec6b8d74a
---

# file: src\concepts\ZhuyinDictionary\ZhuyinDictionaryConcept.ts

```typescript
import { Collection, Db } from "npm:mongodb";
import { Character, Empty, ZhuyinRep } from "@utils/types.ts";

// Internal entity type representing a character entry in the dictionary
interface CharacterEntry {
  _id: Character; // The character itself acts as the unique identifier
  zhuyinRep: ZhuyinRep;
}

/**
 * @concept ZhuyinDictionary
 * @purpose Track Characters and their Zhuyin Representation
 */
export default class ZhuyinDictionaryConcept {
  private readonly charactersCollection: Collection<CharacterEntry>;
  private readonly PREFIX = "ZhuyinDictionary" + ".";

  constructor(private readonly db: Db) {
    this.charactersCollection = this.db.collection(this.PREFIX + "characters");
  }

  /**
   * **action** register (character: Character, zhuyinRep: ZhuyinRep)
   *
   * @requires Character doesn't already exist
   * @effects add Character and associate with that ZhuyinRep
   */
  async register(
    { character, zhuyinRep }: {
      character: Character;
      zhuyinRep: ZhuyinRep;
    },
  ): Promise<Empty | { error: string }> {
    // Check if character already exists
    const existing = await this.charactersCollection.findOne({
      _id: character,
    });
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
   * @requires Character already exist
   * @effects remove Character and corresponding ZhuyinRep
   */
  async unregister(
    { character }: {
      character: Character;
    },
  ): Promise<Empty | { error: string }> {
    // Check if character exists
    const existing = await this.charactersCollection.findOne({
      _id: character,
    });
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
   * @requires Character exists
   * @effects returns the ZhuyinRep associated with the Character
   */
  async getAnswer(
    { character }: {
      character: Character;
    },
  ): Promise<{ zhuyinRep: ZhuyinRep } | { error: string }> {
    const entry = await this.charactersCollection.findOne({ _id: character });
    if (!entry) {
      return {
        error: `Zhuyin representation for character '${character}' not found.`,
      };
    }
    return { zhuyinRep: entry.zhuyinRep };
  }

  /**
   * **action** lookupZhuyin (zhuyinRep: ZhuyinRep): (characters: Character[])
   *
   * @effects Returns a list of all Characters whose Zhuyin representation matches zhuyinRep.
   * The pattern can be a full Zhuyin string, a partial prefix, or even support wildcards for more advanced search.
   * This allows users to find all characters with a specific pronunciation.
   */
  async lookupZhuyin(
    { zhuyinRep }: { zhuyinRep: ZhuyinRep },
  ): Promise<{ characters: Character[] }> {
    // For "partial prefix" and "wildcards", we use a regex query.
    // The given zhuyinRep is treated as a prefix.
    const query = { zhuyinRep: { $regex: `^${zhuyinRep}`, $options: "i" } }; // Case-insensitive prefix match

    const entries = await this.charactersCollection.find(query).toArray();
    const characters = entries.map((entry) => entry._id);
    return { characters };
  }
}

```
