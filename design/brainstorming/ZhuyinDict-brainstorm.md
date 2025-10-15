[@concept-design-overview](../background/concept-design-overview.md)

[@concept-specifications](../background/concept-specifications.md)

[@implementing-concepts](../background/implementing-concepts.md)

[@ZhuyinDictionary](../concepts/Zhyn/ZhuyinDictionary.md)

[@LevelMap](../concepts/Zhyn/LevelMap.md)

# previous prompt: My ZhuyinDictionary seems to be merely a data structure. Is there any functionality that can be added to that data structure?
# previous response:

You've hit on a crucial point in concept design! A concept isn't just a data structure; it's a **reusable unit of user-facing functionality that serves a well-defined and intelligible purpose.** Your current `ZhuyinDictionary` leans heavily towards being a data repository with CRUD-like operations, rather than a dynamic, user-centric behavior.

Let's break down why it feels like a data structure and then explore how to transform it into a more robust concept by leveraging its *principle*.

### Why it feels like a data structure:

1.  **Purpose vs. Principle Mismatch:**
    *   **Purpose:** "tracks the Zhuyin Representation of Characters" - This is descriptive of *what it stores*, not *what it enables* for a user.
    *   **Principle:** "each generate creates a random sentence with Chinese characters suitable to User level" - This is very active and user-focused! It implies much more than just tracking data.

2.  **Actions are Low-Level:** `register`, `unregister`, `getAnswer` are typical data management operations. While necessary for *populating* the dictionary, they don't represent the core "user-facing functionality" that fulfills the principle. A user typically doesn't "register a character" with their dictionary directly; they use the dictionary to *learn* or *practice*.

### How to add functionality and make it a true Concept:

The `principle` you've already defined is the key! It clearly points towards a *learning or practice* functionality. Let's make that the core purpose and build actions around it.

**The core idea:** Instead of just *storing* Zhuyin, the concept should *provide materials and tools* for learning and practicing Zhuyin.

Here's how we can refine your `ZhuyinDictionary` concept:

---

### Revised Concept Specification: ZhuyinPractice

Let's rename it to something that reflects its active purpose, like `ZhuyinPractice` or `ZhuyinLearningMaterial`.

**concept** ZhuyinPractice \[User, DifficultyLevel]

**purpose** To provide personalized practice materials and lookup services for learning Chinese character Zhuyin.

**principle** If a user requests practice material for their current learning level, the concept generates a new sentence using characters appropriate for that level, along with their Zhuyin, allowing the user to practice recognition or recall.

**state**
  a set of Characters with
    a zhuyinRep: String
    a difficulty: DifficultyLevel // e.g., Beginner, Intermediate, Advanced
  a set of SentenceTemplates with
    a text: String // e.g., "The {adjective} {noun} is {verb}."
    a characterPlaceholders: set of Character

**actions**

  // Core user-facing action based on the principle
  generatePracticeSentence (userLevel: DifficultyLevel): (sentenceText: String, characterZhuyinMap: Map<Character, String>)
    **requires** there exists at least one SentenceTemplate and characters suitable for the userLevel
    **effects** returns a sentence (generated from a template or pre-defined corpus) where all characters are appropriate for the `userLevel`, along with their associated Zhuyin representations.

  // User-facing lookup, previously getAnswer
  lookupZhuyin (character: Character): (zhuyin: String)
    **requires** Character exists in the dictionary
    **effects** returns the ZhuyinRep associated with the Character

  // System/Admin actions to manage the dictionary content
  system addCharacterMapping (character: Character, zhuyinRep: String, difficulty: DifficultyLevel): (error: String) or ()
    **requires** Character doesn't already exist
    **effects** adds Character and associates with `zhuyinRep` and `difficulty`. If character already exists, returns an error.

  system updateCharacterMapping (character: Character, newZhuyinRep: String, newDifficulty: DifficultyLevel): (error: String) or ()
    **requires** Character already exists
    **effects** updates the ZhuyinRep and difficulty for the given Character. If character doesn't exist, returns an error.

  system removeCharacterMapping (character: Character): (error: String) or ()
    **requires** Character already exists
    **effects** removes Character and its corresponding ZhuyinRep and difficulty. If character doesn't exist, returns an error.

  // Potentially, if the concept also manages sentence templates
  system addSentenceTemplate (templateText: String, requiredCharacters: set of Character): (templateID: ID)
    **requires** templateText is unique
    **effects** adds a new sentence template for generation.

