---
timestamp: 'Mon Oct 20 2025 01:11:18 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251020_011118.278b003d.md]]'
content_id: 00159b2e0c8b697079ecb313d89a90968bbc76b5cbf9ee9604f503668a6ce81f
---

# API Specification: LevelMap Concept

**Purpose:** generate sentences tailored to a User's level

***

## API Endpoints

### POST /api/LevelMap/createLevel

**Description:** Creates a new learning level with a given name and an empty set of characters.

**Requirements:**

* levelName not already existing Level

**Effects:**

* Create new Level with levelName and empty set of Characters

**Request Body:**

```json
{
  "levelName": "string"
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

### POST /api/LevelMap/addCharacter

**Description:** Adds a character to a specified learning level.

**Requirements:**

* Character not already in Level

**Effects:**

* Associate Character to Level

**Request Body:**

```json
{
  "levelName": "string",
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

### POST /api/LevelMap/removeCharacter

**Description:** Removes a character from a specified learning level.

**Requirements:**

* Character in Level

**Effects:**

* Remove Character from Level

**Request Body:**

```json
{
  "levelName": "string",
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

### POST /api/LevelMap/generateSentences

**Description:** Generates a list of Chinese sentences tailored to a specific learning level and topic, using only allowed characters.

**Requirements:**

* (Implicit: none beyond valid input type)

**Effects:**

* Get Characters in Level
* Use LLM to generate a set of sentences on given topic using only characters in that Level.
* LLM takes a list of characters in Level and a topic.
* Generates valid sentences and Return sentences.

**Request Body:**

```json
{
  "levelName": "string",
  "topic": "string"
}
```

**Success Response Body (Action):**

```json
{
  "sentences": [
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

```
```
