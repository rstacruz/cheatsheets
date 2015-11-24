---
title: Flow
---

### Simple failing example

```js
/* @flow */

function foo(x) { return x * 10; }
foo('Hello, world!');
```

### Annotations

```js
// Simple
function foo(x: string, y: number): string { ... }

// Arrays
function total(numbers: Array<number>) { ... }
```
