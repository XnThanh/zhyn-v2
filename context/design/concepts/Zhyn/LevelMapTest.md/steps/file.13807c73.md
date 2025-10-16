---
timestamp: 'Thu Oct 16 2025 07:04:20 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251016_070420.daca94f8.md]]'
content_id: 13807c73d7e6a235ecf364ba067462d7bd60d5cdc8f886f8afaffab559a06d53
---

# file: src\concepts\LevelMap\LevelMapConcept.test.ts

```typescript
import { assert, assertEquals } from "jsr:@std/assert";
import LevelMapConcept from "./LevelMapConcept.ts";
import { Config, GeminiLLM } from "../../../gemini-llm.ts";
import { LevelEmptyError } from "../../utils/errors/LevelEmptyError.ts";
import { LevelEnum } from "../../utils/LevelEnum.ts";
import * as vocab from "./testVocabSets.ts";
import { testDb } from "@utils/database.ts";
import { Character } from "@utils/types.ts";
import config from "../../../config.json" with { type: "json" };

// Helper to load config
function loadConfig(): Config {
  try {
    return { ...config } as Config;
  } catch (error) {
    console.error(
      "❌ Error loading config.json. Please ensure it exists with your API key.",
    );
    console.error("Error details:", (error as Error).message);
    Deno.exit(1);
  }
}

Deno.test("Principle: add/remove characters and generate sentence sequence", async () => {
  const [db, client] = await testDb();
  const levelMap = new LevelMapConcept(db);

  const config = loadConfig();
  const llm = new GeminiLLM(config, 6); // Max characters in intermediate level after steps

  try {
    // Step 1: add 2 characters to Intermediate level
    await levelMap.createLevel({ levelName: LevelEnum.Intermediate });
    const intermediateCharsStep1 = ["你", "好"] as Character[];
    for (const c of intermediateCharsStep1) {
      await levelMap.addCharacter({
        levelName: LevelEnum.Intermediate,
        character: c,
      });
    }

    // Step 2: add 3 characters to Newbie level
    await levelMap.createLevel({ levelName: LevelEnum.Newbie });
    const newbieChars = ["爸", "媽", "家"] as Character[];
    for (const c of newbieChars) {
      await levelMap.addCharacter({
        levelName: LevelEnum.Newbie,
        character: c,
      });
    }

    // Step 3: remove a character from Intermediate level
    await levelMap.removeCharacter({
      levelName: LevelEnum.Intermediate,
      character: "你" as Character,
    });

    // Step 4: add 5 more characters to Intermediate (total should be 6)
    const intermediateCharsStep4 = [
      "她",
      "他",
      "們",
      "愛",
      "我",
    ] as Character[];
    for (const c of intermediateCharsStep4) {
      await levelMap.addCharacter({
        levelName: LevelEnum.Intermediate,
        character: c,
      });
    }

    // verify Intermediate level has 6 characters
    const intermediateDoc = await db.collection(levelMap.collectionName)
      .findOne({
        _id: LevelEnum.Intermediate,
      });
    const intermediateCharacters = intermediateDoc?.characters || [];

    assertEquals(
      intermediateCharacters.length,
      6,
      "Intermediate level should have 6 characters",
    );

    // Step 5: generate a sentence with Intermediate level characters
    const sentences = await levelMap.generateSentences({
      levelName: LevelEnum.Intermediate,
      topic: "daily life",
      llm,
    });

    assert(
      sentences.length > 0,
      "Expected at least one sentence to be generated with Intermediate characters",
    );
  } finally {
    await client.close();
  }
});

Deno.test("LevelMap: generateSentence fails on empty level", async () => {
  const [db, client] = await testDb();
  const levelMap = new LevelMapConcept(db);

  const config = loadConfig();
  const llm = new GeminiLLM(config);

  try {
    await levelMap.createLevel({ levelName: LevelEnum.Newbie });
    let errorThrown = false;
    try {
      await levelMap.generateSentences({
        levelName: LevelEnum.Newbie,
        topic: "daily life",
        llm,
      });
    } catch (e) {
      assert(e instanceof LevelEmptyError, "Expected LevelEmptyError");
      errorThrown = true;
    }
    assert(
      errorThrown,
      "Expected generateSentence to throw an error for empty level",
    );
  } finally {
    await client.close();
  }
});

Deno.test("LevelMap: generateSentence works with one character", async () => {
  const [db, client] = await testDb();
  const levelMap = new LevelMapConcept(db);

  const config = loadConfig();
  const llm = new GeminiLLM(config, 1);

  try {
    await levelMap.createLevel({ levelName: LevelEnum.Newbie });
    const character = "爸" as Character;
    await levelMap.addCharacter({ levelName: LevelEnum.Newbie, character });

    const sentences = await levelMap.generateSentences({
      levelName: LevelEnum.Newbie,
      topic: "family",
      llm,
    });

    assert(
      sentences.length > 0,
      "Expected at least one sentence to be generated",
    );
  } finally {
    await client.close();
  }
});

Deno.test("LevelMap: generateSentence works with multiple characters", async () => {
  const [db, client] = await testDb();
  const levelMap = new LevelMapConcept(db);

  const config = loadConfig();
  const characters = ["爸", "媽", "家", "愛", "我"] as Character[];
  const llm = new GeminiLLM(config, characters.length);

  try {
    await levelMap.createLevel({ levelName: LevelEnum.Newbie });

    for (const character of characters) {
      await levelMap.addCharacter({ levelName: LevelEnum.Newbie, character });
    }

    const sentences = await levelMap.generateSentences({
      levelName: LevelEnum.Newbie,
      topic: "family",
      llm,
    });

    assert(
      sentences.length > 0,
      "Expected sentences to be generated with multiple characters",
    );
  } finally {
    await client.close();
  }
});

Deno.test("LevelMap: generateSentence works with many characters", async () => {
  const [db, client] = await testDb();
  const levelMap = new LevelMapConcept(db);

  const config = loadConfig();
  const llm = new GeminiLLM(config, vocab.beginnerSet.length);

  try {
    await levelMap.createLevel({ levelName: LevelEnum.Beginner });

    for (const c of vocab.beginnerSet) {
      await levelMap.addCharacter({
        levelName: LevelEnum.Beginner,
        character: c.char as Character,
      });
    }

    const sentences = await levelMap.generateSentences({
      levelName: LevelEnum.Beginner,
      topic: "restaurant",
      llm,
    });

    assert(
      sentences.length > 0,
      "Expected sentences to be generated with many characters",
    );
  } finally {
    await client.close();
  }
});

```
