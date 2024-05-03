---
title: Mocha blanket
category: JavaScript libraries
intro: |
  Use [blanket](https://npmjs.com/package/blanket) for easy coverage reporting for Mocha JavaScript tests.
---

### Quickstart guide

Install blanket:
{: .-setup}

```bash
npm i --save-dev blanket
```

In your test helpers, use Blanket before `require`ing:

```js
if (process.env.COVERAGE) {
  require('blanket')({
    pattern: require('path').resolve('./index.js')
  });
}
thing = require('../index');
```

Add to `package.json`:

```json
"scripts": {
  "coverage": "env COVERAGE=1 mocha -R html-cov > coverage.html && open coverage.html"
}
```

Be sure to ignore it:

```bash
echo "coverage.html" >> .gitignore
```

Then run:

```bash
npm run coverage
```

### Travis + coveralls.io support

Visit [coveralls.io] then activate your repo. Then install the appropriate packages:
{: .-setup}

```bash
npm i --save-dev mocha-lcov-reporter coveralls
```

Add this to `.travis.yml`:

```yml
after_success:
  - ./node_modules/.bin/mocha -R mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
```

Commit, push, wait for Travis to finish.

[blanket]: https://www.npmjs.org/package/blanket
[coveralls.io]: http://coveralls.io
