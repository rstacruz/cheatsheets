---
title: Webpack
layout: default
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
    }
