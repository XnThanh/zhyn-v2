---
timestamp: 'Mon Oct 20 2025 00:51:02 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251020_005102.3518bb95.md]]'
content_id: d33ff44d19bc083f0a9ad2c1ca0cfa846ad524f14b0b235346e51a60994be0f2
---

# API Specification: Labeling Concept

**Purpose:** Associate labels with items and then retrieve the items that match a given label, enabling organization and filtering.

***

## API Endpoints

### POST /api/Labeling/createLabel

**Description:** Creates a new label with a specified name.

**Requirements:**

* No Label with the given `name` already exists.

**Effects:**

* Creates a new Label `l`.
* Sets the name of `l` to `name`.

**Request Body:**

```json
{
  "name": "string"
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

### POST /api/Labeling/addLabel

**Description:** Associates an existing label with a specific item.

**Requirements:**

* None specified.

**Effects:**

* Adds the specified `label` to the set of labels associated with the given `item`.

**Request Body:**

```json
{
  "item": "string",
  "label": "string"
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

### POST /api/Labeling/deleteLabel

**Description:** Removes a specific label from an item.

**Requirements:**

* None specified.

**Effects:**

* Removes the specified `label` from the set of labels associated with the given `item`.

**Request Body:**

```json
{
  "item": "string",
  "label": "string"
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