---

### Explanation of Changes:

1.  **New Purpose:** It clearly states *what it does for the user* (provide practice, lookup) rather than just *what it contains*.
2.  **Expanded State:**
    *   We added a `difficulty` level to each character, directly supporting the "suitable to User level" aspect of the principle.
    *   We added `SentenceTemplates` or implied a corpus of sentences to enable the `generatePracticeSentence` action. This moves beyond simple character mapping to something that facilitates practice.
3.  **New Core Action: `generatePracticeSentence`**:
    *   This action directly implements the `principle`. It's a high-level, user-facing action.
    *   It takes `userLevel` as an argument. This `userLevel` would likely be provided by another concept (e.g., `UserLearningProfile`) via a `sync`.
4.  **Renamed `getAnswer` to `lookupZhuyin`**: More descriptive for a dictionary lookup.
5.  **Demoted CRUD to `system` actions**: `addCharacterMapping`, `updateCharacterMapping`, `removeCharacterMapping` are now explicitly marked `system` actions. This signifies they are typically performed by an administrator, an automated process, or another system concept, rather than directly by an end-user to fulfill the primary purpose. This clearly separates content management from content consumption/practice.
6.  **Error Handling in Actions:** Explicitly showing how errors can be returned.
7.  **Polymorphism Hinted:** `User` and `DifficultyLevel` are now generic type parameters, meaning this concept doesn't assume their internal structure, allowing it to be reused with various user concepts or difficulty schemas.

### How it's no longer "merely a data structure":

*   It *actively generates* useful content (`generatePracticeSentence`).
*   Its purpose is tied to a *user need* (learning/practicing).
*   It combines and orchestrates different pieces of information (characters, Zhuyin, difficulty, sentence templates) to deliver a coherent, valuable *experience*.

This revised `ZhuyinPractice` concept is now a much stronger, more modular piece of functionality that clearly serves a purpose in an application focused on language learning.

# prompt: I already have a generate sentence and level mapping feature in a different concept. I wanted to keep the two concepts separate. What other functionality can i add to ZhuyinDictionary without overlapping my other concepts.
# response:

You're absolutely right to want to keep concepts separate! That's a cornerstone of concept design. My previous suggestion for `ZhuyinPractice` conflated the dictionary's core purpose with a "practice/learning" concern, which clearly overlaps with your existing `LevelMap` concept's responsibility for generating level-tailored sentences.

The key is to make `ZhuyinDictionary` a truly **authoritative and comprehensive source of character-to-Zhuyin mappings**, and to focus on the functionality a user would expect from a *dictionary* in isolation, without any knowledge of "levels" or "sentence generation."

Let's refine `ZhuyinDictionary` to embody this independent, dictionary-centric purpose.

---

### Revised Concept Specification: ZhuyinDictionary (Independent)

**concept** ZhuyinDictionary \[Character]

**purpose** To serve as a comprehensive and authoritative repository for Chinese character to Zhuyin mappings, enabling efficient lookup and systematic exploration of character pronunciations.

**principle** When a user encounters an unfamiliar character, they can query the dictionary to instantly retrieve its correct Zhuyin representation. Additionally, they can explore collections of characters by their Zhuyin patterns or browse the entire dictionary, enhancing their understanding of pronunciation families without external context.

**state**
a set of Characters with
  a zhuyinRep: String
    // We can also add other foundational character data here if it's
    // universally applicable and doesn't introduce other concept concerns.
    // e.g., 'pinyinRep: String', 'strokeCount: Number', 'radical: String',
    // 'simplifiedForm: Character', 'traditionalForm: Character', etc.
    // For now, let's keep it minimal as originally.

**actions**

// --- System/Admin actions for managing the dictionary's core data (CRUD) ---
// These are typically performed by an administrator, an automated process,
// or another system concept, not directly by an end-user in most apps.

