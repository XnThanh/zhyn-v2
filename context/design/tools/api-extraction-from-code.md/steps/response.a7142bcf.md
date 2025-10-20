---
timestamp: 'Mon Oct 20 2025 01:11:18 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251020_011118.278b003d.md]]'
content_id: a7142bcf8bfb02a18c11826b03a2db12371eaec73b56389d2036a19dc332a903
---

# response:

````markdown
# API Specification: ZhuyinDictionary Concept

**Purpose:** tracks the Zhuyin Representation of Characters

---

## API Endpoints

### POST /api/ZhuyinDictionary/register

**Description:** Registers a new Chinese character and its Zhuyin representation.

**Requirements:**
- Character doesn't already exist in CharacterEntries

**Effects:**
- Create new CharacterEntry with given Character and ZhuyinRep

**Request Body:**
```json
{
  "character": "string",
  "zhuyinRep": "string"
}
````

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

***

### POST /api/ZhuyinDictionary/unregister

**Description:** Unregisters an existing Chinese character and its Zhuyin representation.

**Requirements:**

* Character already exist in CharacterEntries

**Effects:**

* Remove CharacterEntry associated with Character

**Request Body:**

```json
{
  "character": "string"
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

***

### POST /api/ZhuyinDictionary/getAnswer

**Description:** Retrieves the Zhuyin representation for a given Chinese character.

**Requirements:**

* Character already exist in CharacterEntries

**Effects:**

* Returns the ZhuyinRep associated with the Character

**Request Body:**

```json
{
  "character": "string"
}
```

**Success Response Body (Action):**

```json
{
  "zhuyinRep": "string"
}
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/ZhuyinDictionary/lookupZhuyin

**Description:** Looks up characters by their Zhuyin representation, supporting full or partial prefix matches.

**Requirements:**

* (Implicit: none beyond valid input type)

**Effects:**

* Returns a list of all Characters whose Zhuyin representation matches ZhuyinRep. The pattern can be a full Zhuyin string or a partial prefix.

**Request Body:**

```json
{
  "zhuyinRep": "string"
}
```

**Success Response Body (Action):**

```json
{
  "characters": [
    "string"
  ]
}
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***
