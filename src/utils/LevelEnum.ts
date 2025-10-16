import { ID } from "@utils/types.ts";

export const LevelEnum = {
  Newbie: "Newbie" as ID,
  Beginner: "Beginner" as ID,
  Intermediate: "Intermediate" as ID,
  Advanced: "Advanced" as ID,
} as const;

export type LevelEnum = (typeof LevelEnum)[keyof typeof LevelEnum];
