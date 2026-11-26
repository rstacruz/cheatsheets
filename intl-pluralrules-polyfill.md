---
title: How to polyfill Intl.PluralRules
link_title: PluralRules polyfill
subtitle: For Hermes and old engines
category: Internationalization
layout: snippet
last_verified_with: "intl-pluralrules 2.0.1, Node 26.13.1."
updated: 2026-11-26
links:
  - title: intl-pluralrules on npm
    url: https://www.npmjs.com/package/intl-pluralrules
  - title: intl-pluralrules README
    url: https://github.com/eemeli/intl-pluralrules
---

## Polyfilling PluralRules
<!-- {: .-snippets} -->

### Install
<!-- {: .-snippet} -->

```sh
npm install intl-pluralrules
```
<!-- {: data-highlight="npm install"} -->

**Installs the polyfill.** It also implements `selectRange()` and fraction-digit options. See [intl-pluralrules](https://www.npmjs.com/package/intl-pluralrules).

### Import once
<!-- {: .-snippet} -->

```js
import 'intl-pluralrules'
```
<!-- {: data-highlight="intl-pluralrules"} -->

**Loads it before any translation code.** The package loads only when the native API is incomplete, then fills in methods and locale data. See [README](https://github.com/eemeli/intl-pluralrules).

### Import on Hermes
<!-- {: .-snippet} -->

```js
// App.tsx, with Hermes
import 'intl-pluralrules'
```
<!-- {: data-highlight="import 'intl-pluralrules'"} -->

**Imports the polyfill before i18next.** Without it, i18next resolves only `_one`/`_other` keys, so non-English locales break. See [React Native and Expo](https://www.i18next.com/react/react-native).

### Use the ponyfill
<!-- {: .-snippet} -->

```js
import PluralRules from
  'intl-pluralrules/plural-rules'

new PluralRules('en').select(1)
// → 'one'
```
<!-- {: data-highlight="intl-pluralrules/plural-rules"} -->

**Leaves `Intl` untouched.** The ponyfill avoids patching globals and supports `selectRange()`. See [README](https://github.com/eemeli/intl-pluralrules).
