---
title: GraphQL
layout: 2017/sheet
updated: 2019-07-07
category: API
---

## Intro

## Queries
{: .-three-column}

### Basic query

```js
{ status }
```

#### ↓

```js
{ status: 'available' }
```
{: .-setup}

### Nesting

```js
{ hero { name height } }
```

#### ↓

```js
{ hero:
    { name: "Luke Skywalker",
      height: 1.74 } }
```
{: .-setup}

### Lists

```js
{ friends { name } }
```

#### ↓

```js
{ friends:
    [ { name: "Luke Skywalker" },
      { name: "Han Solo" },
      { name: "R2D2" } ] }
```
{: .-setup}

GraphQL queries look the same for both single items or lists of items.

### Lookups

```js
{
  hero(id: "1000") { id name }
}
```

#### ↓

```js
{ hero:
    { id: "1000",
    { name: "Luke Skywalker" } }
```
{: .-setup}

### Aliases

```js
{
  luke: hero(id: "1000") { name }
  han: hero(id: "1001") { name }
}
```

#### ↓

```js
{ luke:
    { name: "Luke Skywalker" },
    han:
    { name: "Han Solo" } }
```
{: .-setup}

### Operation names and variables

#### Query
```js
query FindHero($id: String!) {
  hero(id: $id) { name }
}
```

Just to make things less ambiguous. Also, to use variables, you need an operation name.

#### Variables

```js
{ id: '1000' }
```

### Mutations

#### Query

```js
{ createReview($review) { id } }
```

#### Variables

```js
{ review: { stars: 5 } }
```

#### ↓

```js
{ createReview: { id: 5291 } }
```

Mutations are just fields that do something when queried.

### Multiple types

```js
{
  search(q: "john") {
    id
    ... on User { name }
    ... on Comment { body author { name } }
  }
}
```

Great for searching.


Over HTTP
---------

#### GET

```js
fetch('http://myapi/graphql?query={ me { name } }')
```

#### POST

```js
fetch('http://myapi/graphql', {
  body: JSON.stringify({
    query: '...',
    operationName: '...',
    variables: { ... }
  })
})
```

Schema
------
{: .-three-column}

### Basic schemas

```js
type Query {
  me: User
  users(limit: Int): [User]
}

type User {
  id: ID!
  name: String
}
```

See: [sogko/graphql-shorthand-notation-cheat-sheet](https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png)

### Built in types

#### Scalar types

| `Int` | Integer |
| `Float` | Float |
| `String` | String |
| `Boolean` | Boolean |
| `ID` | ID |

#### Type definitions

| `scalar` | Scalar type |
| `type` | Object type |
| `interface` | Interface type |
| `union` | Union type |
| `enum` | Enumerable type |
| `input` | Input object type |

#### Type modifiers

| `String` | Nullable string |
| `String!` | Required string |
| `[String]` | List of strings |
| `[String]!` | Required list of strings |
| `[String!]!` | Required list of required strings |

### Mutations

```js
type Mutation {
  users(params: ListUsersInput) [User]!
}
```

### Interfaces

```js
interface Entity {
  id: ID!
}

type User implements Entity {
  id: ID!
  name: String
}
```

### Enums

```js
enum DIRECTION {
  LEFT
  RIGHT
}

type Root {
  direction: DIRECTION!
}
```
{: data-line="1,2,3,4"}

### Unions

```js
type Artist { ··· }
type Album { ··· }

union Result = Artist | Album

type Query {
  search(q: String) [Result]
}
```
{: data-line="4"}

References
----------

- <http://graphql.org/learn/queries/>
- <http://graphql.org/learn/serving-over-http/>
