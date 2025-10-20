[@api-extraction-from-spec](api-extraction-from-spec.md)
[@concept-implementation](../../src/concepts/LikertSurvey/LikertSurveyConcept.ts)
# Extracting from code

The following is an explanation of how concepts are implemented, for the purposes of understanding how to extract an API.

[@implementing-concepts](../background/implementing-concepts.md)

# prompt: 

<<<<<<< HEAD
Now, analyze the following Concept Implementation and generate the API documentation based on these instructions.
# response:


# response:


# response:

# API Specification: Labeling Concept

**Purpose:** organize items by associating descriptive keywords, allowing for flexible categorization and retrieval.
=======
Please extract an API for this app from the following two concepts:

## ZhuyinDictionary

Specification:

[@ZhuyinDictionary](../../design/concepts/ZhynSpec/ZhuyinDictionary.md)

Code:

[@ZhuyinDictionaryConcept.ts](../../src/concepts/ZhuyinDictionary/ZhuyinDictionaryConcept.ts)

## Quiz

Specification:

[@Quiz](../../design/concepts/ZhynSpec/Quiz.md)

Code:

[@QuizConcept.ts](../../src/concepts/Quiz/QuizConcept.ts)

## LevelMap

Specification:

[@LevelMap](../../design/concepts/ZhynSpec/LevelMap.md)

Code:

[@LevelMapConcept.ts](../../src/concepts/LevelMap/LevelMapConcept.ts)
# response:

```markdown
# API Specification: ZhuyinDictionary Concept

**Purpose:** tracks the Zhuyin Representation of Characters
>>>>>>> cffcb86 (backend api spec)

---

## API Endpoints

### POST /api/Labeling/createLabel

**Description:** Creates a new label with the given name and returns its identifier.

**Requirements:**
- No Label with the given `name` already exists.

**Effects:**
- Creates a new Label `l`.
- Sets the name of `l` to `name`.
- Returns `l` as `label`.

**Request Body:**
```json
{
  "name": "string"
}
```

**Success Response Body (Action):**
```json
{
  "label": "ID"
}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/Labeling/addLabel

**Description:** Associates an existing label with a specific item.

**Requirements:**
- The item must exist.
- The label must exist.
- The item is not already associated with this label.

**Effects:**
- Associates the given label with the specified item.

**Request Body:**
```json
{
  "item": "ID",
  "label": "ID"
}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/Labeling/deleteLabel

**Description:** Removes the association of a label from a specific item.

**Requirements:**
- The item must exist.
- The label must exist.
- The item is currently associated with this label.

**Effects:**
- Removes the association of the given label from the specified item.

**Request Body:**
```json
{
  "item": "ID",
  "label": "ID"
}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---
