## Changes made

- Split database into two separate concepts - ZhuyinDictionary and LevelMap - based on grader comments
- This allowed LevelMap to have a single purpose: generate sentences suitable to a user's level. The management of Zhuyin and characters is no longer part of this concept.
- Added a levelName to the state and updated all actions to take levelName as input. This makes sense for the backend since it needs a way to determine the level, and using a levelName String is the simplest way.

## Issues

- Converting Assignment 3 LLM augmentation into using MongoDb states. Took some time but Context and ChatGPT was helpful in resolving issues, especially type errors.
- Had issues with external library not have a default export type and Deno complaining about importing it. Resolved with help from GPT.