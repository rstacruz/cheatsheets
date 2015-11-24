---
title: CSS background
category: CSS
---

Background
----------

### Shorthand

    background: #ff0  url(bg.jpg) left top      / 100px auto no-repeat fixed;
    background: #abc  url(bg.png) center center / cover      repeat-x  local;
    /*          ^     ^           ^             ^            ^         ^
                color image       position      size         repeat    attachment */

### Multiple backgrounds

    background:
      linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
      url('background.jpg') center center / cover,
      #333;

### Other properties

    background-clip: border-box | padding-box | content-box [, ...]*; /* IE9+ */
    background-repeat: no-repeat | repeat-x | repeat-y;
    background-attachment: scroll | fixed | local;
    background: url(x), url(y); /* multiple (IE9+) */

