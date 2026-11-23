---
title: JSDoc import types
h1_title: How to import JSDoc types
subtitle: Type-only imports for JSDoc
category: JavaScript
layout: snippet
last_verified_with: "TypeScript 5.5."
updated: 2026-11-23
links:
  - title: JSDoc-supported types
    url: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types
  - title: TypeScript 5.5 release notes
    url: https://devblogs.microsoft.com/typescript/announcing-typescript-5-5/
---

## Importing types
<!-- {: .-snippets} -->

### Default export alias
<!-- {: .-snippet} -->

```js
/**
 * @typedef {import('./Foo').default} Bar
 */
```
<!-- {: data-highlight="@typedef"} -->

Names the default export's type `Bar` without a runtime import. See [import types](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types).

### Named import
<!-- {: .-snippet} -->

```js
/** @import { Bar } from './Foo.js' */
```
<!-- {: data-highlight="@import"} -->

TypeScript 5.5+ imports the named type `Bar` without adding a runtime import. See the [5.5 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-5/).

### Default import
<!-- {: .-snippet} -->

```js
/** @import { default as Bar } from './Foo.js' */
```
<!-- {: data-highlight="default as"} -->

Imports the default export as the type `Bar`; use this when you need an alias. See [import types](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types).
