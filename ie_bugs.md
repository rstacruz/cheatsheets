---
title: Legacy IE bugs
category: HTML
updated: 2018-03-06
intro: |
  A bunch of bugs to take care of if you're going to target legacy IE browsers.
---

### IE8: 'change' event

The 'change' event doesn't always fire. Not for checkboxes, radios, multi-select lists. Use the `click` handler instead.

 * [(1)](http://stackoverflow.com/questions/8005442/checkbox-change-event-works-when-click-the-label-in-ie8-ie7)

### IE8: label with input

Clicking label with input inside doesn't focus the input.

 * [(1)](http://www.gtalbot.org/BrowserBugsSection/MSIE7Bugs/LabelForWithImage.html)

### IE8: Opacity propagation

An element's 'opacity' value isn't propagated to its positioned descendants.

 * [test case](http://jhop.me/tests/bugs/ie8/opacity_positioned.html)
