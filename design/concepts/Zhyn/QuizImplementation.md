[@concept-design-overview](../../background/concept-design-overview.md)

[@concept-specifications](../../background/concept-specifications.md)

[@implementing-concepts](../../background/implementing-concepts.md)

[@quiz-specs](Quiz.md)

[@example](../../../src/concepts/ZhuyinDictionary/ZhuyinDictionaryConcept.ts)

# implement: Quiz
# response:

```typescript
// file: src\concepts\Quiz\QuizConcept.ts

import { Collection, Db } from "npm:mongodb";
import { Empty, ID } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";

// Generic types for this concept, matching the specification.
export type Character = ID;
export type ZhuyinRep = ID;

// Internal entity type representing a quiz question.
// Corresponds to "a set of Questions" in the state description.
interface QuestionEntry {
  _id: ID; // questionId will be stored here
  character: Character;
  targetZhuyinRep: ZhuyinRep;
  response?: ZhuyinRep; // Optional, as it's set later
  startTime?: Date; // Optional, as it's set later
  endTime?: Date; // Optional, as it's set later
  speed?: number; // Optional, calculated later
  correct?: boolean; // Optional, calculated later
}

/**
 * @concept Quiz [Character, ZhuyinRep]
 * @purpose track User's Zhuyin typing ability
 * @principle track the speed and accuracy for each Character that user typed
 */
export default class QuizConcept {
  private readonly questionsCollection: Collection<QuestionEntry>;
  private readonly PREFIX = "Quiz" + ".";

  constructor(private readonly db: Db) {
    this.questionsCollection = this.db.collection(this.PREFIX + "questions");
  }

  /**
   * **action** register (character: Character, zhuyinRep: ZhuyinRep): (questionId: ID)
   *
   * @effects Generate a questionId. Create a new Question with questionId,
   * associated character and target ZhuyinRep, other fields unset. Return questionId.
   */
  async register(
    { character, zhuyinRep }: { character: Character; zhuyinRep: ZhuyinRep },
  ): Promise<{ questionId: ID }> {
    const questionId = freshID();
    await this.questionsCollection.insertOne({
      _id: questionId,
      character,
      targetZhuyinRep: zhuyinRep,
      // Other fields (response, startTime, endTime, speed, correct) are intentionally unset
    });
    return { questionId };
  }

  /**
   * **action** startQuestion (questionId: ID)
   *
   * @requires Question not already started (startTime is unset)
   * @effects update startTime of corresponding Question to current time
   */
  async startQuestion(
    { questionId }: { questionId: ID },
  ): Promise<Empty | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.startTime) {
      return { error: `Question '${questionId}' has already been started.` };
    }

    await this.questionsCollection.updateOne(
      { _id: questionId },
      { $set: { startTime: new Date() } },
    );
    return {};
  }

  /**
   * **action** submitAnswer (questionId: ID, response: ZhuyinRep)
   *
   * @requires Question exists with endTime unset
   * @effects set endTime = current time
   *          set response = response
   *          set speed = endTime - startTime (in milliseconds)
   *          set correct = (response = targetZhuyinRep)
   */
  async submitAnswer(
    { questionId, response }: { questionId: ID; response: ZhuyinRep },
  ): Promise<Empty | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.endTime) {
      return { error: `Question '${questionId}' has already been submitted.` };
    }
    if (!question.startTime) {
      return {
        error: `Question '${questionId}' must be started before submitting an answer.`,
      };
    }

    const endTime = new Date();
    const speed = (endTime.getTime() - question.startTime.getTime()) 
    
    // question.startTime
    //   ? (endTime.getTime() - question.startTime.getTime()) 
    //   : undefined;
    const correct = response === question.targetZhuyinRep;

    await this.questionsCollection.updateOne(
      { _id: questionId },
      {
        $set: {
          endTime,
          response,
          speed,
          correct,
        },
      },
    );
    return {};
  }

  /**
   * **query** getSpeed (questionId: ID): (speed: number)
   *
   * @requires Question exists and endTime set
   * @effects return speed associated with Question
   */
  async getSpeed(
    { questionId }: { questionId: ID },
  ): Promise<{ speed: number } | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.endTime === undefined || question.speed === undefined) {
      return {
        error: `Question '${questionId}' has not been completed, speed not available.`,
      };
    }
    return { speed: question.speed };
  }

  /**
   * **query** getAccuracy (questionId: ID): (correct: boolean)
   *
   * @requires Question exists and endTime set
   * @effects return correct Boolean associated with Question
   */
  async getAccuracy(
    { questionId }: { questionId: ID },
  ): Promise<{ correct: boolean } | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.endTime === undefined || question.correct === undefined) {
      return {
        error: `Question '${questionId}' has not been completed, accuracy not available.`,
      };
    }
    return { correct: question.correct };
  }

  /**
   * **query** _getQuestionDetails (questionId: ID): (details: QuestionEntry)
   *
   * @requires Question exists
   * @effects return all details associated with the Question.
   * This is a utility query for testing or advanced scenarios.
   */
  async getQuestionDetails(
    { questionId }: { questionId: ID },
  ): Promise<{ details: QuestionEntry } | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    return { details: question };
  }
}
```

