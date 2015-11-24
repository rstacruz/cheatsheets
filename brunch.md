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

    files:
      javascripts:   # or 'stylesheets' or 'templates'
        order:
          before: [ 'normalize.css' ]
          after:  [ 'helpers.css' ]

        joinTo: 'app.js'
        joinTo:
          'js/app.js':    /^app/
          'js/vendor.js': /^vendor/
        pluginHelpers: 'js/vendor.js'

    paths:
      public: 'public'                       # where to compile
      watched: ['app','test','vendor']       # what to monitor

    modules:
      wrapper: 'amd'
      definition: 'amd'
      nameCleaner: (path) -> path.replace /^app\//, ''

    # brunch b --apply production
    overrides:
      production:
        optimize: true
        sourceMaps: false
        plugins: autoReload: enabled: false

## Plugins

    plugins:
      uglify:
        mangle: true
        compress:
          global_defs:
            DEBUG: false

## Extensions

Compile to JS/CSS

  * stylus-brunch
  * coffee-script-brunch
  * less-brunch

Compile to HTML

  * static-jade-brunch

Embedded templates

  * emblem-brunch

Etc

  * uglify-js-brunch
  * jshint-brunch
  * imageoptimizer-brunch

## References

  * https://github.com/brunch/brunch/blob/master/docs/config.md
