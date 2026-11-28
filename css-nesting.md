---
title: How to nest CSS rules
link_title: CSS nesting
subtitle: Nest selectors without Sass
logo: { src: /assets/logos/css.svg, mono: true }
category: CSS
layout: snippet
last_verified_with: "CSS Nesting Module Level 1."
updated: 2026-11-28
tier: t3
links:
  - title: MDN CSS nesting
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using
  - title: Nesting selector
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Nesting_selector
---

## Nesting
<!-- {: .-snippets} -->

### Descendant selector
<!-- {: .-snippet} -->

```css
.card {
  padding: 1rem;

  .title {
    font-weight: bold;
  }
}
```
<!-- {: data-highlight=".title"} -->

**Nests a descendant rule.** The browser reads this as `.card .title`, so no preprocessor is needed; see [nested selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using).

### State on the parent
<!-- {: .-snippet} -->

```css
.button {
  color: black;

  &:hover {
    color: tomato;
  }
}
```
<!-- {: data-highlight="&:hover"} -->

**Nests a parent pseudo-class.** `&` resolves to the outer selector, so this becomes `.button:hover`. See [nesting selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Nesting_selector).

### Compound selector
<!-- {: .-snippet} -->

```css
.card {
  &.featured {
    border: 2px solid gold;
  }
}
```
<!-- {: data-highlight="&.featured"} -->

**Joins classes on one element.** Without `&`, the nested selector gets a space and matches a descendant instead. See [compound selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using#compound_selectors).

### Media query
<!-- {: .-snippet} -->

```css
.card {
  padding: 1rem;

  @media (width >= 40rem) {
    padding: 2rem;
  }
}
```
<!-- {: data-highlight="@media (width >= 40rem)"} -->

**Nests a breakpoint.** The at-rule wraps the parent rule, keeping responsive rules next to the component; see [nested at-rules](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/At-rules).

### Sibling combinator
<!-- {: .-snippet} -->

```css
.card {
  & + & {
    margin-top: 1rem;
  }
}
```
<!-- {: data-highlight="& + &"} -->

**Styles a following card.** `& + &` matches any `.card` that immediately follows another `.card`. See [combinators](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using#combinators).