# prompt: I made the following changes to my quiz concept specification:  
register (Character, ZhuyinRep): (questionId: String)  
  &emsp; requires Character and ZhuyinRep are a valid pair in ZhuyinDict  
  &emsp; effect Generate a questionId. Create a new Question with questionId, associated character and target ZhuyinRep, other fields unset. Return questionId.

  **sync** register  
*when*  
  &emsp; Quiz.register (Character, providedZhuyinRep: ZhuyinRep)  
*where*  
  &emsp; ZhuyinDictionary.getAnswer(Character): (registeredZhuyinRep: ZhuyinRep)  
*then*  
  &emsp; if providedZhuyinRep === registeredZhuyinRep: Quiz.register(Character, registeredZhuyinRep: ZhuyinRep): (questionId: String)  
  &emsp; else: error  
# response:

The provided update focuses on modifying the `register` action of the `Quiz` concept and introducing a `sync` rule.

### Analysis of Changes:

1.  **`Quiz.register` action update:**
    *   The `requires` clause `Character and ZhuyinRep are a valid pair in ZhuyinDict` has been added.
    *   **Important Consideration:** The core principle of concept design is *independence*. A concept should not directly reference or depend on the internal state or actions of another concept. Therefore, the `QuizConcept` implementation itself *cannot* directly perform the validation against `ZhuyinDictionary`.
    *   **Interpretation:** The `requires` clause here is a *system-level precondition* that is expected to be enforced *externally* by mechanisms like the provided `sync`. The `QuizConcept`'s `register` action will assume its inputs (`character` and `zhuyinRep`) are already valid according to the `ZhuyinDictionary`. The implementation should primarily update its internal documentation to reflect this `requires` clause.

2.  **`sync register` definition:**
    *   This sync rule illustrates *how* the `requires` clause for `Quiz.register` would be enforced at a higher level of orchestration.
    *   **Critical Detail:** As per the concept design principles (e.g., the `DeletePost` example using `Request` concept), the `when` clause of a `sync` typically listens for a *request* or an *external event*, not the ultimate concept action itself, if that action is subsequently triggered in the `then` clause.
    *   The provided `sync` definition:
        ```
        when Quiz.register (Character, providedZhuyinRep: ZhuyinRep)
        ...
        then if providedZhuyinRep === registeredZhuyinRep: Quiz.register(Character, registeredZhuyinRep: ZhuyinRep): (questionId: String)
        ```
        This shows `Quiz.register` in both `when` and `then` clauses. In a strict interpretation, this creates a recursive trigger or assumes `Quiz.register` is both a request and the final action. A more robust and common pattern would be for the `when` clause to listen to an action from a pseudo-concept (e.g., `Request.registerQuizQuestion`), and then `then` clause to call the actual `Quiz.register` action.
    *   **Impact on `QuizConcept.ts`:** The `sync` rule itself is an external composition mechanism and does *not* translate into code within the `QuizConcept.ts` file. The `QuizConcept` remains independent, its `register` method focusing solely on its own state updates.

