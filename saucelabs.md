---
title: Saucelabs
layout: 2017/sheet
---

### Getting started

Sign up for opensauce:
{: .-setup}

- http://saucelabs.com/opensauce

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

```yml
# .zuul.yml
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
