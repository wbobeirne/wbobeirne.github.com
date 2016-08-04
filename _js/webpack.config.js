var webpack = require('webpack');
var path = require('path');
var argv = require("yargs").argv;

var PROD = argv.p;

module.exports = {
  cache: true,
  entry: {
    home: path.resolve(__dirname, '../_js/home.coffee')
  },
  resolve: {
    root: [
      path.resolve(__dirname, '../_js'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: ['', '.js', '.coffee']
  },
  output: {
    path: './js',
    filename: PROD ? 'scripts.min.js' : 'scripts.js'
  },
  module: {
    loaders: [{
      test: /\.coffee$/,
      loaders: ["coffee-loader"]
    }]
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  ] : []
};