---
title: CSS
layout: default
---

Selectors
---------

    [attr="value"]       /*  =   exact */
    [class~="box"]       /*  ~=  has word */
    [class|="icon"]      /*  |=  exact, or prefix (eg, value-) */
    [href$=".doc"]       /*  $=  ends in */
    [class*="-is-"]      /*  *=  contains */

    h3 + p               /*  +   adjacent sibling */
    article ~ footer     /*  ~   far sibling */
    .container > .box    /*  >   direct child */

    :target (h2#foo:target)
    :disabled

    :nth-child
    :nth-child(3n)
    :nth-child(3n+2)
    :nth-child(-n+4)
    :nth-last-child(...)

    :first-of-type
    :last-of-type
    :nth-of-type
    :only-of-type   - only child of its parent thats like that

    :only-child

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

Webkit extensions
-----------------

### Font smoothing

    /* maxvoltar.com/archive/-webkit-font-smoothing */
    * {
      text-rendering: optimizeLegibility !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale;
    }

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

### iOS Scrolling prevention

    document.ontouchstart = (e) ->
      $pane = $(e.target).closest('.scrollable>div')
      if $pane.length is 0 or $pane[0].scrollHeight <= $pane.innerHeight()
        e.preventDefault()

    %ios-scrollable
      &, >div
        -webkit-overflow-scrolling: touch
        overflow: auto

      >div
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0

### UIWebView optimizations

    /* http://www.bitsandpix.com/entry/ios-webkit-uiwebview-remove-tapclick-highlightborder-with-css/ */
    /* 
       http://www.yuiblog.com/blog/2010/10/01/quick-tip-customizing-the-mobile-safari-tap-highlight-color/ 
     */

    * {
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-user-select: none;                /* disable text select */
      -webkit-touch-callout: none;              /* disable callout, image save panel (popup) */
      -webkit-tap-highlight-color: transparent; /* "turn off" link highlight */
    }

    a:focus {
      outline:0; // Firefox (remove border on link click)
    }

Browser hacks
-------------

Not recommended, but here they are if you ever need them. Note that vendor 
prefixes may go away eventually.

### Mozilla-only

    @-moz-document url-prefix() {
      .box { color: blue; }
    }

### Webkit-only

    @media all and (-webkit-min-device-pixel-ratio: 1) {
    }