### Implementation Update for `QuizConcept.ts`:

Based on the above, the primary change within `QuizConcept.ts` will be updating the JSDoc comments for the `register` action to include the new `requires` clause. The logical implementation of the `register` action remains the same, as it assumes the validity of its inputs due to external orchestration (the `sync`).

Additionally, I'll fix the `speed` calculation in `submitAnswer` to be robust, as `startTime` is guaranteed to exist by its `requires` clause.

```typescript
// file: src\concepts\Quiz\QuizConcept.ts

import { Collection, Db } from "npm:mongodb";
import { Empty, ID } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";

// Generic types for this concept, matching the specification.
export type Character = ID;
export type ZhuyinRep = ID;

// Internal entity type representing a quiz question.
// Corresponds to "a set of Questions" in the state description.
interface QuestionEntry {
  _id: ID; // questionId will be stored here
  character: Character;
  targetZhuyinRep: ZhuyinRep;
  response?: ZhuyinRep; // Optional, as it's set later
  startTime?: Date; // Optional, as it's set later
  endTime?: Date; // Optional, as it's set later
  speed?: number; // Optional, calculated later
  correct?: boolean; // Optional, calculated later
}

/**
 * @concept Quiz [Character, ZhuyinRep]
 * @purpose track User's Zhuyin typing ability
 * @principle track the speed and accuracy for each Character that user typed
 */
export default class QuizConcept {
  private readonly questionsCollection: Collection<QuestionEntry>;
  private readonly PREFIX = "Quiz" + ".";

  constructor(private readonly db: Db) {
    this.questionsCollection = this.db.collection(this.PREFIX + "questions");
  }

  /**
   * **action** register (character: Character, zhuyinRep: ZhuyinRep): (questionId: ID)
   *
   * @requires Character and ZhuyinRep are a valid pair in ZhuyinDict
   * @effects Generate a questionId. Create a new Question with questionId,
   * associated character and target ZhuyinRep, other fields unset. Return questionId.
   */
  async register(
    { character, zhuyinRep }: { character: Character; zhuyinRep: ZhuyinRep },
  ): Promise<{ questionId: ID }> {
    const questionId = freshID();
    await this.questionsCollection.insertOne({
      _id: questionId,
      character,
      targetZhuyinRep: zhuyinRep,
      // Other fields (response, startTime, endTime, speed, correct) are intentionally unset
    });
    return { questionId };
  }

  /**
   * **action** startQuestion (questionId: ID)
   *
   * @requires Question exists and not already started (startTime is unset)
   * @effects update startTime of corresponding Question to current time
   */
  async startQuestion(
    { questionId }: { questionId: ID },
  ): Promise<Empty | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.startTime) {
      return { error: `Question '${questionId}' has already been started.` };
    }

    await this.questionsCollection.updateOne(
      { _id: questionId },
      { $set: { startTime: new Date() } },
    );
    return {};
  }

  /**
   * **action** submitAnswer (questionId: ID, response: ZhuyinRep)
   *
   * @requires Question exists and started, with endTime unset
   * @effects set endTime = current time
   *          set response = response
   *          set speed = endTime - startTime (in milliseconds)
   *          set correct = (response = targetZhuyinRep)
   */
  async submitAnswer(
    { questionId, response }: { questionId: ID; response: ZhuyinRep },
  ): Promise<Empty | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.endTime) {
      return { error: `Question '${questionId}' has already been submitted.` };
    }
    if (!question.startTime) {
      // This case should ideally be prevented by the 'requires' clause
      return {
        error: `Question '${questionId}' must be started before submitting an answer.`,
      };
    }

    const endTime = new Date();
    // startTime is guaranteed to be set by the 'requires' clause.
    const speed = endTime.getTime() - question.startTime.getTime();
    const correct = response === question.targetZhuyinRep;

    await this.questionsCollection.updateOne(
      { _id: questionId },
      {
        $set: {
          endTime,
          response,
          speed,
          correct,
        },
      },
    );
    return {};
  }

  /**
   * **query** getSpeed (questionId: ID): (speed: number)
   *
   * @requires Question exists and endTime set
   * @effects return speed associated with Question
   */
  async getSpeed(
    { questionId }: { questionId: ID },
  ): Promise<{ speed: number } | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.endTime === undefined || question.speed === undefined) {
      return {
        error: `Question '${questionId}' has not been completed, speed not available.`,
      };
    }
    return { speed: question.speed };
  }

  /**
   * **query** getAccuracy (questionId: ID): (correct: boolean)
   *
   * @requires Question exists and endTime set
   * @effects return correct Boolean associated with Question
   */
  async getAccuracy(
    { questionId }: { questionId: ID },
  ): Promise<{ correct: boolean } | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    if (question.endTime === undefined || question.correct === undefined) {
      return {
        error: `Question '${questionId}' has not been completed, accuracy not available.`,
      };
    }
    return { correct: question.correct };
  }

  /**
   * **query** _getQuestionDetails (questionId: ID): (details: QuestionEntry)
   *
   * @requires Question exists
   * @effects return all details associated with the Question.
   * This is a utility query for testing or advanced scenarios.
   */
  async getQuestionDetails(
    { questionId }: { questionId: ID },
  ): Promise<{ details: QuestionEntry } | { error: string }> {
    const question = await this.questionsCollection.findOne({
      _id: questionId,
    });

    if (!question) {
      return { error: `Question with ID '${questionId}' not found.` };
    }
    return { details: question };
  }
}
```

