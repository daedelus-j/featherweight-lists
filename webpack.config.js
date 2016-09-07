'use strict';

const webpack = require('webpack');
const path = require('path');

const JsLoader = {
  test: /\.js$/,
  include: path.join(__dirname, 'src')
};

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: {
    example: './example',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },

  plugins: [ ],

  module: {
    loaders: [ JsLoader ]
  }
};
