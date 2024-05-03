---
title: Browserify
category: JavaScript libraries
tags: [Archived]
archived: Browserify has not been in active development.
---

### About
{: .-intro}

Browserify is a bundler for JavaScript.

- <https://browserify.org/>

### Usage

    browserify input.js
      -o output.js
      -t coffeeify
      -t [ coffeeify --extension coffee ]

      -u react (--exclude: omit a file)
      -x react (--external: reference in another bundle)
      -i react (--ignore: stub a file)
      -s Myapp (--standalone: generate a UMD bundle)
      --debug

### Programmatic usage

    browserify = require('browserify')
    browserify()
      .add('main.js')
      .bundle()
      .transform(coffeeify)
      .transform({extensions: '.coffee'}, coffeeify)
      .pipe(process.stdout)

    browserify({})

### Tools

  * watchify (recompiles on demand)
  * beefy (http server)
  * debowerify
  * es6ify (es6 to es5)

Transforms

  * coffeeify
  * ractify
  * reactify
  * brfs
  * cssify
  * https://github.com/substack/node-browserify/wiki/list-of-transforms

