---
title: CSS flexbox
layout: default
---

Basic

    .container {
      display: flex;
    }

    .container > div {
      flex: 0    0      40px;
      flex: 0    1      auto;
        /*  grow shrink basis */
    }

Full

    .container {
      display: flex;
      display: inline-flex;

      flex-direction: row;         /* ltr - default */
      flex-direction: row-reverse; /* rtl */

      flex-direction: column;         /* top-bottom */
      flex-direction: column-reverse; /* bottom-top */

      flex-wrap: nowrap; /* one-line */
      flex-wrap: wrap;   /* multi-line */

      align-items: flex-start; /* vertical alignment - default */
      align-items: flex-end;
      align-items: center;

      justify-content: flex-start; /* horizontal alignment - default */
      justify-content: flex-end;
      justify-content: center;
    }

    .container > div {
      flex: 1 0 0;
      order: 1;
      flex-grow: 0;
    }

### Centering

    .container {
      display: flex;
    }

    .container > div {
      width: 100px;
      height: 100px;
      margin: auto;
    }

### Mobile

    .container {
      display: flex;
      flex-direction: column;
    }

    .container > .top-bar {
      flex: 0 0 100px;
    }

    .container > .content {
      height: 100px;
      flex: 1 0 auto;
    }

