import { assertEquals } from "jsr:@std/assert";
import { testDb } from "@utils/database.ts";
import { Character, ZhuyinRep } from "@utils/types.ts";
import ZhuyinDictionaryConcept from "./ZhuyinDictionaryConcept.ts";

Deno.test("Principle: Register several characters, lookup a character, lookup a wrong Zhuyin, lookup a partial zhuyin", async () => {
  const [db, client] = await testDb();
  const dictConcept = new ZhuyinDictionaryConcept(db);

  try {
    const char1 = "我" as Character;
    const zhuyin1 = "ㄨㄛˇ" as ZhuyinRep;
    const char2 = "是" as Character;
    const zhuyin2 = "ㄕˋ" as ZhuyinRep;
    const char3 = "文" as Character;
    const zhuyin3 = "ㄨㄣˊ" as ZhuyinRep;

    const register1 = await dictConcept.register({
      character: char1,
      zhuyinRep: zhuyin1,
    });
    assertEquals(register1, {}); // succesfully added

    const register2 = await dictConcept.register({
      character: char2,
      zhuyinRep: zhuyin2,
    });
    assertEquals(register2, {}); // succesfully added

    const register3 = await dictConcept.register({
      character: char3,
      zhuyinRep: zhuyin3,
    });
    assertEquals(register3, {}); // succesfully added

    const lookupchar1 = await dictConcept.getAnswer({
      character: char1,
    });
    assertEquals(lookupchar1, { zhuyinRep: zhuyin1 });

    const lookupZhuyin1 = await dictConcept.lookupZhuyin({
      zhuyinRep: "ㄨㄛˊ" as ZhuyinRep,
    });
    assertEquals(lookupZhuyin1.characters, []);

    const lookupZhuyin2 = await dictConcept.lookupZhuyin({
      zhuyinRep: "ㄨㄛ" as ZhuyinRep,
    });
    assertEquals(lookupZhuyin2.characters, ["我"]);
  } finally {
    await client.close();
  }
});

Deno.test("register: add new and duplicate characters", async () => {
  const [db, client] = await testDb();
  const dict = new ZhuyinDictionaryConcept(db);

  try {
    const char = "爸" as Character;
    const zhuyin = "ㄅㄚˋ" as ZhuyinRep;

    // Add new character
    const res1 = await dict.register({ character: char, zhuyinRep: zhuyin });
    assertEquals(res1, {}); // success

    // Try adding the same character again
    const res2 = await dict.register({ character: char, zhuyinRep: zhuyin });
    assertEquals(
      "error" in res2,
      true,
      `Registering duplicate character should throw an error`,
    );
  } finally {
    await client.close();
  }
});

Deno.test("register: add simplified character", async () => {
  const [db, client] = await testDb();
  const dict = new ZhuyinDictionaryConcept(db);

  try {
    const char = "学" as Character;
    const zhuyin = "ㄒㄩㄝˊ" as ZhuyinRep;

    // Add new character
    const res1 = await dict.register({ character: char, zhuyinRep: zhuyin });
    assertEquals(res1, {}); // success

    // Verify that the traditional character was added instead
    const lookup = await dict.getAnswer({ character: "學" as Character });
    assertEquals(lookup, { zhuyinRep: zhuyin });

    // Verify that the simplified character is not present
    const lookupSimplified = await dict.getAnswer({ character: char });
    assertEquals(
      "error" in lookupSimplified,
      true,
      `Simplified character should not be present in the dictionary`,
    );
  } finally {
    await client.close();
  }
});

Deno.test("unregister – existing and non-existing character", async () => {
  const [db, client] = await testDb();
  const dict = new ZhuyinDictionaryConcept(db);

  try {
    const char = "好" as Character;
    const zhuyin = "ㄏㄠˇ" as ZhuyinRep;

    // Register then remove
    await dict.register({ character: char, zhuyinRep: zhuyin });

    const res1 = await dict.unregister({ character: char });
    assertEquals(res1, {}); // success

    // Try removing again
    const res2 = await dict.unregister({ character: char });
    assertEquals(
      "error" in res2,
      true,
      `Unregistering non-existent character should throw an error`,
    );
  } finally {
    await client.close();
  }
});

Deno.test("getAnswer – existing and non-existent character", async () => {
  const [db, client] = await testDb();
  const dict = new ZhuyinDictionaryConcept(db);

  try {
    const char = "你" as Character;
    const zhuyin = "ㄋㄧˇ" as ZhuyinRep;

    await dict.register({ character: char, zhuyinRep: zhuyin });

    // Existing
    const res1 = await dict.getAnswer({ character: char });
    assertEquals(res1, { zhuyinRep: zhuyin });

    // Non-existent
    const missing = "她" as Character;
    const res2 = await dict.getAnswer({ character: missing });
    assertEquals(
      "error" in res2,
      true,
      `Getting non-existent character should throw an error`,
    );
  } finally {
    await client.close();
  }
});

Deno.test("lookupZhuyin – full, partial, and no match", async () => {
  const [db, client] = await testDb();
  const dict = new ZhuyinDictionaryConcept(db);

  try {
    const entries = [
      { c: "媽", z: "ㄇㄚ" },
      { c: "馬", z: "ㄇㄚˇ" },
      { c: "罵", z: "ㄇㄚˋ" },
    ] as { c: Character; z: ZhuyinRep }[];

    for (const e of entries) {
      await dict.register({ character: e.c, zhuyinRep: e.z });
    }

    // Full match
    const full = await dict.lookupZhuyin({ zhuyinRep: "ㄇㄚˇ" as ZhuyinRep });
    const fullErrorMsg = `Test Case: Full match - Expected: ${[
      "馬",
    ]}; Got: ${full.characters}`;
    assertEquals(
      full.characters,
      ["馬"],
      fullErrorMsg,
    );

    // Partial prefix match
    const partial = await dict.lookupZhuyin({ zhuyinRep: "ㄇㄚ" as ZhuyinRep });
    const partialActual = partial.characters.sort();
    const partialExpected = ["媽", "馬", "罵"].sort();
    const partialErrorMsg =
      `Test Case: Partial match - Expected: ${partialExpected}; Got: ${partialActual}`;
    assertEquals(
      partialActual,
      partialExpected,
      partialErrorMsg,
    );

    // No match
    const none = await dict.lookupZhuyin({ zhuyinRep: "ㄇㄚˊ" as ZhuyinRep });
    const noneErrorMsg =
      `Test Case: No match - Expected: ${[]}; Got: ${none.characters}`;
    assertEquals(
      none.characters,
      [],
      noneErrorMsg,
    );
  } finally {
    await client.close();
  }
});
