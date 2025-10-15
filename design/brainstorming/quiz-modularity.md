[@concept-design-overview](../background/concept-design-overview.md)

[@concept-specifications](../background/concept-specifications.md)

[@implementing-concepts](../background/implementing-concepts.md)

[@ZhuyinDictionary](../concepts/Zhyn/ZhuyinDictionary.md)

[@Quiz](../concepts/Zhyn/Quiz.md)

# prompt: I want to change the register action in Quiz concept spec so that it takes in a characterEntry instead. However, I would also need to access the character and zhuyinrep associated with that character. Would this conflate concerns and make the soecs not modular?
# response:

Yes, changing the `register` action in the `Quiz` concept to take a `characterEntry` from the `ZhuyinDictionary` concept would **absolutely conflate concerns and make your specifications not modular**, directly violating several core principles of Concept Design.

Here's why and what the correct approach is:

### Why it violates Concept Design principles:

1.  **Violation of Concept Independence:**
    *   The document states: "Perhaps the most significant distinguishing feature of concepts, in comparison to other modularity schemes, is their mutual independence. Each concept is defined without reference to any other concepts, and can be understood in isolation."
    *   If `Quiz`'s `register` action takes a `CharacterEntry` *type*, then `Quiz` immediately becomes dependent on the internal definition of `CharacterEntry` from `ZhuyinDictionary`. `Quiz` can no longer be understood in isolation; you'd need to consult the `ZhuyinDictionary` spec to know what a `CharacterEntry` is.

2.  **Violation of Polymorphism (for generic parameters):**
    *   "The designer of a concept should strive to make the concept as free as possible of any assumptions about the content and interpretation of objects passed as action arguments."
    *   By taking `characterEntry` and then trying to access its `character` and `zhuyinRep` properties, `Quiz` is making explicit assumptions about the internal structure of `CharacterEntry`. This treats `CharacterEntry` as a composite object with specific fields, rather than as a generic, opaque identifier or a value type that `Quiz` only knows about through its own generic parameters.

3.  **Violation of Separation of Concerns & Completeness of Functionality:**
    *   `Quiz`'s purpose is to track user typing ability. `ZhuyinDictionary`'s purpose is to track Zhuyin representations.
    *   By directly referencing `CharacterEntry` and pulling its internal data, `Quiz` is implicitly reaching into the domain of `ZhuyinDictionary` to extract information. This blurs the boundaries of responsibility. `Quiz` should be complete with respect to *its own* functionality without needing to understand the internal structure of *other concept's* state.

### The Correct Approach: Composition by Synchronization

Concept design mandates that concepts interact *only* through their defined actions and queries, orchestrated by `syncs`. The `Quiz` concept should receive the `Character` and `ZhuyinRep` as *its own* generic parameters, not as an object from another concept.

The `ZhuyinDictionary` concept already has a `getAnswer` query that can provide the `ZhuyinRep` for a given `Character`. You would use a synchronization rule to link these concepts.

Here's how you'd maintain modularity:

1.  **Keep `Quiz.register` as is:**
    The `Quiz` concept should continue to define its `register` action to take the `Character` and `ZhuyinRep` as separate, independent inputs:

    ```concept
    concept Quiz [Character, ZhuyinRep] // Corrected: CharacterEntry is not a type parameter, Character and ZhuyinRep are the generic types Quiz works with
    ...
    actions
    register (character: Character, targetZhuyinRep: ZhuyinRep): (questionId: String)
    //  effect Generate a questionId. Create a new Question with questionId,
    //  associated character and target ZhuyinRep, other fields unset. Return questionId.
    ```
    *(Self-correction: I've updated the `Quiz` concept's type parameters in my example to reflect what its `register` action would actually consume, which are `Character` and `ZhuyinRep` themselves, not `CharacterEntry`.)*

2.  **Use a Sync to Orchestrate:**
    When you want to create a quiz question for a specific character, the interaction would look like this:

    ```
    sync CreateQuizQuestionFromDictionaryEntry
    when
        Request.createQuizQuestionForCharacter (charId: Character) // Assume a user action/request to create a quiz question for a specific character ID
    where
        in ZhuyinDictionary: getAnswer(charId) returns (rep: ZhuyinRep) // Use ZhuyinDictionary's query to get the ZhuyinRep for the given Character
    then
        Quiz.register(character: charId, targetZhuyinRep: rep) returns (questionId: String) // Call Quiz.register with the resolved Character and ZhuyinRep, and capture the new question ID
    ```

**Explanation of the Sync:**

*   **`when Request.createQuizQuestionForCharacter (charId: Character)`**: This represents a user's intention or an external event that triggers the creation of a quiz question, providing only the `Character` ID.
*   **`where in ZhuyinDictionary: getAnswer(charId) returns (rep: ZhuyinRep)`**: The sync *queries* the `ZhuyinDictionary` concept. It uses `ZhuyinDictionary`'s `getAnswer` action (or a query if it were defined as one) to retrieve the `ZhuyinRep` associated with the `charId`. This is how `ZhuyinDictionary` *publishes* information without exposing its internal `CharacterEntry` structure.
*   **`then Quiz.register(character: charId, targetZhuyinRep: rep) returns (questionId: String)`**: Finally, the sync calls the `register` action of the `Quiz` concept, passing it the `charId` and the `rep` (Zhuyin Representation) obtained from the `ZhuyinDictionary`. The `Quiz` concept still receives exactly what it needs (`Character` and `ZhuyinRep`) without knowing anything about `CharacterEntry` or the internal workings of `ZhuyinDictionary`.

By using this approach, both `ZhuyinDictionary` and `Quiz` remain independent, coherent, and reusable, fulfilling the core tenets of concept design.