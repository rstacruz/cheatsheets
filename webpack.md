---
title: Webpack
category: JavaScript libraries
---

### Config

* webpack.config.js

### Multiple entries

    entry: {
      app: './app.js',
      vendor: './vendor.js'
    }

### Output

    output: {
      path: __dirname + '/public/assets',
      filename: '[name].js'
      /* also: [id] [hash] */
      chunkFilename: "[id].chunk.js"

      libraryTarget: 'var' | 'this' | 'commonjs' | 'commonjs2' | 'amd' | 'umd'
    }

### Module

    module: {
      loaders: [ ... ]
      preLoaders: [ ... ]
      postLoaders: [ ... ]
    }

### Resolve

    resolve: {
      alias: {
        'xyz': './foo.js'
      }
      modulesDirectories: [
        'node_modules',
        'web_modules' ]
      }

    }
