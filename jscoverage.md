---
title: jscoverage
category: JavaScript libraries
---

Also see [mocha-blanket](mocha-blanket.html).

### Install

    npm install --save-dev jscoverage

### Ignore output

    echo coverage.html >> .gitignore

### package.json

The `coverage` task injects your source files (`lib`) with jscoverage hooks, runs `mocha -R html-cov`, then restores later.

    /* directory */
    "coverage": "mv lib lib~; (jscoverage lib~ lib; mocha -R html-cov > coverage.html); rm -rf lib; mv lib~ lib"

    /* single file */
    "coverage": "(cp index.js index.js~; jscoverage index.js; mv index-cov.js index.js; mocha -R html-cov > coverage.html); mv index.js~ index.js"

### Run

    npm run coverage
    open coverage.html

### Caveats

If you're using jsdom, be sure to expose the `window._$jscoverage` variable into 
the `global` scope.
