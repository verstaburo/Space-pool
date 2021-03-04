const webpack = require('webpack');
const path = require('path');

const isDebug = process.env.NODE_ENV !== 'production';

module.exports = (watch = false) => ({
  entry: {
    app: path.resolve('./app/scripts/app.js'),
    index: path.resolve('./app/scripts/index.js'),
    // other: path.resolve('./app/scripts/other.js'),
    // old: path.resolve('./app/scripts/old.js'),
  },
  output: {
    publicPath: '/assets/scripts/',
    filename: '[name].min.js',
    path: path.resolve('./dist/assets/scripts/'),
  },
  watch: isDebug,
  mode: isDebug ? 'development' : 'production',
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
});
