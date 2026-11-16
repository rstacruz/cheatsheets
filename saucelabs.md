---
title: Saucelabs
subtitle: Cross-browser testing service
category: Hidden
# The Open Sauce signup page is gone and zuul, the runner it uses, was archived in 2021.
tags: [Archived]
archived: |
  The Open Sauce signup page is gone, and `zuul` (the runner this sheet uses)
  was archived in 2021. See
  [Sauce Labs docs](https://docs.saucelabs.com/) or
  [Playwright](https://playwright.dev/).
---

### Getting started

Sign up for opensauce:

<!-- {: .-setup} -->

- <http://saucelabs.com/opensauce>

Install [zuul](https://npmjs.com/package/zuul):

```
npm i -g zuul
```

Configure zuul:

```yml
# ~/.zuulrc
sauce_username: me
sauce_key: abc12348-e3e2-...
```

Add `.zuul.yml` to your project:

#### .zuul.yml

```yml
ui: mocha-bdd
browsers:
  - name: chrome
    version: latest
  - name: ie
    version: 6..latest
  - name: firefox
    version: latest
```

Try to run tests:

```
zuul test/test.js
zuul --local test/test.js
```
