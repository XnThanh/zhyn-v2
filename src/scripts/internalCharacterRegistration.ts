/**
 * Script: Register Character Sets into ZhuyinDictionary
 *
 * Run with Deno (requires .env with MONGODB_URL and DB_NAME):
 *   deno run --allow-env --allow-net --allow-read src/scripts/internalCharacterRegistration.ts <set-name>
 *
 * Available sets: newbie, beginner, intermediate, advanced, all
 *
 * Examples:
 *   deno run --allow-env --allow-net --allow-read src/scripts/internalCharacterRegistration.ts newbie
 *   deno run --allow-env --allow-net --allow-read src/scripts/internalCharacterRegistration.ts all
 */
import { getDb } from "@utils/database.ts";
import ZhuyinDictionaryConcept from "../concepts/ZhuyinDictionary/ZhuyinDictionaryConcept.ts";
import {
  advancedAddOnSet,
  beginnerAddOnSet,
  intermediateAddOnSet,
  newbieSet,
} from "@utils/characterLibrary.ts";
import { Character, ZhuyinRep } from "@utils/types.ts";

type CharacterSet = {
  char: string;
  zhuyin: string;
};

const CHARACTER_SETS: Record<string, CharacterSet[]> = {
  newbie: newbieSet,
  beginner: beginnerAddOnSet,
  intermediate: intermediateAddOnSet,
  advanced: advancedAddOnSet,
};

async function registerCharacterSet(
  zhuyinDict: ZhuyinDictionaryConcept,
  setName: string,
  characterSet: CharacterSet[],
) {
  console.log(`\nRegistering ${setName.toUpperCase()} characters...`);

  let success = 0;
  let skipped = 0;
  const errors: { char: string; error: string }[] = [];

  for (const entry of characterSet) {
    const character = entry.char as Character;
    const zhuyinRep = entry.zhuyin as ZhuyinRep;
    try {
      const res = await zhuyinDict.register({ character, zhuyinRep });
      if ("error" in res) {
        // If it's already registered with a different zhuyin, treat as error; if same, treat as skipped
        if (res.error.includes("already registered")) {
          skipped++;
        } else {
          errors.push({ char: entry.char, error: res.error });
        }
      } else {
        success++;
      }
    } catch (e) {
      errors.push({ char: entry.char, error: String(e) });
    }
  }

  console.log(`\nSummary for ${setName}:`);
  console.log(`  Added   : ${success}`);
  console.log(`  Skipped : ${skipped}`);
  console.log(`  Errors  : ${errors.length}`);
  if (errors.length) {
    for (const e of errors) console.warn(`  - ${e.char}: ${e.error}`);
  }

  return { success, skipped, errors: errors.length };
}

async function main() {
  const setName = Deno.args[0]?.toLowerCase();

  if (!setName) {
    console.error("Error: Please specify a character set to register.");
    console.log(
      "\nUsage: deno run ... internalCharacterRegistration.ts <set-name>",
    );
    console.log("\nAvailable sets:");
    console.log("  - newbie");
    console.log("  - beginner");
    console.log("  - intermediate");
    console.log("  - advanced");
    console.log("  - all (registers all sets in order)");
    Deno.exit(1);
  }

  const [db, client] = await getDb();
  const zhuyinDict = new ZhuyinDictionaryConcept(db);

  try {
    if (setName === "all") {
      console.log("Registering ALL character sets...");
      let totalSuccess = 0;
      let totalSkipped = 0;
      let totalErrors = 0;

      for (const [name, set] of Object.entries(CHARACTER_SETS)) {
        const result = await registerCharacterSet(zhuyinDict, name, set);
        totalSuccess += result.success;
        totalSkipped += result.skipped;
        totalErrors += result.errors;
      }

      console.log("\n" + "=".repeat(50));
      console.log("GRAND TOTAL:");
      console.log(`  Added   : ${totalSuccess}`);
      console.log(`  Skipped : ${totalSkipped}`);
      console.log(`  Errors  : ${totalErrors}`);
    } else if (CHARACTER_SETS[setName]) {
      await registerCharacterSet(zhuyinDict, setName, CHARACTER_SETS[setName]);
    } else {
      console.error(`Error: Unknown character set '${setName}'`);
      console.log(
        "\nAvailable sets: newbie, beginner, intermediate, advanced, all",
      );
      Deno.exit(1);
    }
  } finally {
    await client.close();
  }
}

if (import.meta.main) {
  main();
}
