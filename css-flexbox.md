---
title: CSS flexbox
subtitle: One-dimensional layout system
category: CSS
updated: 2026-11-23
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

### Container

#### Opening brace

```css
.container {
```

<!-- {: .-setup} -->

#### Display

```css
  display: flex;
  display: inline-flex;
```

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

<!-- {: .-setup} -->

### Child

#### Selector

```css
.container > div {
```

<!-- {: .-setup} -->

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

#### Closing brace

```css
}
```

<!-- {: .-setup} -->


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

### Vertical center (2)

```css
.container {
  display: flex;
  align-items: center;     /* vertical */
  justify-content: center; /* horizontal */
}
```

### Reordering

```css
.container > .top {
 order: 1;
}

.container > .bottom {
 order: 2;
}
```

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

### Vertical


```css
.container {
  align-items: center;
}
```

Vertically-center all items.

### Left and right

```css
.menu > .left  { align-self: flex-start; }
.menu > .right { align-self: flex-end; }
```

## References

<!-- {: .-one-column} -->

 * [MDN: CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout)
 * [Flexbox cheatsheet](https://flexbox.malven.co/)
