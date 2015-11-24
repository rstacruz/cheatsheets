---
title: Mocha blanket
category: JavaScript libraries
---

Use [blanket] for easy coverage reporting.

## Quickstart guide

    $ npm i --save-dev blanket

In your test helpers, use Blanket before `require`ing:

```js
if (process.env.COVERAGE) {
  require('blanket')({
    pattern: require('path').resolve('./index.js')
  });
}
thing = require('../index');
```

## Add scripts to package.json

Add to `package.json`:

```json
"scripts": {
  "coverage": "env COVERAGE=1 mocha -R html-cov > coverage.html && open coverage.html"
}
```

Be sure to ignore it:

    $ echo "coverage.html" >> .gitignore

Then run:

    $ npm run coverage

## Travis + coveralls.io support

Visit [coveralls.io] then activate your repo. Then install the appropriate packages:

    $ npm i --save-dev mocha-lcov-reporter coveralls

Add this to `.travis.yml`:

```yml
after_success:
  - ./node_modules/.bin/mocha -R mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
```

Commit, push, wait for Travis to finish.

[blanket]: https://www.npmjs.org/package/blanket
[coveralls.io]: http://coveralls.io