system addCharacterMapping (character: Character, zhuyinRep: String): (error: String) or ()
**requires** Character doesn't already exist in the dictionary
**effects** Adds the `character` and associates it with the provided `zhuyinRep`. If the character already exists, returns an error.

system updateCharacterMapping (character: Character, newZhuyinRep: String): (error: String) or ()
**requires** Character already exists in the dictionary
**effects** Updates the `zhuyinRep` for the given `character`. If the character doesn't exist, returns an error.

system removeCharacterMapping (character: Character): (error: String) or ()
**requires** Character already exists in the dictionary
**effects** Removes the `character` and its corresponding `zhuyinRep` from the dictionary. If the character doesn't exist, returns an error.

// --- User-facing lookup and exploration actions ---
// These are the core functionalities a user would perform with a dictionary.

lookupZhuyin (character: Character): (zhuyin: String) or (error: String)
**requires** Character exists in the dictionary
**effects** Returns the `zhuyinRep` associated with the `character`. If the character is not found, returns an error.
    *(This is your `getAnswer` action, made more robust with explicit error handling.)*

lookupCharactersByZhuyin (zhuyinPattern: String): (characters: Character[])
**requires** true
**effects** Returns a list of all `Characters` whose Zhuyin representation matches the `zhuyinPattern`. The pattern can be a full Zhuyin string, a partial prefix, or even support wildcards for more advanced search. This allows users to find all characters with a specific pronunciation.

getAllCharacters (limit: Number = 100, offset: Number = 0): (characters: Character[])
**requires** true
**effects** Returns a paginated list of all `Characters` present in the dictionary. This enables browsing or for other concepts (like `LevelMap`) to retrieve the entire set of available characters for their own processing. The order should be consistent (e.g., Unicode order).

getRandomCharacter(): (character: Character, zhuyinRep: String) or (error: String)
**requires** The dictionary is not empty
**effects** Returns a randomly selected `Character` and its `zhuyinRep` from the entire dictionary. This provides a simple, level-agnostic way for other concepts to pick a character for various purposes (e.g., a "daily character" feature, or a simple flashcard without levels).

---

### Why these changes maintain independence and enhance functionality:

1.  **Refocused Purpose & Principle:** They now clearly define `ZhuyinDictionary` as a standalone reference, dedicated to storing and providing Zhuyin mappings. There's no mention of "user level," "practice," or "sentence generation" – those concerns belong to `LevelMap`.
2.  **No Type Parameters for `User` or `DifficultyLevel`:** This concept remains entirely ignorant of users or learning levels. It only deals with `Character` types and their Zhuyin.
3.  **Enhanced Lookup:**
    *   `lookupZhuyin`: The primary, direct lookup.
    *   `lookupCharactersByZhuyin`: This is a fundamental dictionary feature. Given a pronunciation, what characters match? This is distinct from providing characters based on a user's learning level.
4.  **Exploration Actions:**
    *   `getAllCharacters`: Provides a way to browse or retrieve the entire contents of the dictionary. This could be used by `LevelMap` to get a base set of characters to then *assign* to levels, but `ZhuyinDictionary` itself doesn't know about the levels.
    *   `getRandomCharacter`: A useful utility for sampling the dictionary's content without any filtering by difficulty or user context. It's a simple selection from its *entire* collection.
5.  **Clear Separation of Concerns:**
    *   **`ZhuyinDictionary`'s concern:** What is the Zhuyin for this character? What characters have this Zhuyin? What characters are in the dictionary?
    *   **`LevelMap`'s concern:** Which characters are appropriate for Level X? How can I generate a sentence using only characters for Level Y?
6.  **Composition by Synchronization:**
    *   `LevelMap` would use `ZhuyinDictionary.lookupZhuyin(character)` for any character it selects for a sentence, to get its pronunciation.
    *   `LevelMap` might use `ZhuyinDictionary.getAllCharacters()` to get a master list of characters from which to build its `Level` mappings.

This revised `ZhuyinDictionary` is now a focused, reusable, and independent concept that provides robust, dictionary-like functionality without stepping on the toes of your `LevelMap` concept.