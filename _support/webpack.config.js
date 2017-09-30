const join = require('path').resolve

module.exports = {
  context: join(__dirname, '..'),
  entry: {
    app: './_js/app.js'
  },
  output: {
    path: join(__dirname, '..', 'assets', 'webpack'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },
  stats: 'minimal'
}
