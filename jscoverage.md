---
title: jscoverage
category: JavaScript libraries
layout: 2017/sheet
intro: |
  A small guide into installing [jscoverage](https://npmjs.com/package./jscoverage). Also see [mocha-blanket](./mocha-blanket).
---

### Install

#### Install via npm

```bash
npm install --save-dev jscoverage
```

#### Ignore output

```bash
echo coverage.html >> .gitignore
```

### package.json

The `coverage` task injects your source files (`lib`) with jscoverage hooks, runs `mocha -R html-cov`, then restores later.
{: .-setup}

```bash
/* directory */
"coverage": "mv lib lib~; (jscoverage lib~ lib; mocha -R html-cov > coverage.html); rm -rf lib; mv lib~ lib"
```
{: .-hard-wrap}

```bash
/* single file */
"coverage": "(cp index.js index.js~; jscoverage index.js; mv index-cov.js index.js; mocha -R html-cov > coverage.html); mv index.js~ index.js"
```
{: .-hard-wrap}

### Run

```bash
npm run coverage
```

```bash
open coverage.html
```

### Caveats

If you're using jsdom, be sure to expose the `window._$jscoverage` variable into 
the `global` scope.
