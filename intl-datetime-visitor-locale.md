---
title: How to format a date in the user's locale in JavaScript
link_title: Date in the user's locale
subtitle: Locale-aware date output
logo: { set: icon-park-outline, name: globe }
category: Browser APIs
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
updated: 2026-11-26
links:
  - title: Intl.DateTimeFormat
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  - title: navigator.language
    url: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
---

## Locales
<!-- {: .-snippets} -->

### Omit the locale
<!-- {: .-snippet} -->

```js
new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium'
}).format(new Date(2026, 10, 26))
// → 'Nov 26, 2026' (en-US)
```
<!-- {: .-wrap data-highlight="undefined"} -->

**Falls back to the runtime's default locale.** In Node that is the `LANG` setting; in a browser it is the UI language, which is also `navigator.language`; see [locales argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).

### Offer the whole preference list
<!-- {: .-snippet} -->

```js
new Intl.DateTimeFormat(navigator.languages, {
  dateStyle: 'medium'
}).format(new Date(2026, 10, 26))
// → 'Nov 26, 2026' (en-US)
```
<!-- {: .-wrap data-highlight="navigator.languages"} -->

**Tries each tag in order and takes the first supported one.** `navigator.languages` holds the full preference list, so pass it instead of `navigator.language`; see [navigator.languages](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages).

### Check what was chosen
<!-- {: .-snippet} -->

```js
Intl.DateTimeFormat().resolvedOptions().locale
// → 'en-US'
```
<!-- {: .-wrap data-highlight="resolvedOptions().locale"} -->

**Reports the locale after negotiation and defaults.** Test translations against this value rather than assuming the browser language won; see [resolvedOptions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions).

### Keep server and client in sync
<!-- {: .-snippet} -->

```js
const fmt = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeZone: 'UTC'
})

fmt.format(new Date('2026-11-26T15:30:00Z'))
// → '26 Nov 2026'
```
<!-- {: .-wrap data-highlight="timeZone: 'UTC'"} -->

**Pinning locale and zone keeps SSR and browser output identical.** A locale read from `navigator` differs between server and client and breaks hydration; see [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).
