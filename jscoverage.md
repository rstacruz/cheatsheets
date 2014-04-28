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

    /* directory */
    "coverage": "mv lib lib~; (./node_modules/.bin/jscoverage lib~ lib; ./node_modules/.bin/mocha -R html-cov > coverage.html); rm -rf lib; mv lib~ lib"

    /* single file */
    "coverage": "(cp index.js index.js~; ./node_modules/.bin/jscoverage index.js; mv index-cov.js index.js; ./node_modules/.bin/mocha -R html-cov > coverage.html); mv index.js~ index.js"

### Run

    npm run coverage
    open coverage.html

### Caveats

If you're using jsdom, be sure to expose the `window._$jscoverage` variable into the `global` scope.
