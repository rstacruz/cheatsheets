---
title: GraphQL
category: Misc
---

## Queries

```js
{ status }
// → { status: 'available' }
```

### Nesting

```js
{ hero { name height } }
// → { hero:
//     { name: "Luke Skywalker",
//       height: 1.74 } }
```

### Lists
GraphQL queries look the same for both single items or lists of items.

```js
{ friends { name } }
// → { friends:
//     [ { name: "Luke Skywalker" },
//       { name: "Han Solo" },
//       { name: "R2D2" } ] }
```
### Lookups

```js
{
  hero(id: "1000") { id name }
}
// → { hero:
//     { id: "1000",
//     { name: "Luke Skywalker" } }
```

### Aliases

```js
{
  luke: hero(id: "1000") { name }
  han: hero(id: "1001") { name }
}
// → { luke:
//     { name: "Luke Skywalker" },
//     han:
//     { name: "Han Solo" } }
```

### Operation names and variables

Just to make things less ambiguous. Also, to use variables, you need an operation name.

```js
query FindHero($id: String!) {
  hero(id: $id) { name }
}
---
{ id: '1000' }     // Variables
```

### Mutations

Mutations are just fields that do something when queried.

```js
{ createReview($review) { id } }  // Query
---
{ review: { stars: 5 } }          // Variables
// → { createReview: { id: 5291 } }
```

### Multiple types

Great for searching.

```js
{
  search(q: "john") {
    id
    ... on User { name }
    ... on Comment { body author { name } }
  }
}
```

Over HTTP
---------

```js
// Get
fetch('http://myapi/graphql?query={me{name}')
```

### POST

```js
// Post
fetch('http://myapi/graphql', {
  body: JSON.stringify({
    query: "...",
    operationName: "...",
    "variables": { ... }
  })
})
```

Schema
------

See: <https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png>

References
----------

- <http://graphql.org/learn/queries/>
- <http://graphql.org/learn/serving-over-http/>
