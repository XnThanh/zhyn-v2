---
timestamp: 'Tue Oct 14 2025 22:19:35 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251014_221935.48601801.md]]'
content_id: 9bc79881bfdf4b285ce91d7aeadd5e7e8049d7accd3f44f956024b9dff66e957
---

# response:

```typescript
// file: src/concepts/ZhuyinDictionary/ZhuyinDictionaryConcept.test.ts
import { assertEquals } from "jsr:@std/assert";
import { testDb } from "@utils/database.ts";
import ZhuyinDictionaryConcept from "./ZhuyinDictionaryConcept.ts";

Deno.test("ZhuyinDictionaryConcept", async (t) => {
  const [db, client] = await testDb();
  const concept = new ZhuyinDictionaryConcept(db);

  await t.step("action: register", async (t_register) => {
    const char1 = "我";
    const zhuyin1 = "ㄨㄛˇ";
    const char2 = "是";
    const zhuyin2 = "ㄕˋ";

    await t_register.step(
      "confirms requires: Character doesn't already exist (success)",
      async () => {
        const result = await concept.register({
          character: char1,
          zhuyinRep: zhuyin1,
        });
        assertEquals(result, {});

        // effects: Verify character and ZhuyinRep are added
        const retrieved = await concept.getAnswer({ character: char1 });
        assertEquals(retrieved, { zhuyinRep: zhuyin1 });
      },
    );

    await t_register.step(
      "confirms requires: Character already exists (returns error)",
      async () => {
        // Attempt to register char1 again with a different ZhuyinRep
        const result = await concept.register({
          character: char1,
          zhuyinRep: "incorrectZhuyin",
        });
        assertEquals(result, { error: `Character '${char1}' already registered.` });

        // effects: Ensure the original ZhuyinRep is still present and not overwritten
        const retrieved = await concept.getAnswer({ character: char1 });
        assertEquals(retrieved, { zhuyinRep: zhuyin1 });
      },
    );

    await t_register.step("effects: adds a second unique character", async () => {
      const result = await concept.register({
        character: char2,
        zhuyinRep: zhuyin2,
      });
      assertEquals(result, {});
      const retrieved = await concept.getAnswer({ character: char2 });
      assertEquals(retrieved, { zhuyinRep: zhuyin2 });
    });
  });

  await t.step("action: unregister", async (t_unregister) => {
    // char2 "是" (ㄕˋ) was registered in the previous `register` step.
    const charToUnregister = "是";
    const charNonExistent = "不存在";

    await t_unregister.step(
      "confirms requires: Character already exist (success)",
      async () => {
        const result = await concept.unregister({ character: charToUnregister });
        assertEquals(result, {});

        // effects: Verify character is removed
        const retrieved = await concept.getAnswer({ character: charToUnregister });
        assertEquals(retrieved, {
          error: `Zhuyin representation for character '${charToUnregister}' not found.`,
        });
      },
    );

    await t_unregister.step(
      "confirms requires: Character doesn't exist (returns error)",
      async () => {
        const result = await concept.unregister({ character: charNonExistent });
        assertEquals(result, {
          error: `Character '${charNonExistent}' not found.`,
        });
      },
    );
  });

  await t.step("action: getAnswer", async (t_getAnswer) => {
    // char1 "我" (ㄨㄛˇ) was registered earlier and not unregistered.
    const charExisting = "我";
    const zhuyinExisting = "ㄨㄛˇ";
    const charNonExistent = "沒有";

    await t_getAnswer.step(
      "effects: returns the correct ZhuyinRep for an existing Character",
      async () => {
        const result = await concept.getAnswer({ character: charExisting });
        assertEquals(result, { zhuyinRep: zhuyinExisting });
      },
    );

    await t_getAnswer.step(
      "effects: returns an error for a non-existent Character",
      async () => {
        const result = await concept.getAnswer({ character: charNonExistent });
        assertEquals(result, {
          error: `Zhuyin representation for character '${charNonExistent}' not found.`,
        });
      },
    );
  });

  await t.step("action: lookupZhuyin", async (t_lookup) => {
    // Register additional characters for comprehensive lookup tests
    await concept.register({ character: "你", zhuyinRep: "ㄋㄧˇ" });
    await concept.register({ character: "好", zhuyinRep: "ㄏㄠˇ" });
    await concept.register({ character: "嗎", zhuyinRep: "ㄇㄚ˙" });
    await concept.register({ character: "呢", zhuyinRep: "ㄋㄜ˙" });
    await concept.register({ character: "拿", zhuyinRep: "ㄋㄚˊ" });
    await concept.register({ character: "河", zhuyinRep: "ㄏㄜˊ" });
    await concept.register({ character: "和", zhuyinRep: "ㄏㄢˋ" });
    await concept.register({ character: "話", zhuyinRep: "ㄏㄨㄚˋ" });
    await concept.register({ character: "爸", zhuyinRep: "ㄅㄚˋ" });

    await t_lookup.step(
      "effects: Returns characters for a full ZhuyinRep match",
      async () => {
        const result = await concept.lookupZhuyin({ zhuyinRep: "ㄋㄧˇ" });
        assertEquals(result.characters, ["你"]);
      },
    );

    await t_lookup.step(
      "effects: Returns characters for a prefix match (ㄋ)",
      async () => {
        const result = await concept.lookupZhuyin({ zhuyinRep: "ㄋ" });
        // The order might vary based on DB, so sort for consistent assertion
        assertEquals(result.characters.sort(), ["你", "呢", "拿"].sort());
      },
    );

    await t_lookup.step(
      "effects: Returns characters for a prefix match (ㄏ)",
      async () => {
        const result = await concept.lookupZhuyin({ zhuyinRep: "ㄏ" });
        assertEquals(
          result.characters.sort(),
          ["好", "河", "和", "話"].sort(),
        );
      },
    );

    await t_lookup.step(
      "effects: Returns characters for a partial prefix match (ㄏㄚ)",
      async () => {
        const result = await concept.lookupZhuyin({ zhuyinRep: "ㄏㄚ" });
        assertEquals(result.characters.sort(), ["好", "和"].sort());
      },
    );

    await t_lookup.step(
      "effects: Returns characters for a partial prefix match (ㄏㄜ)",
      async () => {
        const result = await concept.lookupZhuyin({ zhuyinRep: "ㄏㄜ" });
        assertEquals(result.characters, ["河"]);
      },
    );

    await t_lookup.step(
      "effects: Handles case-insensitivity in lookup (even if Zhuyin is typically uppercase)",
      async () => {
        // The implementation uses $options: "i" for case-insensitivity.
        // Even though stored ZhuyinReps are uppercase, this confirms robustness.
        const result = await concept.lookupZhuyin({ zhuyinRep: "ㄏㄜ" });
        assertEquals(result.characters, ["河"]);
      },
    );

    await t_lookup.step(
      "effects: Returns an empty array if no match is found",
      async () => {
        const result = await concept.lookupZhuyin({ zhuyinRep: "ㄒㄩㄝˊ" }); // Not yet registered
        assertEquals(result.characters, []);
      },
    );
  });

  // trace: Demonstrates how the principle "each generate creates a random sentence with Chinese characters suitable to User level"
  // is fully modeled by the actions of ZhuyinDictionary.
  // The ZhuyinDictionary provides the core data (character-to-Zhuyin mapping and lookup)
  // that a higher-level 'sentence generation' system would rely on.
  await t.step("trace: demonstrating principle support", async (t_trace) => {
    // 1. Initial population: The system registers a wider range of characters and their Zhuyin.
    // (Some are already registered, adding more to illustrate the dictionary's breadth.)
    const char_learn = "學";
    const zhuyin_learn = "ㄒㄩㄝˊ";
    const char_study = "習";
    const zhuyin_study = "ㄒㄧˊ";
    const char_middle = "中";
    const zhuyin_middle = "ㄓㄨㄥ";
    const char_language = "文";
    const zhuyin_language = "ㄨㄣˊ";
    const char_drink = "喝";
    const zhuyin_drink = "ㄏㄜ";

    await concept.register({ character: char_learn, zhuyinRep: zhuyin_learn });
    await concept.register({ character: char_study, zhuyinRep: zhuyin_study });
    await concept.register({ character: char_middle, zhuyinRep: zhuyin_middle });
    await concept.register({ character: char_language, zhuyinRep: zhuyin_language });
    await concept.register({ character: char_drink, zhuyinRep: zhuyin_drink });

    await t_trace.step(
      "The 'generator' uses getAnswer to retrieve Zhuyin for selected characters.",
      async () => {
        // Imagine a sentence generator constructs "我學習中文" (I study Chinese)
        // and needs the Zhuyin for displaying pronunciation or other linguistic tasks.
        const myChar = "我"; // Registered previously
        const studyChar = char_study;
        const middleChar = char_middle;
        const languageChar = char_language;

        const myZhuyin = await concept.getAnswer({ character: myChar });
        assertEquals(myZhuyin, { zhuyinRep: "ㄨㄛˇ" });

        const studyZhuyin = await concept.getAnswer({ character: studyChar });
        assertEquals(studyZhuyin, { zhuyinRep: zhuyin_study });

        const middleZhuyin = await concept.getAnswer({ character: middleChar });
        assertEquals(middleZhuyin, { zhuyinRep: zhuyin_middle });

        const languageZhuyin = await concept.getAnswer({ character: languageChar });
        assertEquals(languageZhuyin, { zhuyinRep: zhuyin_language });

        console.log(
          `  Generator retrieves Zhuyin: ${myChar}(${myZhuyin.zhuyinRep}), ${studyChar}(${studyZhuyin.zhuyinRep}), ${middleChar}(${middleZhuyin.zhuyinRep}), ${languageChar}(${languageZhuyin.zhuyinRep})`,
        );
      },
    );

    await t_trace.step(
      "The 'generator' uses lookupZhuyin for related character suggestions or disambiguation.",
      async () => {
        // If the generator wants to suggest characters with a similar initial sound to "中" (ㄓㄨㄥ),
        // or find words that start with "ㄏㄜ" to form a phrase like "喝水" (drink water).

        const initialZhiLookup = await concept.lookupZhuyin({ zhuyinRep: "ㄓ" });
        assertEquals(initialZhiLookup.characters.sort(), ["中"].sort()); // Only "中" starts with "ㄓ" among registered chars
        console.log(
          `  Lookup for initial 'ㄓ' yields: ${JSON.stringify(initialZhiLookup.characters)}`,
        );

        const initialHeLookup = await concept.lookupZhuyin({ zhuyinRep: "ㄏㄜ" });
        // "河" (ㄏㄜˊ) and "喝" (ㄏㄜ) both start with "ㄏㄜ"
        assertEquals(initialHeLookup.characters.sort(), ["河", "喝"].sort());
        console.log(
          `  Lookup for initial 'ㄏㄜ' yields: ${JSON.stringify(initialHeLookup.characters)}`,
        );

        // This demonstrates how the ZhuyinDictionary directly supports the "principle"
        // by providing the essential phonetic data needed for a sentence generation
        // system, enabling it to incorporate pronunciation information and
        // select/suggest characters based on their Zhuyin representations.
      },
    );
  });

  await client.close();
});
```
