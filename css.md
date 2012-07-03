title: CSS
---

Webkit extensions
-----------------

### Font smoothing

    /* maxvoltar.com/archive/-webkit-font-smoothing */
    html { -webkit-font-smoothing: antialiased; }

### Heading kerning pairs and ligature

    h1, h2, h3 { text-rendering: optimizeLegibility; }

### Native-like iOS scrolling

    -webkit-overflow-scrolling: touch;
    overflow-y: auto;

### Gradient text

    background: -webkit-gradient(linear, left top, left bottom, from(#eee), to(#333));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

### Text stroke

    /* http://www.webkit.org/blog/85/introducing-text-stroke/ */
    -webkit-text-stroke: 3px black;
