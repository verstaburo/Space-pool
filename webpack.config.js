const webpack = require('webpack');
const path = require('path');
// const ChunksPlugin = require('webpack-split-chunks');

const isDebug = process.env.NODE_ENV !== 'production';

module.exports = (watch = false) => ({
  entry: {
    index: path.resolve('./app/scripts/app.js'),
    // other: path.resolve('./app/scripts/other.js'),
    // old: path.resolve('./app/scripts/old.js'),
  },
  output: {
    publicPath: '/assets/scripts/',
    filename: 'app.min.js',
    path: path.resolve('./dist/assets/scripts/'),
  },
  watch,
  devtool: isDebug ? 'cheap-module-inline-source-map' : false,
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new webpack.NoErrorsPlugin(),
    // new ChunksPlugin({
    //   to: 'vendor',
    //   test: /node_modules/,
    // }),
    !isDebug ? new webpack.optimize.UglifyJsPlugin() : f => f,
  ],
});
