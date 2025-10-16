---
timestamp: 'Wed Oct 15 2025 14:56:41 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251015_145641.73d904ff.md]]'
content_id: 5828ae437caf83a67cb8aedb084e0f9513bc51d7f0f3236bd2835b94937348a6
---

# response:

Okay, let's write the `sync` for the `Quiz.register` action, incorporating the validation against the `ZhuyinDictionary` as per your updated specification.

Based on the principles of Concept Design:

1. **Concept Independence:** The `QuizConcept` itself cannot directly call `ZhuyinDictionaryConcept`. Its `register` action simply expects a `character` and `zhuyinRep` and will create a question. The `requires` clause in the `Quiz` specification is an *external* validation to be enforced by a `sync`.
2. **Syncs for Composition:** Syncs are the mechanism for orchestrating interactions between independent concepts. They observe actions (`when`), check conditions across concepts' states (`where`), and then trigger subsequent actions (`then`).
3. **Error Handling:** Actions can return an `error: String` as a normal result.

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

* **`when Quiz.register (...)`**: This line indicates that this sync is activated whenever the `Quiz.register` action is attempted. The `as` keyword captures the input arguments for use in subsequent clauses.
* **`where ZhuyinDictionary.getAnswer(...)`**: Here, the sync queries the `ZhuyinDictionary` concept to fetch the canonical Zhuyin representation for the `requestedCharacter`.
* **`then if ... else ...`**: This conditional logic determines the outcome:
  * **Success (`if` branch)**: If the `providedZhuyin` matches the `registeredZhuyin`, the `Quiz.register` action is then explicitly invoked (or allowed to proceed) by the sync, and its successful result (`questionId`) is propagated back.
  * **Failure (`else` branch)**: If they don't match, the original `Quiz.register` action is *not* allowed to succeed, and an error message is returned instead, leveraging the action's capability to return an `error: String`. This directly implements the `requires` clause of your `Quiz.register` specification.

This sync ensures that any attempt to register a quiz question is first validated against the `ZhuyinDictionary`, maintaining the modularity and independence of both the `Quiz` and `ZhuyinDictionary` concepts.
