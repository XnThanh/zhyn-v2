import { Collection, Db } from "npm:mongodb";
import { Character, Empty, ID } from "@utils/types.ts";
import { GeminiLLM } from "../../../gemini-llm.ts";
import { LLMRetryableError } from "../../utils/errors/LLMRetryableError.ts";
// import { LevelEnum } from "@utils/LevelEnum.ts";
import { LevelNotFoundError } from "../../utils/errors/LevelNotFoundError.ts";
import { LevelEmptyError } from "../../utils/errors/LevelEmptyError.ts";
import { toTraditional } from "../../helpers/opencc-helper.ts";

const PREFIX = "LevelMap" + ".";
type LevelName = ID;

interface Level {
  _id: LevelName; // The unique identifier for a learning level ("Newbie", "Beginner", "Intermediate", "Advanced").
  characters: Character[];
}

/**
 * The LevelMap concept manages the association of specific characters
 * with different learning levels, enabling the generation of level-appropriate
 * content.
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

  get collectionName() {
    return this.levels.collectionName;
  }

  /**
   * createLevel (levelName: String)
   *
   * requires: levelName not already existing Level
   * effects: create new Level with levelName and empty set of Characters
   * @param params - An object containing the levelName.
   * @returns An empty object on success, or an error object if the level already exists.
   */
  async createLevel(
    { levelName }: { levelName: LevelName },
  ): Promise<Empty | { error: string }> {
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
      return {
        error: `Character '${character}' is already in level '${levelName}'.`,
      };
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
      return {
        error: `Character '${character}' is not in level '${levelName}'.`,
      };
    }

    await this.levels.updateOne(
      { _id: levelName },
      { $pull: { characters: character } },
    );

    return {};
  }

  /**
   * Generate a series of sentences on a given topic suitable for a given level.
   * @param levelName - The name of the level
   * @param topic - The topic for the generated sentence
   * @param llm - The connected LLM (e.g., Gemini)
   * @returns A list of sentences
   */
  async generateSentences({
    levelName,
    topic,
    llm,
  }: {
    levelName: LevelName;
    topic: string;
    llm: GeminiLLM;
  }): Promise<string[]> {
    const level = await this.levels.findOne({ _id: levelName });
    if (!level) {
      throw new LevelNotFoundError(`❌ Level "${levelName}" not found.`);
    }

    if (!level.characters || level.characters.length === 0) {
      throw new LevelEmptyError(`❌ Level "${levelName}" has no characters.`);
    }

    const numSentences = 15;
    const passRate = 0.3;
    const defaultRetries = 4;

    return await this.llmGenerate(
      topic,
      level,
      llm,
      defaultRetries,
      numSentences,
      passRate,
    );
  }

  /**
   * Helper to execute LLM request and parse response with retry logic.
   * @param prompt - LLM prompt string
   * @param llm - GeminiLLM instance
   * @param maxAttempts - total retry attempts
   */
  private async llmGenerate(
    topic: string,
    level: Level,
    llm: GeminiLLM,
    maxAttempts: number,
    numSentences: number,
    passRate: number,
  ): Promise<string[]> {
    const collected: string[] = [];

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const prompt = this.createPrompt(topic, level, numSentences, collected);
      // console.log(prompt);

      try {
        console.log(
          `🤖 Requesting sentence generation from Gemini AI (Attempt ${attempt})...`,
        );
        const response = await llm.executeLLM(prompt);

        console.log("✅ Received response from Gemini AI!");
        console.log("\n🤖 RAW GEMINI RESPONSE");
        console.log("======================");
        console.log(response);
        console.log("======================\n");

        const validSentences = this.parseGeneratedSentences(response, level);
        console.log(validSentences);
        // collect valid sentences from each retry
        for (const s of validSentences) {
          if (!collected.includes(s)) {
            collected.push(s);
          }
        }

        // early return if we've collected enough
        if (collected.length >= numSentences) {
          console.log(
            `Generated ${collected.length} sentences (requested ${numSentences}). Took ${attempt} attempts`,
          );
          return collected;
        }

        if (attempt === maxAttempts) {
          if (collected.length >= numSentences * passRate) {
            return collected;
          } else {
            throw new Error("Could not generate enough valid sentences.");
          }
        }
      } catch (error) {
        if (error instanceof LLMRetryableError) {
          console.warn(
            `⚠️ Retryable error while parsing LLM response: ${error.message}`,
          );
          if (attempt < maxAttempts) {
            console.log("🔄 Retrying LLM request...");
            continue;
          } else {
            if (collected.length >= numSentences * passRate) {
              console.log(
                `⚠️ Max attempts reached, returning ${collected.length} collected sentences.`,
              );
              return collected;
            } else {
              throw new Error(
                `❌ Failed to generate enough sentences after ${maxAttempts} attempts. Only ${collected.length} valid sentences collected.`,
              );
            }
          }
        } else {
          // Non-retryable errors propagate immediately
          console.error("❌ Unexpected error:", (error as Error).message);
          throw error;
        }
      }
    }

    throw new Error("❌ Unexpected Error.");
  }

  /**
   * Create the prompt for Gemini with hardwired preferences
   */
  private createPrompt(
    topic: string,
    level: Level,
    numSentences: number,
    prevSentences: string[],
  ): string {
    const state = prevSentences.length > 0
      ? `These are valid sentences already generated using strictly characters from the permitted list:
${prevSentences.join("")}`
      : "";

    return `I have a list of permitted Traditional Chinese characters. Your task is to generate ${numSentences} unique, grammatically correct, and meaningful sentences using **only** characters from this list. You may repeat characters in a single sentence. Do not include whitespace.

**ABSOLUTELY NO CHARACTER OUTSIDE OF THIS LIST IS ALLOWED.**

**The Permitted Character List:**
${level.characters.join(",")}

${state}

Generate ${numSentences} new ${level._id}-level sentences related to the topic: "${topic}" using only the permitted characters.

Return your response as a JSON object with this exact structure:
{
  "sentences": [
    {
      "sentence": "valid sentence with punctuation on given topic using only the allowed characters"
    }
  ]
}

Return ONLY the JSON object, no additional text.`;
  }

  /**
   * Parse and validate the LLM response
   * @param responseText - Raw text response from LLM
   * @param level - Level to validate against
   * @returns Array of valid sentences
   * @throws LLMRetryableError or other errors on failure
   */
  private parseGeneratedSentences(
    responseText: string,
    level: Level,
  ): string[] {
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new LLMRetryableError("No JSON found in response");
      }

      const response = JSON.parse(jsonMatch[0]);

      if (!response.sentences || !Array.isArray(response.sentences)) {
        throw new LLMRetryableError("Invalid response format");
      }

      // Map and convert each sentence to Traditional Chinese, in case LLM used Simplified (possible hallucination)
      const sentences: string[] = response.sentences
        .map((s: any) => s.sentence)
        .filter((s: any) => typeof s === "string")
        .map((s: string) => toTraditional(s));

      // Validate sentences, remove invalid ones
      const validSentences = this.validateSentences(sentences, level);

      return validSentences;
    } catch (error) {
      if (error instanceof LLMRetryableError) {
        throw error; // propagate retryable errors
      } else {
        console.error(
          "❌ Error parsing LLM response:",
          (error as Error).message,
        );
        console.log("Response was:", responseText);
        throw error;
      }
    }
  }

  /**
   * Validate sentences against level character set.
   * Removes any sentence containing characters outside the allowed set.
   * @param sentences - array of sentences to validate
   * @param level - Level to validate against
   * @returns array of validated sentences
   */
  private validateSentences(sentences: string[], level: Level): string[] {
    const allowedChars = new Set(level.characters.map((c) => c as string));

    return sentences.filter((sentence) => {
      // remove punctuation
      const stripped = sentence.replace(/[。！？，、,.!?]/g, "");
      const isValid = [...stripped].every((char) => allowedChars.has(char));
      if (!isValid) {
        console.warn(
          `⚠️ "${sentence}" contains characters not in level "${level._id}" and was removed.`,
        );
      }
      return isValid;
    });
  }
}
