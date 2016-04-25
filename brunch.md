---
title: Brunch
category: JavaScript libraries
---

## Paths

    /
      app/
        assets/
      vendor/
      public/
      config.coffee

## Config

```js
module.exports = {
  files: {
    javascripts: {  # or 'stylesheets' or 'templates'
      order: {
        before: [ 'normalize.css' ],
        after:  [ 'helpers.css' ],

      joinTo: 'app.js',
      joinTo: {
        'js/app.js':    /^app/,
        'js/vendor.js': /^vendor/
      },
      pluginHelpers: 'js/vendor.js'
    }
  }

  paths: {
    public: 'public',                      # where to compile
    watched: ['app','test','vendor'],      # what to monitor
 }

  modules: {
    wrapper: 'amd',
    definition: 'amd',
    nameCleaner: (path) => path.replace(/^app\//, '')
  }

  npm: { styles, globals }

  plugins: {
    sass: { ... }
  }

  // brunch w --apply testing
  // BRUNCH_ENV=testing brunch build
  overrides: {
    production: {
      optimize: true,
      sourceMaps: false,
      plugins: { autoReload: { enabled: false } }
    }
  }

  onCompile: (files, assets) => { ... }
```

## Plugins

    plugins:
      uglify:
        mangle: true
        compress:
          global_defs:
            DEBUG: false

## Extensions

Compile to CSS

  * stylus-brunch
  * less-brunch
  * sass-brunch

Compile to HTML

  * static-jade-brunch

Embedded templates

  * emblem-brunch

Etc

  * uglify-js-brunch
  * jshint-brunch
  * imageoptimizer-brunch

## References

  * <https://github.com/brunch/brunch/blob/master/docs/config.md>
