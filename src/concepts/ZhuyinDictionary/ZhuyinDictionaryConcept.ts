import { Collection, Db } from "npm:mongodb";
import { Character, Empty, ZhuyinRep } from "@utils/types.ts";
import { toTraditional } from "../../helpers/opencc-helper.ts";

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
   * @requires Character doesn't already exist with a different ZhuyinRep
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
    if (existing && existing.zhuyinRep !== zhuyinRep) {
      return {
        error:
          `Character '${character}' already registered with the following ZhuyinRep: ${existing.zhuyinRep}.`,
      };
    } else if (existing) {
      return {}; // Already registered with the same ZhuyinRep, no action needed
    }

    // Convert character to Traditional Chinese if needed
    var characterToAdd = character;
    if (character !== toTraditional(character)) {
      characterToAdd = toTraditional(character) as Character;
      console.log(
        `AUTO CONVERTED ${character} to Traditional Chinese: ${characterToAdd}`,
      );
    }

    // Insert the new character and its Zhuyin representation
    await this.charactersCollection.insertOne({
      _id: characterToAdd,
      zhuyinRep,
    });

    console.log(`REGISTERED ${characterToAdd} --> ${zhuyinRep}`);
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

    console.log(`UNREGISTERED ${character}`);
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
    console.log(`RETRIEVING ${character}...`);
    const entry = await this.charactersCollection.findOne({ _id: character });
    if (!entry) {
      return {
        error: `Zhuyin representation for character '${character}' not found.`,
      };
    }

    console.log(`RETRIEVED ${entry.zhuyinRep} for ${character}`);
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

    console.log(
      `LOOKUP ${zhuyinRep} FOUND [${characters}]`,
    );
    return { characters };
  }
}
