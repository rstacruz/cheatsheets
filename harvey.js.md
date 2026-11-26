---
title: Harvey.js
subtitle: Media query helper library
category: Hidden
# Discontinued (repo archived); the sheet points to enquire.js/matchMedia.
tags: [Archived]
archived: |
  Harvey.js was discontinued and its repository archived. Use
  [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
  or [enquire.js](https://github.com/WickyNilliams/enquire.js) instead.
intro: |
  [Harvey.js](http://harvesthq.github.io/harvey/) helps you build responsive interfaces.
links:
  - title: Harvey.js
    url: http://harvesthq.github.io/harvey/
---

### Usage

```js
Harvey.attach('(min-width: 600px)', {
  setup: function () {
    // Called on first enter
  },
  on: function () {
    // Called on every enter
  },
  off: function () {
    // Called on every exit
  }
})
```

### Deprecated

Harvey.js hasn't been updated in a while, as of time of writing. Consider [enquire.js](https://github.com/WickyNilliams/enquire.js) instead.

### References

* <http://harvesthq.github.io/harvey>
