---
timestamp: 'Wed Oct 15 2025 15:00:09 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251015_150009.874573bd.md]]'
content_id: bfa2677803a7bca023826a152dc6dc57fb4d055861a34b078a4d895a2481008c
---

# response:

You're asking to translate the declarative `sync` rule into imperative TypeScript code that would live in a `sync.ts` file. This `sync.ts` file would act as an **orchestration layer** that manages interactions *between* your independent concepts.

It's crucial to understand that this `sync.ts` file (or the code within it) is **not part of the `QuizConcept` or `ZhuyinDictionaryConcept` themselves**. It lives *above* them in your application's architecture, and it's allowed to import and interact with multiple concepts because its purpose is to compose them. This preserves the independence of each individual concept.

Here's what that `sync.ts` file might look like, along with an explanation:

```typescript
// file: src/sync.ts (or a more descriptive name like `quizOrchestrator.ts`)

import { Db } from "npm:mongodb";
import { ID, Empty } from "./utils/types.ts"; // Assuming utils path
// Import the concept implementations that this sync orchestrates
import QuizConcept, {
  Character,
  ZhuyinRep,
} from "./concepts/Quiz/QuizConcept.ts"; // Adjust path as needed
import ZhuyinDictionaryConcept from "./concepts/ZhuyinDictionary/ZhuyinDictionaryConcept.ts"; // Adjust path as needed

/**
 * This function embodies the `ValidateQuizRegistration` sync rule.
 * It acts as the entry point for attempts to register a new quiz question,
 * performing the necessary cross-concept validation before delegating
 * to the core QuizConcept's register action.
 */
export async function handleRegisterQuizQuestion(
  db: Db, // The database instance is passed in to allow concept instantiation
  // The input arguments are the 'when' clause arguments from the sync
  { character, zhuyinRep }: { character: Character; zhuyinRep: ZhuyinRep },
): Promise<{ questionId: ID } | { error: string }> {
  // 1. Instantiate the concepts that this sync needs to interact with.
  // In a larger application, these might be injected or managed by a DI container.
  const zhuyinDictionary = new ZhuyinDictionaryConcept(db);
  const quiz = new QuizConcept(db);

  // 2. Implement the 'where' clause: query the ZhuyinDictionary.
  const registeredZhuyinResult = await zhuyinDictionary.getAnswer({
    character: character,
  });

  // Handle potential errors from the ZhuyinDictionary lookup
  if ("error" in registeredZhuyinResult) {
    return {
      error: `Validation failed: Character '${character}' not found in Zhuyin Dictionary.`,
    };
  }

  const registeredZhuyin = registeredZhuyinResult.zhuyinRep;

  // 3. Implement the 'then' clause conditional logic.
  // Check if the provided Zhuyin representation matches the one in the dictionary.
  if (zhuyinRep === registeredZhuyin) {
    // If validation passes, call the actual QuizConcept.register action.
    // The result (questionId) from Quiz.register is then returned by this handler.
    const quizRegistrationOutcome = await quiz.register({
      character: character,
      zhuyinRep: zhuyinRep,
    });
    return quizRegistrationOutcome; // Should be { questionId: ID }
  } else {
    // If validation fails, return an error message without calling Quiz.register.
    return {
      error:
        "Provided Zhuyin representation does not match dictionary for character.",
    };
  }
}
```

**Where to use this code:**

This `handleRegisterQuizQuestion` function would be the new entry point in your application logic whenever you previously would have directly called `QuizConcept.register`. For example, if you have a REST API endpoint for creating quiz questions, that endpoint's handler would call `handleRegisterQuizQuestion` instead of directly calling `quiz.register`.

**Key takeaways:**

* **Orchestration Layer:** This `sync.ts` file represents an orchestration layer. It's where the logic for cross-concept interactions resides.
* **Concept Independence Maintained:** Both `QuizConcept.ts` and `ZhuyinDictionaryConcept.ts` remain completely independent. They don't know about each other, nor does `QuizConcept` know that its `register` action is being guarded by an external validation.
* **Imports:** The `sync.ts` file *is* allowed to import and instantiate multiple concepts because its job is to compose them.
* **Error Handling:** The `error` return pattern for actions is essential here for the sync to effectively communicate validation failures.