# prompt: Help me write the sync.
# response:

Okay, let's write the `sync` for the `Quiz.register` action, incorporating the validation against the `ZhuyinDictionary` as per your updated specification.

Based on the principles of Concept Design:
1.  **Concept Independence:** The `QuizConcept` itself cannot directly call `ZhuyinDictionaryConcept`. Its `register` action simply expects a `character` and `zhuyinRep` and will create a question. The `requires` clause in the `Quiz` specification is an *external* validation to be enforced by a `sync`.
2.  **Syncs for Composition:** Syncs are the mechanism for orchestrating interactions between independent concepts. They observe actions (`when`), check conditions across concepts' states (`where`), and then trigger subsequent actions (`then`).
3.  **Error Handling:** Actions can return an `error: String` as a normal result.

Here's the `sync` definition, following the pattern where the `sync` effectively "intercepts" and validates an attempt to perform an action, then either allows it to proceed or returns an error.

```
sync ValidateQuizRegistration
// This sync is triggered when an attempt is made to register a quiz question.
// We capture the `character` and the `providedZhuyinRep` from this attempt.
when
    Quiz.register (character: Character as requestedCharacter, zhuyinRep: ZhuyinRep as providedZhuyin)

where
    // We query the ZhuyinDictionary to get the *registered* Zhuyin representation for the `requestedCharacter`.
    ZhuyinDictionary.getAnswer(character: requestedCharacter): (zhuyinRep: ZhuyinRep as registeredZhuyin)

then
    // If the `providedZhuyin` from the request matches the `registeredZhuyin` from the dictionary,
    if providedZhuyin === registeredZhuyin:
        // Then, the actual Quiz.register action is performed.
        // The successful outcome (questionId) of this action will be returned as the result of the overall operation.
        // We pass the validated `providedZhuyin` (which is equal to `registeredZhuyin`).
        Quiz.register(character: requestedCharacter, zhuyinRep: providedZhuyin): (questionId: ID)
    else:
        // Otherwise, the original Quiz.register attempt is aborted, and an error is returned.
        // This assumes the sync mechanism can intercept the original action's intended success
        // and substitute an error return instead, using the overloaded action signature.
        Quiz.register(character: requestedCharacter, zhuyinRep: providedZhuyin): (error: String = "Provided Zhuyin representation does not match dictionary for character.")
```

**Explanation:**

