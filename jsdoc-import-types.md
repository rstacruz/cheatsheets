---
title: How to import JSDoc types
link_title: JSDoc import types
subtitle: Type-only imports for JSDoc
logo: { set: icon-park-outline, name: file-code }
category: JavaScript
layout: snippet
last_verified_with: "TypeScript 7.0.2."
created_at: 2026-11-23
updated: 2026-11-28
tier: t3
intro: |
  TypeScript's [JSDoc import types](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types) bring type-only references into JavaScript files. This sheet shows `@typedef` aliases and `@import` syntaxes.
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

**Aliases the default export type.** Names it `Bar` without a runtime import. See [import types](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types).

### Named import
<!-- {: .-snippet} -->

```js
/** @import { Bar } from './Foo.js' */
```
<!-- {: data-highlight="@import"} -->

**Imports a named type.** It emits no runtime code; TypeScript 5.5+ supports this for `Bar`. See the [5.5 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-5/).

### Default import
<!-- {: .-snippet} -->

```js
/** @import { default as Bar } from './Foo.js' */
```
<!-- {: data-highlight="default as"} -->

**Imports the default export.** It becomes an alias when you need a named type; the alias is type-only and creates no runtime binding. See [import types](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types).
