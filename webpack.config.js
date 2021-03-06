'use strict'

var webpack = require('webpack')
var env = process.env.NODE_ENV
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
}

var reduxExternal = {
  root: 'Redux',
  commonjs2: 'redux',
  commonjs: 'redux',
  amd: 'redux'
}

var reactReduxExternal = {
  root: 'ReactRedux',
  commonjs2: 'react-redux',
  commonjs: 'react-redux',
  amd: 'react-redux'
}

var config = {
  externals: {
    'react': reactExternal,
    'redux': reduxExternal,
    'react-redux': reactReduxExternal
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style?sourceMap',
          'css-loader'
        )
      }
    ]
  },
  output: {
    library: 'ReactReduxLoadmask',
    libraryTarget: 'umd'
  },
  plugins: [
    {
      apply: function apply (compiler) {
        compiler.parser.plugin('expression global', function expressionGlobalPlugin () {
          this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()")
          return false
        })
      }
    },
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new ExtractTextPlugin('loadmask.css', {
      allChunks: true
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  )
}

module.exports = config
