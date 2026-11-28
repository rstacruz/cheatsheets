---
title: CSS flexbox
subtitle: One-dimensional layout system
logo: { set: icon-park-outline, name: layout-one }
category: CSS
created_at: 2014-04-28
updated: 2026-11-23
tier: t3
last_verified_with: "CSS Flexible Box Layout Module Level 1."
prism_languages: [css]
weight: -3
---

### Simple example

#### Container

```css
.container {
  display: flex;
}
```

#### Items

```css
.container > div {
  flex: 1 1 auto;
}
```

See: [Basic concepts of flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)

### Container

#### Opening brace

```css
.container {
```

<!-- {: data-highlight=".container"} -->

#### Display

```css
  display: flex;
  display: inline-flex;
```
<!-- {: data-highlight="display: flex"} -->

#### Direction

```css
  flex-direction: row;            /* inline axis, default */
  flex-direction: row-reverse;    /* reverse inline axis */
  flex-direction: column;         /* top-bottom */
  flex-direction: column-reverse; /* bottom-top */
```

#### Wrapping

```css
  flex-wrap: nowrap; /* one-line */
  flex-wrap: wrap;   /* multi-line */
```

#### Alignment

```css
  align-items: flex-start; /* vertical-align to top */
  align-items: flex-end;   /* vertical-align to bottom */
  align-items: center;     /* vertical-align to center */
  align-items: stretch;    /* same height on all (default) */
```

#### Distribution

```css
  justify-content: flex-start;    /* [xxx        ] */
  justify-content: center;        /* [    xxx    ] */
  justify-content: flex-end;      /* [        xxx] */
  justify-content: space-between; /* [x    x    x] */
  justify-content: space-around;  /* [ x   x   x ] */
  justify-content: space-evenly;  /* [  x  x  x  ] */
```

#### Closing brace

```css
}
```

See: [Basic concepts of flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)

### Child

#### Selector

```css
.container > div {
```

<!-- {: data-highlight=".container > div"} -->

#### Flex shorthand

```css
  /* This: */
  flex: 1 0 auto;

  /* Is equivalent to this: */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
```

#### Order

```css
  order: 1;
```

#### Alignment

```css
  align-self: flex-start;  /* left */
  margin-left: auto;       /* right */
```
<!-- {: data-highlight="align-self: flex-start"} -->

#### Closing brace

```css
}
```

See: [flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)


## Tricks

### Vertical center

```css
.container {
  display: flex;
}

.container > div {
  width: 100px;
  height: 100px;
  margin: auto;
}
```

See: [Aligning items in a flex container](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container)

### Vertical center (2)

```css
.container {
  display: flex;
  align-items: center;     /* vertical */
  justify-content: center; /* horizontal */
}
```

See: [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)

### Reordering

```css
.container > .top {
 order: 1;
}

.container > .bottom {
 order: 2;
}
```

See: [order](https://developer.mozilla.org/en-US/docs/Web/CSS/order)

### Mobile layout


```css
.container {
  display: flex;
  flex-direction: column;
}

.container > .top {
  flex: 0 0 100px;
}

.container > .content {
  flex: 1 0 auto;
}
```

A fixed-height top bar and a dynamic-height content area.

See: [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)

### Table-like

```css
.container {
  display: flex;
}

/* the 'px' values here are just suggested percentages */
.container > .checkbox { flex: 1 0 20px; }
.container > .subject  { flex: 1 0 400px; }
.container > .date     { flex: 1 0 120px; }
```

This creates columns that have different widths, but size accordingly according
to the circumstances.

See: [Controlling ratios of flex items](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Controlling_ratios_of_flex_items_along_the_main_axis)

### Vertical


```css
.container {
  align-items: center;
}
```

Vertically-center all items.

See: [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)

### Left and right

```css
.menu > .left  { align-self: flex-start; }
.menu > .right { align-self: flex-end; }
```

See: [align-self](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self)

## References

<!-- {: .-one-column} -->

 * [MDN: CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout)
 * [Flexbox cheatsheet](https://flexbox.malven.co/)
