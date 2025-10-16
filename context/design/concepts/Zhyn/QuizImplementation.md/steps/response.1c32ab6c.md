---
timestamp: 'Wed Oct 15 2025 14:57:50 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251015_145750.a40d3e1a.md]]'
content_id: 1c32ab6cebca9c2664bbe7801987f20e639aa5f97f2c5ea0ca30fb63b030748b
---

# response:

While I understand the desire to encapsulate related logic, directly embedding the `sync` logic within the `QuizConcept` implementation goes against a fundamental principle of Concept Design: **Concept Independence**.

Let me explain why, based on the documentation provided:

1. **"No import statements can reference another concept in any way, including type declarations."**
   If the `QuizConcept` were to perform the `ZhuyinDictionary` lookup, it would need to `import` the `ZhuyinDictionaryConcept` and create an instance of it, directly violating this rule.

2. **"Because concepts are fully independent of one another, they cannot refer to each other or use each other's services. Concepts are therefore composed using *synchronizations* (or *syncs*)."**
   The purpose of syncs is specifically to orchestrate interactions *between* concepts without them needing to know about each other. The `QuizConcept` should not "know" about the `ZhuyinDictionaryConcept` or be responsible for validating its inputs against it. Its `register` action should simply assume it receives valid `character` and `zhuyinRep` values, as the `sync` will have already performed that validation *before* allowing `Quiz.register` to proceed.

3. **Separation of Concerns:** The `QuizConcept`'s concern is tracking quiz questions. The `ZhuyinDictionaryConcept`'s concern is tracking character-Zhuyin mappings. Conflating these responsibilities within `QuizConcept` would undermine this separation.

**What to do instead:**

The `sync ValidateQuizRegistration` definition you provided is precisely how this cross-concept validation is handled in Concept Design. This `sync` would be defined and managed by an **external synchronization engine or orchestrator**, not within the `QuizConcept.ts` file itself.

When a user or another part of the system attempts to call `Quiz.register`, the sync engine would intercept this "request":

1. It would first execute the `where` clause (`ZhuyinDictionary.getAnswer`).
2. Then it would evaluate the `if/else` condition in the `then` clause.
3. Finally, it would either:
   * Call the *actual* `Quiz.register` method (which you've already implemented) if validation passes.
   * Return an error directly (without ever calling `Quiz.register`) if validation fails.

Therefore, **no code for this `sync` should be added inside your `QuizConcept.ts` implementation.** Your `QuizConcept.register` method should remain exactly as it is, focused solely on creating a question entry in its own state. The `requires` clause in your concept specification is an external constraint that the sync enforces.
