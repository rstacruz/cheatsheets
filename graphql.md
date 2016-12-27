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

### Variables

```js
{ hero(id: $id) }  // Query
---
{ id: '1000' }     // Variables
```

### Operation name

Just to make things less ambiguous.

```js
query FindHero($id: String) {
  hero(id: $id) { name }
}
```

### Mutations

Mutations are just fields that do something when queried.

```js
{ createReview($review) { id } }  // Query
---
{ review: { stars: 5 } }          // Variables
// → { createReview: { id: 5291 } }
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


References
----------

- <http://graphql.org/learn/queries/>
- <http://graphql.org/learn/serving-over-http/>
