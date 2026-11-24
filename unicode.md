---
title: Unicode symbols
category: Others
subtitle: Reference for symbol codepoints
updated: 2026-11-24
last_verified_with: "Unicode 18.0.0 charts."
---

## Symbols

### Common symbols

| Code | Symbol | Name |
| --- | --- | --- |
| `U+2708` | ✈ | airplane |
| `U+2744` | ❄ | snowflake |
| `U+2691` | ⚑ | black flag |
| `U+2690` | ⚐ | white flag |
| `U+262F` | ☯ | yin yang |
| --- | --- | --- |
| `U+265E` | ♞ | black knight |
| `U+2600` | ☀ | black sun with rays |
| `U+26A0` | ⚠ | warning sign |
| `U+2605` | ★ | black star |
| `U+2606` | ☆ | white star |
<!-- {: .-headers} -->

### Bullets

| Code | Symbol | Name |
| --- | --- | --- |
| `U+2022` | • | bullet |
| `U+00B7` | · | middle dot |
| `U+25E6` | ◦ | white bullet |
| `U+2504` | ┄ | triple dash |
| `U+2014` | — | em dash |
| `U+2013` | – | en dash |
<!-- {: .-headers} -->

### Checks

| Code | Symbol | Name |
| --- | --- | --- |
| `U+2713` | ✓ | check mark |
| `U+2715` | ✕ | multiplication x |
| `U+2717` | ✗ | ballot x |
| `U+2718` | ✘ | heavy ballot x |
| `U+274F` | ❏ | shadowed square |
| `U+00D7` | × | multiplication sign |
<!-- {: .-headers} -->

### Quotes

| Code | Symbol | Name |
| --- | --- | --- |
| `U+00AB` | « | double angle left |
| `U+00BB` | » | double angle right |
| `U+2039` | ‹ | single angle left |
| `U+203A` | › | single angle right |
<!-- {: .-headers} -->

### Spinners

| Frames | Style |
| --- | --- |
| `◜◠◝◞◡◟` | Arc spinner |
| `❘❙❚` | Tick spinner |
<!-- {: .-headers} -->

## Shapes

### Triangles

| Code | Symbol | Name |
| --- | --- | --- |
| `U+25B2` | ▲ | up |
| `U+25BC` | ▼ | down |
| `U+25B6` | ▶ | right |
| `U+25B8` | ▸ | right small |
| --- | --- | --- |
| `U+25E2` | ◢ | lower right |
| `U+25E3` | ◣ | lower left |
| `U+25E4` | ◤ | upper left |
| `U+25E5` | ◥ | upper right |
<!-- {: .-headers} -->

### Arrows

| Code | Symbol | Name |
| --- | --- | --- |
| `U+2B05` | ⬅ | left |
| `U+2B06` | ⬆ | up |
| `U+2B07` | ⬇ | down |
| `U+27A1` | ➡ | right |
| `U+2192` | → | right thin |
| `U+2B95` | ⮕ | right heavy |
<!-- {: .-headers} -->

### Circles and diamonds

| Code | Symbol | Name |
| --- | --- | --- |
| `U+25CF` | ● | black circle |
| `U+25CB` | ○ | white circle |
| `U+25D0` | ◐ | left half |
| `U+25D1` | ◑ | right half |
| --- | --- | --- |
| `U+25D2` | ◒ | lower half |
| `U+25D3` | ◓ | upper half |
| `U+25C7` | ◇ | white diamond |
| `U+25C6` | ◆ | black diamond |
<!-- {: .-headers} -->

### Suits and marks

| Code | Symbol | Name |
| --- | --- | --- |
| `U+2660` | ♠ | spade |
| `U+2663` | ♣ | club |
| `U+2665` | ♥ | heart |
| `U+2666` | ♦ | diamond |
| `U+2661` | ♡ | white heart |
| --- | --- | --- |
| `U+2702` | ✂ | scissors |
| `U+2709` | ✉ | envelope |
| `U+270E` | ✎ | pencil |
| `U+2699` | ⚙ | gear |
| `U+2139` | ℹ | information |
<!-- {: .-headers} -->

## Keyboard

### Modifier keys

| Code | Symbol | Name |
| --- | --- | --- |
| `U+2318` | ⌘ | command |
| `U+2325` | ⌥ | option |
| `U+21E7` | ⇧ | shift |
| `U+21EA` | ⇪ | caps lock |
<!-- {: .-headers} -->

### Editing keys

| Code | Symbol | Name |
| --- | --- | --- |
| `U+238B` | ⎋ | escape |
| `U+23CE` | ⏎ | return |
| `U+232B` | ⌫ | delete |
<!-- {: .-headers} -->

## Codepoints

### JavaScript

#### Codepoint

```js
'☆'.codePointAt(0).toString(16) // '2606'
```

#### From a codepoint

```js
String.fromCodePoint(0x2605) // '★'
'\u2606' // '☆'
```

`codePointAt` reads every codepoint; `charCodeAt` splits astral ones into surrogate halves.

### HTML references

```html
&#x2605; <!-- ★ -->
&#9733;  <!-- ★ -->
```

Both forms work in HTML. See the [named character references](https://html.spec.whatwg.org/multipage/named-characters.html) for the full list.
