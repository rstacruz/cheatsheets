---
title: Setting up jscoverage
layout: default
---

### Install

    npm i --save-dev jscoverage

### package.json

Set up the `coverage` task so you can do `npm run coverage` later.

    "coverage": "./node_modules/.bin/jscoverage YOURFILE.js && env COVERAGE=true ./node_modules/.bin/mocha -R html-cov > coverage.html; rm YOURFILE-cov.js",

### test/setup.js

Instead of requiring `YOURFILE.js`, use `-cov.js` when it's necessary.  It's
preferred to do this in the test files (rather than the main entry points).

    var cov = (!! process.env.COVERAGE);
    global.Mylib = require(cov ? 'mylib' : 'mylib-cov');

### Run

    npm run coverage
    open coverage.html