*   **`when Quiz.register (...)`**: This line indicates that this sync is activated whenever the `Quiz.register` action is attempted. The `as` keyword captures the input arguments for use in subsequent clauses.
*   **`where ZhuyinDictionary.getAnswer(...)`**: Here, the sync queries the `ZhuyinDictionary` concept to fetch the canonical Zhuyin representation for the `requestedCharacter`.
*   **`then if ... else ...`**: This conditional logic determines the outcome:
    *   **Success (`if` branch)**: If the `providedZhuyin` matches the `registeredZhuyin`, the `Quiz.register` action is then explicitly invoked (or allowed to proceed) by the sync, and its successful result (`questionId`) is propagated back.
    *   **Failure (`else` branch)**: If they don't match, the original `Quiz.register` action is *not* allowed to succeed, and an error message is returned instead, leveraging the action's capability to return an `error: String`. This directly implements the `requires` clause of your `Quiz.register` specification.

This sync ensures that any attempt to register a quiz question is first validated against the `ZhuyinDictionary`, maintaining the modularity and independence of both the `Quiz` and `ZhuyinDictionary` concepts.

# prompt: I want this sync as code inside my quiz implementation. Tell me what code to add and where. I do not want the entire updated output of quiz implementation.
# response:

While I understand the desire to encapsulate related logic, directly embedding the `sync` logic within the `QuizConcept` implementation goes against a fundamental principle of Concept Design: **Concept Independence**.

Let me explain why, based on the documentation provided:

1.  **"No import statements can reference another concept in any way, including type declarations."**
    If the `QuizConcept` were to perform the `ZhuyinDictionary` lookup, it would need to `import` the `ZhuyinDictionaryConcept` and create an instance of it, directly violating this rule.

2.  **"Because concepts are fully independent of one another, they cannot refer to each other or use each other's services. Concepts are therefore composed using *synchronizations* (or *syncs*)."**
    The purpose of syncs is specifically to orchestrate interactions *between* concepts without them needing to know about each other. The `QuizConcept` should not "know" about the `ZhuyinDictionaryConcept` or be responsible for validating its inputs against it. Its `register` action should simply assume it receives valid `character` and `zhuyinRep` values, as the `sync` will have already performed that validation *before* allowing `Quiz.register` to proceed.

3.  **Separation of Concerns:** The `QuizConcept`'s concern is tracking quiz questions. The `ZhuyinDictionaryConcept`'s concern is tracking character-Zhuyin mappings. Conflating these responsibilities within `QuizConcept` would undermine this separation.

**What to do instead:**

The `sync ValidateQuizRegistration` definition you provided is precisely how this cross-concept validation is handled in Concept Design. This `sync` would be defined and managed by an **external synchronization engine or orchestrator**, not within the `QuizConcept.ts` file itself.

When a user or another part of the system attempts to call `Quiz.register`, the sync engine would intercept this "request":

1.  It would first execute the `where` clause (`ZhuyinDictionary.getAnswer`).
2.  Then it would evaluate the `if/else` condition in the `then` clause.
3.  Finally, it would either:
    *   Call the *actual* `Quiz.register` method (which you've already implemented) if validation passes.
    *   Return an error directly (without ever calling `Quiz.register`) if validation fails.

Therefore, **no code for this `sync` should be added inside your `QuizConcept.ts` implementation.** Your `QuizConcept.register` method should remain exactly as it is, focused solely on creating a question entry in its own state. The `requires` clause in your concept specification is an external constraint that the sync enforces.

# prompt: What if I made a new file called sync.ts. Tell me what code would be in this new sync.ts file that allows me to assert the precondition for quiz.register.
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

*   **Orchestration Layer:** This `sync.ts` file represents an orchestration layer. It's where the logic for cross-concept interactions resides.
*   **Concept Independence Maintained:** Both `QuizConcept.ts` and `ZhuyinDictionaryConcept.ts` remain completely independent. They don't know about each other, nor does `QuizConcept` know that its `register` action is being guarded by an external validation.
*   **Imports:** The `sync.ts` file *is* allowed to import and instantiate multiple concepts because its job is to compose them.
*   **Error Handling:** The `error` return pattern for actions is essential here for the sync to effectively communicate validation failures.