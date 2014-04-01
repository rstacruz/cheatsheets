---
title: jscoverage
layout: default
---

### Install

    npm install --save-dev jscoverage

### Ignore output

    echo coverage.html >> .gitignore

### package.json

The `coverage` task injects your source files (`lib`) with jscoverage hooks, runs `mocha -R html-cov`, then restores later.

    "coverage": "./node_modules/.bin/jscoverage lib && (mv lib lib~; mv lib-cov lib; ./node_modules/.bin/mocha -R html-cov > coverage.html; mv -f lib~ lib)"

### Run

    npm run coverage
    open coverage.html

### Caveats

If you're using jsdom, be sure to expose the `window._$jscoverage` variable into the `global` scope.
