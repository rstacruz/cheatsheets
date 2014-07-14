---
title: Browserify
layout: default
---


    browserify input.js
      -o output.js
      -t coffeeify
      -t [ coffeeify --extension coffee ]
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

