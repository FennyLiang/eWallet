var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');

module.exports = {
  entry: ['babel-polyfill','./walletIndex.jsx'],
  output: {
    filename: './walletBundle.js',

  },

  devServer: {
    inline: true,
    port: 8000
  },

  resolve: {
    extensions: ['', '.js', '.jsx','css']
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',

      query:{
        presets: ["react", "es2015", "stage-0"]
      }

    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'style-loader',
        combineLoaders([{
          loader: 'css-loader',
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }])
      )
    }]

  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('walletStyles.css'),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM:'react-dom'

    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
}