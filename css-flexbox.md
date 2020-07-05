---
title: CSS flexbox
category: CSS
layout: 2017/sheet
updated: 2020-06-13
prism_languages: [css]
weight: -3
---

### Simple example

```css
.container {
  display: flex;
}
```

```css
.container > div {
  flex: 1 1 auto;
}
```

### Container

```css
.container {
```
{: .-setup}

```css
  display: flex;
  display: inline-flex;
```

```css
  flex-direction: row;            /* ltr - default */
  flex-direction: row-reverse;    /* rtl */
  flex-direction: column;         /* top-bottom */
  flex-direction: column-reverse; /* bottom-top */
```

```css
  flex-wrap: nowrap; /* one-line */
  flex-wrap: wrap;   /* multi-line */
```

```css
  align-items: flex-start; /* vertical-align to top */
  align-items: flex-end;   /* vertical-align to bottom */
  align-items: center;     /* vertical-align to center */
  align-items: stretch;    /* same height on all (default) */
```

```css
  justify-content: flex-start;    /* [xxx        ] */
  justify-content: center;        /* [    xxx    ] */
  justify-content: flex-end;      /* [        xxx] */
  justify-content: space-between; /* [x    x    x] */
  justify-content: space-around;  /* [ x   x   x ] */
  justify-content: space-evenly;  /* [  x  x  x  ] */
```

```css
}
```
{: .-setup}

### Child

```css
.container > div {
```
{: .-setup}

```css
  /* This: */
  flex: 1 0 auto;

  /* Is equivalent to this: */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
```

```css
  order: 1;
```

```css
  align-self: flex-start;  /* left */
  margin-left: auto;       /* right */
```

```css
}
```
{: .-setup}


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
{: .-one-column}

 * [MDN: Using CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)
 * [Ultimate flexbox cheatsheet](http://www.sketchingwithcss.com/samplechapter/cheatsheet.html)
