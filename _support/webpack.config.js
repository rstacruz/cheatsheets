const join = require('path').resolve
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  context: join(__dirname, '..'),
  entry: {
    app: './_js/app.js',
    vendor: [
      // Large 3rd-party libs
      'prismjs',

      // Prism plugins
      'prismjs/plugins/line-highlight/prism-line-highlight.min.js',
      'prismjs/components/prism-jsx.min.js',
      'prismjs/components/prism-bash.min.js',
      'prismjs/components/prism-scss.min.js',
      'prismjs/components/prism-css.min.js',
      'prismjs/components/prism-elixir.min.js',
      'prismjs/components/prism-ruby.min.js',

      // CSS
      'sanitize.css',
      'prismjs/plugins/line-highlight/prism-line-highlight.css',
      'hint.css/hint.min.css'
    ]
  },
  output: {
    path: join(__dirname, '..', 'assets', 'packed'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      // Never bundle jQuery
      'jquery': join(__dirname, '..', '_js/helpers/noop.js')
    }
  },
  stats: 'minimal',
  plugins: [
    // Optimize module ID's for vendor chunks
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'base64',
      hashDigestLength: 20
    }),

    // Optimize vendor
    new webpack.optimize.CommonsChunkPlugin('vendor'),

    // Don't include debug symbols ever
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    // Always minify, even in development.
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: true,
        mangle: true
      }
    })
  ]
}
