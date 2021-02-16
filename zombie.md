---
title: Zombie
category: JavaScript libraries
layout: 2017/sheet
intro: |
  [Zombie](http://zombie.js.org/) is a full-stack testing solution for Node.js.
---

## Zombie

### Examples

```js
browser
  .visit("http://.../", ->)
  .fill("email", "zombie@underworld.dead")
  .fill("password", "eat-the-living")
  .select("Born", "1985")
  .uncheck("Send newsletter")
  .clickLink("Link name")
  .pressButton("Sign", () => { ... })
  .text("H1")
```

### Expectations

```js
expect(browser.query("#brains"))

expect(browser.body.queryAll(".hand")).length 2

console.log(browser.html())
console.log(browser.html("table.parts"))

expect(Browser.text(".card-nopad small"), "A better way to get around!")
```
