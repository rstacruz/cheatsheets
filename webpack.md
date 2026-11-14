---
title: Webpack
category: JavaScript libraries
updated: 2026-11-14
intro: |
  [Webpack](https://webpack.js.org) bundles JavaScript, CSS, and other assets into files a browser can load. This reference targets webpack 5 and webpack-cli 7.
links:
  - title: Documentation
    url: https://webpack.js.org/concepts/
  - title: GitHub repository
    url: https://github.com/webpack/webpack
---

## Getting started

### Install

```bash
npm install --save-dev webpack webpack-cli
```

`webpack` is the library; `webpack-cli` provides the `webpack` command.

See: [Installation](https://webpack.js.org/guides/installation/)

### Config file

#### webpack.config.js

```js
const path = require('node:path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  }
}
```

`output.path` must be absolute. Name the file `webpack.config.mjs`, or set `"type": "module"` in `package.json`, to use `export default`.

See: [Configuration](https://webpack.js.org/configuration/)

### CLI

| Command | Description |
| --- | --- |
| `webpack` | Build once |
| `webpack --mode production` | Production build |
| `webpack --watch` | Rebuild on change |
| `webpack serve` | Start the dev server |
| `webpack configtest` | Validate the config |

<!-- {: .-shortcuts} -->

See: [CLI](https://webpack.js.org/api/cli/)

## Config anatomy

### Entry

```js
module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js'
  }
}
```

An entry can also be an array (bundled together) or an object with `import` and `dependOn`, which shares modules between chunks.

See: [Entry points](https://webpack.js.org/concepts/entry-points/)

### Output

```js
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[contenthash:8].js',
  chunkFilename: '[name].[contenthash:8].js',
  assetModuleFilename: 'assets/[hash][ext][query]',
  publicPath: '/'
}
```

#### Filename tokens

| Token | Becomes |
| --- | --- |
| `[name]` | Entry or chunk name |
| `[contenthash]` | Hash of this file's contents |
| `[fullhash]` | Hash of the whole build |
| `[chunkhash]` | Hash of the chunk |
| `[id]` | Chunk ID |
| `[ext]` | Extension, with the dot |
| `[query]` | Query string, with the `?` |

<!-- {: .-headers} -->

`output.clean` empties the output directory before each build.

See: [Output](https://webpack.js.org/configuration/output/)

### Mode

```js
module.exports = {
  mode: 'production'
}
```

`mode` is shorthand for three defaults:

```js
mode: 'development'  // => NODE_ENV=development, devtool: 'eval'
mode: 'production'   // => NODE_ENV=production, minified
mode: 'none'         // => no defaults, NODE_ENV untouched
```

Production mode also turns on tree shaking and deterministic module IDs. Never hardcode the mode twice; read it from an env var.

See: [Mode](https://webpack.js.org/configuration/mode/)

### Plugins

```js
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true)
    }),
    new webpack.ProgressPlugin()
  ]
}
```

Plugins hook into the compiler; most are classes you instantiate with `new`. Since 5.109 webpack writes HTML itself (`experiments.html`), retiring `html-webpack-plugin`.

See: [Plugins](https://webpack.js.org/concepts/plugins/)

## Loaders and assets

### Babel

```bash
npm install --save-dev babel-loader @babel/core
npm install --save-dev @babel/preset-env
```

#### webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
```

#### babel.config.js

```js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: 'defaults' }]
  ]
}
```

Loaders run right to left, so the last entry in `use` transforms first.

See: [babel-loader](https://webpack.js.org/loaders/babel-loader/)

### CSS

```bash
npm install --save-dev style-loader css-loader
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

`css-loader` resolves `@import` and `url()`; `style-loader` injects the result with a `<style>` tag. Use `mini-css-extract-plugin` to emit a real `.css` file instead.

See: [css-loader](https://webpack.js.org/loaders/css-loader/)

### PostCSS

```js
{
  test: /\.css$/i,
  use: [
    'style-loader',
    'css-loader',
    'postcss-loader'
  ]
}
```

#### postcss.config.js

```js
module.exports = {
  plugins: {
    'postcss-preset-env': {}
  }
}
```

`postcss-preset-env` replaces the retired `postcss-cssnext`, and covers autoprefixing and modern syntax.

See: [postcss-loader](https://webpack.js.org/loaders/postcss-loader/)

### Asset modules

```js
module.exports = {
  module: {
    rules: [
      { test: /\.png$/i, type: 'asset/resource' },
      { test: /\.svg$/i, type: 'asset/inline' },
      { test: /\.txt$/i, type: 'asset/source' },
      {
        test: /\.jpg$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8192 } }
      }
    ]
  }
}
```

#### Types

| Type | Emits | Replaces |
| --- | --- | --- |
| `asset/resource` | A file, exporting its URL | `file-loader` |
| `asset/inline` | A data URI | `url-loader` |
| `asset/source` | The raw source | `raw-loader` |
| `asset/bytes` | A `Uint8Array` | none |
| `asset` | Inline under `maxSize`, else a file | `url-loader` |

<!-- {: .-headers} -->

Asset modules are built in, so no loader is needed for images or fonts.

See: [Asset modules](https://webpack.js.org/guides/asset-modules/)

## Dev server

### Setup

```bash
npm install --save-dev webpack-dev-server
```

```js
module.exports = {
  devServer: {
    static: './public',
    port: 8080,
    hot: true,
    historyApiFallback: true
  }
}
```

Run it with `npx webpack serve`. `static` replaces the removed `contentBase` option.

See: [DevServer](https://webpack.js.org/configuration/dev-server/)

### Proxy

```js
module.exports = {
  devServer: {
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000'
      }
    ]
  }
}
```

Requests to `/api` go to the backend; the rest are served by webpack. Options come from `http-proxy-middleware`.

See: [devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)

## Caching

### Content hashes

```js
module.exports = {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  optimization: {
    runtimeChunk: 'single'
  }
}
```

A `[contenthash]` filename changes only when that file changes. Splitting the runtime into its own chunk stops boilerplate churn from renaming every bundle.

See: [Caching](https://webpack.js.org/guides/caching/)

### Vendor splitting

```js
optimization: {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
}
```

Third-party code changes less often than your own, so it deserves its own long-lived bundle.

See: [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)

### Filesystem cache

```js
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: { config: [__filename] }
  }
}
```

The default cache is in memory, and production mode turns it off. The filesystem cache persists in `node_modules/.cache/webpack` between runs.

See: [cache](https://webpack.js.org/configuration/cache/)

## Upgrading from v4

### Loaders replaced

| v4 | v5 |
| --- | --- |
| `file-loader` | `type: 'asset/resource'` |
| `url-loader` | `type: 'asset/inline'` |
| `raw-loader` | `type: 'asset/source'` |
| `json-loader` | Built in |
| `babel-polyfill` | `core-js` plus `@babel/preset-env` |

<!-- {: .-headers} -->

See: [Asset modules](https://webpack.js.org/guides/asset-modules/)

### Node polyfills

```js
module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify')
    }
  }
}
```

Webpack 5 stopped bundling polyfills for Node core modules. Add a browser package and route the import with `resolve.fallback`, or use `node-polyfill-webpack-plugin`.

See: [Shimming](https://webpack.js.org/guides/shimming/)

### Renamed options

| v4 | v5 |
| --- | --- |
| `devServer.contentBase` | `devServer.static` |
| `devServer.proxy: { '/api': … }` | `devServer.proxy: [{ context, target }]` |
| `optimization.namedModules` | `optimization.moduleIds: 'named'` |
| `optimization.namedChunks` | `optimization.chunkIds: 'named'` |
| `optimization.hashedModuleIds` | `optimization.moduleIds: 'deterministic'` |

<!-- {: .-headers} -->

`NamedModulesPlugin` and `NamedChunksPlugin` were removed along with these options.

Webpack 5 requires Node 10.13+; webpack-dev-server 6 requires Node 22.15+.

See: [Migration guide](https://webpack.js.org/migrate/5/)
