/**
 * Script: Populate Levels with Character Sets
 *
 * Run with Deno (requires .env with MONGODB_URL and DB_NAME):
 *   deno run --allow-env --allow-net --allow-read src/scripts/internalLevelPopulation.ts <level-name>
 *
 * Available levels: newbie, beginner, intermediate, advanced, all
 *
 * Examples:
 *   deno run --allow-env --allow-net --allow-read src/scripts/internalLevelPopulation.ts newbie
 *   deno run --allow-env --allow-net --allow-read src/scripts/internalLevelPopulation.ts all
 *
 * Note: Levels are cumulative. Each level includes all characters from lower levels:
 *   - Newbie: newbieSet only
 *   - Beginner: newbieSet + beginnerAddOnSet
 *   - Intermediate: newbieSet + beginnerAddOnSet + intermediateAddOnSet
 *   - Advanced: newbieSet + beginnerAddOnSet + intermediateAddOnSet + advancedAddOnSet
 */
import { getDb } from "@utils/database.ts";
import LevelMapConcept from "../concepts/LevelMap/LevelMapConcept.ts";
import {
  advancedAddOnSet,
  beginnerAddOnSet,
  intermediateAddOnSet,
  newbieSet,
} from "@utils/characterLibrary.ts";
import { Character, ID } from "@utils/types.ts";
import { LevelEnum } from "@utils/LevelEnum.ts";

type CharacterSet = {
  char: string;
  zhuyin: string;
};

// Build cumulative character sets for each level
const LEVEL_CHARACTER_SETS: Record<
  string,
  { levelName: ID; characters: CharacterSet[] }
> = {
  newbie: {
    levelName: LevelEnum.Newbie,
    characters: [...newbieSet],
  },
  beginner: {
    levelName: LevelEnum.Beginner,
    characters: [...newbieSet, ...beginnerAddOnSet],
  },
  intermediate: {
    levelName: LevelEnum.Intermediate,
    characters: [...newbieSet, ...beginnerAddOnSet, ...intermediateAddOnSet],
  },
  advanced: {
    levelName: LevelEnum.Advanced,
    characters: [
      ...newbieSet,
      ...beginnerAddOnSet,
      ...intermediateAddOnSet,
      ...advancedAddOnSet,
    ],
  },
};

async function populateLevel(
  levelMap: LevelMapConcept,
  setName: string,
  levelName: ID,
  characterSet: CharacterSet[],
) {
  console.log(
    `\nPopulating ${setName.toUpperCase()} level with ${characterSet.length} characters (cumulative)...`,
  );

  // First, ensure the level exists
  const createResult = await levelMap.createLevel({ levelName });
  if ("error" in createResult) {
    if (createResult.error.includes("already exists")) {
      console.log(`  Level '${levelName}' already exists, continuing...`);
    } else {
      console.error(`  Error creating level: ${createResult.error}`);
      return { success: 0, skipped: 0, errors: 1 };
    }
  } else {
    console.log(`  Created level '${levelName}'`);
  }

  let success = 0;
  let skipped = 0;
  const errors: { char: string; error: string }[] = [];

  for (const entry of characterSet) {
    const character = entry.char as Character;
    try {
      const res = await levelMap.addCharacter({ levelName, character });
      if ("error" in res) {
        // If it's already in the level, treat as skipped
        if (res.error.includes("already in level")) {
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
    console.error("Error: Please specify a level to populate.");
    console.log(
      "\nUsage: deno run ... internalLevelPopulation.ts <level-name>",
    );
    console.log("\nAvailable levels:");
    console.log("  - newbie");
    console.log("  - beginner");
    console.log("  - intermediate");
    console.log("  - advanced");
    console.log("  - all (populates all levels in order)");
    Deno.exit(1);
  }

  const [db, client] = await getDb();
  const levelMap = new LevelMapConcept(db);

  try {
    if (setName === "all") {
      console.log("Populating ALL levels with their character sets...");
      let totalSuccess = 0;
      let totalSkipped = 0;
      let totalErrors = 0;

      for (const [name, config] of Object.entries(LEVEL_CHARACTER_SETS)) {
        const result = await populateLevel(
          levelMap,
          name,
          config.levelName,
          config.characters,
        );
        totalSuccess += result.success;
        totalSkipped += result.skipped;
        totalErrors += result.errors;
      }

      console.log("\n" + "=".repeat(50));
      console.log("GRAND TOTAL:");
      console.log(`  Added   : ${totalSuccess}`);
      console.log(`  Skipped : ${totalSkipped}`);
      console.log(`  Errors  : ${totalErrors}`);
    } else if (LEVEL_CHARACTER_SETS[setName]) {
      const config = LEVEL_CHARACTER_SETS[setName];
      await populateLevel(
        levelMap,
        setName,
        config.levelName,
        config.characters,
      );
    } else {
      console.error(`Error: Unknown level '${setName}'`);
      console.log(
        "\nAvailable levels: newbie, beginner, intermediate, advanced, all",
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
