---
sidebar_position: 7
---

Integrations in Beaver Notes enable third-party applications to interact with the platform through our Data API. It provides functionalities for creating notes, deleting notes, and adding labels, allowing for efficient management and organization of information within Beaver Notes.


### Base URL
`http://localhost:3000`

## 1. Auth

### 1.1 Request Authentication

**Endpoint**

`POST /request-auth`

**Request Body**

```json
{
  "id": "Your ID",
  "platform": "Platform",
  "auth": ["note:add", "note:delete", "label:add"]
}
```

**Curl Example**

```sh
curl --location 'http://localhost:3000/request-auth' \
--header 'Content-Type: application/json' \
--data '{
    "id": "Your ID",
    "platform": "Platform",
    "auth": ["note:add", "note:delete", "label:add"]
}'
```

**Response**

Success: request sent!

:::info
Remember that the user will ultimately be in charge of choosing what the app can and cannot do, so make sure to handle cases where one of the 3 auth options is not available.
:::

### 1.2 Confirm Authentication

**Endpoint**

`GET /confirm-auth`

**Request Body**

```json
{
  "id": "Your ID",
  "platform": "Platform"
}
```

**Curl Example**

```sh
curl --location --request GET 'http://localhost:3000/confirm-auth' \
--header 'Authorization: Bearer your-token' \
--header 'Content-Type: application/json' \
--data '{
    "platform": "Platform",
    "id": "Your ID"
}'
```

**Response**

Success: passed

## 2. Create a New Note

**Endpoint**

`POST /add-note`

**Request Body**

```json
{
  "id": "note.id",
  "title": "Your Title",
  "content": {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "This is a sample note content."
          }
        ]
      }
    ]
  },
  "labels": [],
  "isBookmarked": false,
  "isArchived": false
}
```

**Curl Example**

```sh
curl --location 'http://localhost:3000/add-note' \
--header 'Authorization: Bearer your-token' \
--header 'Content-Type: application/json' \
--data '{
    "id": "test1",
    "title": "Sample Note",
    "content": {
        "type": "doc",
        "content": [
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "This is a sample note content."
                    }
                ]
            }
        ]
    },
    "isBookmarked": false,
    "isArchived": false
}'
```

**Response**

Success: Creating Note

## 3. Delete a Note

**Endpoint**

`POST /delete-note`

**Request Body**

```json
{
  "id": "note-id"
}
```

**Curl Example**

```sh
curl --location 'http://localhost:3000/delete-note' \
--header 'Authorization: Bearer your-token' \
--header 'Content-Type: application/json' \
--data '{
    "id": "note-id"
}'
```

**Response**

Success: Deleting Note

## 4. Add a Label

**Endpoint**

`POST /add-label`

**Request Body**

```json
{
  "id": "note-id",
  "labelId": "label-content"
}
```

**Curl Example**

```sh
curl --location 'http://localhost:3000/add-label' \
--header 'Authorization: Bearer your-token' \
--header 'Content-Type: application/json' \
--data '{
    "id": "note-id",
    "labelId": "label-content"
}'
```

**Response**

Success: Adding Label