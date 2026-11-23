---
title: How to use CSS pseudo-classes
link_title: CSS pseudo-classes
subtitle: Style elements by state
category: CSS
layout: snippet
last_verified_with: "Selectors Level 4."
updated: 2026-11-24
links:
  - title: MDN pseudo-classes
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
  - title: Selectors Level 4
    url: https://www.w3.org/TR/selectors-4/
---

## Pseudo-classes
<!-- {: .-snippets} -->

### Hover and focus
<!-- {: .-snippet} -->

```css
a:hover {
  text-decoration: underline;
}

a:focus-visible {
  outline: 2px solid blue;
}
```
<!-- {: data-highlight=":focus-visible"} -->

**Adds a focus ring for keyboard users.** `:focus-visible` matches when the browser wants a visible focus ring; mouse clicks on links and buttons do not trigger it; see [pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes).

### First and last child
<!-- {: .-snippet} -->

```css
li:first-child {
  margin-top: 0;
}

li:last-child {
  margin-bottom: 0;
}
```
<!-- {: data-highlight=":first-child; :last-child"} -->

**Removes outer margin on the first and last item.** Both match only when the element is the first or last child of its parent; see [:first-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child).

### Odd rows
<!-- {: .-snippet} -->

```css
tr:nth-child(odd) {
  background: #f6f6f6;
}
```
<!-- {: data-highlight=":nth-child(odd)"} -->

**Zebras a table.** `odd` can also be written `2n+1`, and `even` or `2n` pick the other rows; see [:nth-child()](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child).

### Invalid fields after interaction
<!-- {: .-snippet} -->

```css
input:user-invalid {
  border-color: red;
}
```
<!-- {: data-highlight=":user-invalid"} -->

**Styles invalid fields once the user interacts.** `:user-invalid` matches only after the user edits or submits the form, so untouched fields are not marked invalid on load; see [:user-invalid](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid).

### Parent selector
<!-- {: .-snippet} -->

```css
.card:has(img) {
  padding: 0;
}
```
<!-- {: data-highlight=":has(img)"} -->

**Styles a parent based on its children.** `:has()` takes a relative selector, so `:has(img)` matches an element containing an image; see [:has()](https://developer.mozilla.org/en-US/docs/Web/CSS/:has).

### Zero specificity
<!-- {: .-snippet} -->

```css
:where(h1, h2, h3) {
  margin-block: 0;
}
```
<!-- {: data-highlight=":where(h1, h2, h3)"} -->

**Styles selectors with zero specificity.** `:where()` groups selectors without adding weight, while `:is()` takes the specificity of its most specific argument; see [:where()](https://developer.mozilla.org/en-US/docs/Web/CSS/:where).
