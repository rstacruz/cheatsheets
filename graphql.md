---
title: GraphQL
subtitle: API query language
updated: 2026-11-23
last_verified_with: "GraphQL specification, graphql.org guides."
category: API
---

## Queries

<!-- {: .-three-column} -->

### Basic query

```js
{ status }
```

#### Result

```js
{ status: 'available' }
```

<!-- {: .-setup} -->

### Nesting

```js
{ hero { name height } }
```

#### Result

```js
{ hero:
    { name: "Luke Skywalker",
      height: 1.74 } }
```

<!-- {: .-setup} -->

### Lists

```js
{ friends { name } }
```

#### Result

```js
{ friends:
    [ { name: "Luke Skywalker" },
      { name: "Han Solo" },
      { name: "R2D2" } ] }
```

<!-- {: .-setup} -->

GraphQL queries look the same for both single items or lists of items.

### Lookups

```js
{
  hero(id: "1000") { id name }
}
```

#### Result

{ hero:
    { id: "1000",
      name: "Luke Skywalker" } }

<!-- {: .-setup} -->

### Aliases

```js
{
  luke: hero(id: "1000") { name }
  han: hero(id: "1001") { name }
}
```

#### Result

```js
{ luke:
    { name: "Luke Skywalker" },
    han:
    { name: "Han Solo" } }
```

<!-- {: .-setup} -->

### Operation names and variables

#### Query

```js
query FindHero($id: ID!) {
  hero(id: $id) { name }
}
```

#### Variables

```js
{ id: "1000" }
```

The operation type is required to declare variables; naming it is optional but helps debugging.

### Mutations

#### Query

```js
mutation CreateReview(
  $review: ReviewInput!
) {
  createReview(review: $review) { id }
}
```

#### Variables

```js
{ review: { stars: 5 } }
```

#### Result

```js
{ createReview: { id: 5291 } }
```

Only top-level `Mutation` fields may cause side effects; they run in series.

### Multiple types

```js
{
  search(q: "john") {
    id
    ... on User { name }
    ... on Comment {
      body
      author { name }
    }
  }
```

Great for searching.


Over HTTP
---------

#### GET

```js
const q = encodeURIComponent(
  '{ me { name } }'
)
fetch(`http://myapi/graphql?query=${q}`)
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

<!-- {: .-three-column} -->

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

| Type | Description |
| --- | --- |
| `Int` | Integer |
| `Float` | Float |
| `String` | String |
| `Boolean` | Boolean |
| `ID` | ID |

#### Type definitions

| Definition | Description |
| --- | --- |
| `scalar` | Scalar type |
| `type` | Object type |
| `interface` | Interface type |
| `union` | Union type |
| `enum` | Enumerable type |
| `input` | Input object type |

#### Type modifiers

| Syntax | Description |
| --- | --- |
| `String` | Nullable string |
| `String!` | Required string |
| `[String]` | List of strings |
| `[String]!` | Required list of strings |
| `[String!]!` | Required list of required strings |

### Mutations

```js
type Mutation {
  users(params: ListUsersInput): [User]!
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

<!-- {: data-highlight="enum"} -->

### Unions

```js
type Artist { ··· }
type Album { ··· }

union Result = Artist | Album

type Query {
  search(q: String): [Result]
}
```

<!-- {: data-highlight="union"} -->

References
----------

- <https://graphql.org/learn/queries/>
- <https://graphql.org/learn/serving-over-http/>
