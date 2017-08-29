---
title: jQuery mobile events
category: JavaScript libraries
---

### Mobile events

For support for `tap`, `swipe`, `swipeLeft`, et al, use 
[jquery.mobile.event.js][m]. Be sure to set `$.support.touch` first.

To get `$.support.touch` (and family), use this from 
[jquery.mobile.support.js][s]:

    $.extend($.support, {
      orientation: "orientation" in window && "onorientationchange" in window,
      touch: "ontouchend" in document,
      cssTransitions: "WebKitTransitionEvent" in window,
      pushState: "pushState" in history && "replaceState" in history,
      mediaquery: $.mobile.media( "only all" ),
      cssPseudoElement: !!propExists( "content" ),
      touchOverflow: !!propExists( "overflowScrolling" ),
      boxShadow: !!propExists( "boxShadow" ) && !bb,
      scrollTop: ( "pageXOffset" in window || "scrollTop" in document.documentElement || "scrollTop" in fakeBody[ 0 ] ) && !webos && !operamini,
      dynamicBaseTag: baseTagTest()
    });

[m]:https://github.com/jquery/jquery-mobile/blob/master/js/jquery.mobile.event.js
[s]:https://github.com/jquery/jquery-mobile/blob/master/js/jquery.mobile.support.js
