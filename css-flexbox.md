---
title: CSS flexbox
category: CSS
---

    .container {
      display: flex;
    }

    .container.vertical {
      flex-direction: column;
    }

    .container > div {
      flex: /* grow, shrink, basis */;
      flex: 0 0 40px; /* fixed width */
      flex: 0 1 auto; /* dynamic width */

      order: 1;
    }

### Full reference

    .container {
      display: flex;
      display: inline-flex;

      flex-direction: row;         /* ltr - default */
      flex-direction: row-reverse; /* rtl */
      flex-direction: column;         /* top-bottom */
      flex-direction: column-reverse; /* bottom-top */

      flex-wrap: nowrap; /* one-line */
      flex-wrap: wrap;   /* multi-line */

      align-items: flex-start; /* vertical-align to top */
      align-items: flex-end;   /* vertical-align to bottom */
      align-items: center;     /* vertical-align to center */
      align-items: stretch;    /* same height on all (default) */

      justify-content: flex-start; /* horizontal alignment - default */
      justify-content: flex-end;
      justify-content: center;
    }

    .container > div {
      flex: 1 0 0;
      order: 1;
      flex-grow: 0;
    }

## Tricks

### Vertical center

    .container {
      display: flex;
    }

    .container > div {
      width: 100px;
      height: 100px;
      margin: auto;
    }

### Reordering

    .container > .top {
     order: 1;
    }

    .container > .bottom {
     order: 2;
    }

### Mobile layout

A fixed-heighttop bar and a dynamic-height content area.

    .container {
      display: flex;
      flex-direction: column;
    }

    .container > .top {
      flex: 0 0 100px;
    }

    .container > .content {
      height: 100px;
      flex: 1 0 auto;
    }

### Table-like

This creates columns that have different widths, but size accordingly according
to the circumstances.

    .container {
      display: flex;
    }

    /* the 'px' values here are just suggested percentages */
    .container > .checkbox { flex: 1 0 20px; }
    .container > .subject  { flex: 1 0 400px; }
    .container > .date     { flex: 1 0 120px; }

### Vertical

Vertically-center all items.

    .container {
      align-items: center;
    }

### References

 * [MDN: Using CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)
 * [Ultimate flexbox cheatsheet](http://www.sketchingwithcss.com/samplechapter/cheatsheet.html)
