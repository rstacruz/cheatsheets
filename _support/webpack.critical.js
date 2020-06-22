const join = require('path').resolve
const webpack = require('webpack')

module.exports = {
  context: join(__dirname, '..'),
  entry: './_js/critical.js',
  output: {
    path: join(__dirname, '..', '_includes', '2017', 'critical'),
    filename: 'critical.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },
  stats: 'minimal',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ]
}
