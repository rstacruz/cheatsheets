---
title: GraphQL
subtitle: API query language
logo: { src: /assets/logos/graphql.svg }
created_at: 2016-12-28
updated: 2026-11-23
last_verified_with: "GraphQL specification, graphql.org guides."
tier: t3
category: API
intro: |
  [GraphQL](https://graphql.org/) is a query language for APIs. This sheet covers queries, HTTP requests, mutations, and schema types.
links:
  - title: GraphQL
    url: https://graphql.org/
  - title: GraphQL specification
    url: https://spec.graphql.org/September2026/
  - title: GraphQL learn
    url: https://graphql.org/learn/
---

## Queries

<!-- {: .-three-column} -->

### Basic query

```js
{ status }
```
<!-- {: data-highlight="status"} -->

#### Result

```js
{ status: 'available' }
```

See: [GraphQL operations](https://spec.graphql.org/September2026/#sec-Language.Operations)

### Nesting

```js
{ hero { name height } }
```
<!-- {: data-highlight="hero"} -->

#### Result

```js
{ hero: { name: "Luke Skywalker",
          height: 1.74 } }
```

See: [Fields](https://spec.graphql.org/September2026/#sec-Language.Fields)

### Lists

```js
{ friends { name } }
```
<!-- {: data-highlight="friends"} -->

#### Result

```js
{ friends: [ { name: "Luke Skywalker" },
            { name: "Han Solo" },
            { name: "R2D2" } ] }
```

GraphQL queries look the same for both single items or lists of items.

See: [List type](https://spec.graphql.org/September2026/#sec-List)

### Lookups

```js
{
  hero(id: "1000") { id name }
}
```
<!-- {: data-highlight="hero(id:"} -->

#### Result

```js
{ hero: { id: "1000",
          name: "Luke Skywalker" } }
```

See: [Arguments](https://spec.graphql.org/September2026/#sec-Language.Arguments)

### Aliases

```js
{
  luke: hero(id: "1000") { name }
  han: hero(id: "1001") { name }
}
```
<!-- {: data-highlight="luke:; han:"} -->

#### Result

```js
{ luke: { name: "Luke Skywalker" },
  han: { name: "Han Solo" } }
```

See: [Field alias](https://spec.graphql.org/September2026/#sec-Field-Alias)

### Operation names and variables

#### Query

```js
query FindHero($id: ID!) {
  hero(id: $id) { name }
}
```
<!-- {: data-highlight="query FindHero"} -->

#### Variables

```js
{ id: "1000" }
```

The operation type is required to declare variables; naming it is optional but helps debugging.

See: [Operation type and name](https://graphql.org/learn/queries/#operation-type-and-name)

### Mutations

#### Query

```js
mutation CreateReview(
  $review: ReviewInput!
) {
  createReview(review: $review) { id }
}
```
<!-- {: data-highlight="mutation CreateReview"} -->

#### Variables

```js
{ review: { stars: 5 } }
```

#### Result

```js
{ createReview: { id: 5291 } }
```

Only top-level `Mutation` fields may cause side effects; they run in series.

See: [Mutation](https://spec.graphql.org/September2026/#sec-Mutation)

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
}
```
<!-- {: data-highlight="... on User; ... on Comment"} -->

Great for searching.

See: [Inline fragments](https://spec.graphql.org/September2026/#sec-Inline-Fragments)

## Over HTTP

### GET requests

```js
const q = encodeURIComponent(
  '{ me { name } }'
)
fetch(`http://myapi/graphql?query=${q}`)
```
<!-- {: data-highlight="encodeURIComponent"} -->

See: [GET requests](https://graphql.org/learn/serving-over-http/#get-request-and-parameters)

### POST requests

```js
fetch('http://myapi/graphql', {
  body: JSON.stringify({
    query: '...',
    operationName: '...',
    variables: { ... }
  })
})
```
<!-- {: data-highlight="body"} -->

See: [POST requests](https://graphql.org/learn/serving-over-http/#post-request-and-body)

## Schema

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
<!-- {: data-highlight="type Query; type User"} -->

See: [Type language](https://graphql.org/learn/schema/#type-language)

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

See: [Scalar types](https://graphql.org/learn/schema/#scalar-types)

### Mutations

```js
type Mutation {
  users(params: ListUsersInput): [User]!
}
```
<!-- {: data-highlight="type Mutation"} -->

See: [Query, Mutation, and Subscription types](https://graphql.org/learn/schema/#the-query-mutation-and-subscription-types)

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
<!-- {: data-highlight="interface Entity; implements Entity"} -->

See: [Interface types](https://graphql.org/learn/schema/#interface-types)

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

See: [Enum types](https://graphql.org/learn/schema/#enum-types)

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

See: [Union types](https://graphql.org/learn/schema/#union-types)

## References
- <https://graphql.org/learn/queries/>
- <https://graphql.org/learn/serving-over-http/>
