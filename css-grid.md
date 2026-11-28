---
title: CSS Grid
subtitle: Two-dimensional layout system
logo: { set: icon-park-outline, name: grid-two }
category: CSS
last_verified_with: "CSS Grid Layout Module Levels 1 and 2."
created_at: 2018-12-07
updated: 2026-11-25
tier: t3
prism_languages: [css]
---

### Container

```css
.grid-container {
  /* Display properties */
  display: grid;
  display: inline-grid;

  /* Columns and rows */
  grid-template-columns: 1rem 2rem 1rem; /* Length units */
  grid-template-columns: 25% 50% 25%; /* Percentage units */
  grid-template-columns: 1rem auto 1rem 2fr; /* Fill extra space */
  grid-template-columns: repeat(12, 1fr); /* Repeat columns */
  grid-template-columns: subgrid; /* Parent column tracks */

  grid-template-rows: 1rem 10% auto repeat(5, 10px); /* Mix units */
  grid-template-rows: subgrid; /* Parent row tracks */

  /* Automatic columns and rows */
  grid-auto-columns: 10px; /* Implicit column width */
  grid-auto-rows: 1rem; /* Implicit row height */
}
```

See: [CSS grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout#reference)

### Container areas

```css
.grid-container {
  /* Areas */
  grid-template-areas:
    "header header"
    "main aside"
    "footer footer";

  /* Or write the areas on one line */
  grid-template-areas: "header header" "main aside" "footer footer";

  /* Template shorthand */
  grid-template:
    "header header" auto
    "main aside" 100vh
    "footer footer" 10rem
    / 80% 20%;

  /* The above is the same as below long-hand */
  grid-template-columns: 80% 20%;
  grid-template-rows: auto 100vh 10rem;
  grid-template-areas:
    "header header"
    "main aside"
    "footer footer";

  /* Gaps */
  grid-row-gap: 1rem;
  grid-column-gap: 0.5rem; /* Define values separately */

  grid-gap: 1rem 0.5rem; /* Short-hand for row / column */
  grid-gap: 1rem; /* Gap in both dimensions */
}
```

See: [CSS grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout#reference)

### Container item alignment

```css
.grid-container {
  /* Item justification (horizontal or column alignment) */
  justify-items: start; /* Align items to the left */
  justify-items: center; /* Align items centered within its column */
  justify-items: end; /* Align items to the right */
  justify-items: stretch; /* Default: fills the column */

  /* Item alignment (vertical or row alignment) */
  align-items: start; /* Align items to the top */
  align-items: center; /* Align items centered within its row */
  align-items: end; /* Align items to the bottom */
  align-items: stretch; /* Default: fills the row */

  /* Place item shorthand */
  place-items: start stretch;

  /* The above is the same as below long-hand */
  align-items: start;
  justify-items: stretch;
}
```

See: [CSS grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout#reference)

### Container content alignment

```css
.grid-container {
  /* Content justification (horizontal or column alignment) */
  justify-content: start; /* Align content to the left */
  justify-content: center; /* Center horizontally */
  justify-content: end; /* Align content to the right */
  justify-content: stretch; /* Default: fills the grid */

  justify-content: space-around; /* Space on both sides */
  justify-content: space-between; /* Space between columns */
  justify-content: space-evenly; /* Equal space around */

  /* Content alignment (vertical or row alignment) */
  align-content: start; /* Align content to the top */
  align-content: center; /* Center vertically */
  align-content: end; /* Align content to the bottom */
  align-content: stretch; /* Default: fills the grid */

  align-content: space-around; /* Space above and below */
  align-content: space-between; /* Space between rows */
  align-content: space-evenly; /* Equal space around */

  /* Place content shorthand */
  place-content: center start;

  /* The above is the same as below long-hand */
  align-content: center;
  justify-content: start;
}
```

See: [CSS grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout#reference)

### Container flow

```css
.grid-container {
  /* Automatic grid positioning */
  grid-auto-flow: row; /* Left-to-right rows, then top-to-bottom */
  grid-auto-flow: column; /* Columns first, then rows */
  grid-auto-flow: dense; /* Pack implicitly placed items */
}
```

See: [CSS grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout#reference)

### Container grid shorthand

```css
.grid-container {
  /* Explicit grid columns, rows, and areas */
  grid:
    "header header" auto
    "main aside" 100vh
    "footer footer" 10rem
    / 80% 20%; /* Template as the only value */

  /* Same as the long-hand form below */
  grid-template:
    "header header" auto
    "main aside" 100vh
    "footer footer" 10rem
    / 80% 20%; /* Which is again equivalent to below */
  grid-template-columns: 80% 20%;
  grid-template-rows: auto 100vh 10rem;
  grid-template-areas:
    "header header"
    "main aside"
    "footer footer";

  /* Automatic grid flows */
  grid: 1rem / auto-flow dense 1fr; /* Rows, flow, auto columns */
  grid-template-rows: 1rem;
  grid-auto-flow: dense;
  grid-auto-columns: 1fr;

  grid: auto-flow dense 1rem / repeat(10, 10%); /* Automatic rows */
  grid-auto-flow: dense;
  grid-auto-rows: 1rem;
  grid-template-columns: repeat(10, 10%);
}
```

See: [CSS grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout#reference)

### Child

```css
.grid-child {
  /* Column position */
  grid-column-start: 1;
  grid-column-end: 2;

  grid-column: 1 / 2; /* Short hand */
  grid-column: 1 / span 2; /* Span two columns */
  grid-column: 1; /* Occupy a single column */

  /* Row position */
  grid-row-start: 2;
  grid-row-end: 4;

  grid-row: 2 / 4; /* Short hand */
  grid-row: 2 / span 3; /* Span three rows */
  grid-row: 1; /* Occupy a single row */

  /* Area positioning */
  grid-area: header; /* Named area from the container */

  grid-area: 2 / 1 / 4 / 2; /* Equivalent to lines below */
  grid-row-start: 2;
  grid-column-start: 1;
  grid-row-end: 4;
  grid-column-end: 2;
}
```

See: [Line-based placement](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Grid_layout_using_line-based_placement)

### Child self alignment

```css
.grid-child {
  /* Self justification (horizontal or column alignment) */
  justify-self: start; /* Align item to the left */
  justify-self: center; /* Align item centered within its column */
  justify-self: end; /* Align item to the right */
  justify-self: stretch; /* Default: fills the column */

  /* Self alignment (vertical or row alignment) */
  align-self: start; /* Align item to the top */
  align-self: center; /* Align item centered within its row */
  align-self: end; /* Align item to the bottom */
  align-self: stretch; /* Default: fills the row */

  /* Placement shorthand */
  place-self: start stretch;

  /* The above is the same as below long-hand */
  align-self: start;
  justify-self: stretch;
}
```

See: [Line-based placement](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Grid_layout_using_line-based_placement)

## References

<!-- {: .-one-column} -->

 * [GRID: A simple visual cheatsheet](http://grid.malven.co/)
 * [CSS Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
 * [Browser support](https://caniuse.com/#feat=css-grid)
