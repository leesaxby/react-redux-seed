const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: [
        'react-hot-loader/patch',
        './src/index.js'
    ],
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        },{
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true,
                          // More optimisations can be found here: https://github.com/tcoopman/image-webpack-loader#usage.
                          webp: {
                            quality: 75
                          }
                    },
                },
            ]
        }]
    },
  plugins: [
      new CleanWebpackPlugin(['../dist'], { allowExternal: true }),
      new ExtractTextPlugin('theme.css'),
      new HtmlWebpackPlugin({
          template: './src/index.html',
          inject: 'body',
      }),
      new ScriptExtHtmlWebpackPlugin({
          defaultAttribute: 'defer'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor.js',
        // Only include modules in vendor which are being imported i.e import { keys } from 'lodash/keys'.
        // Here we will only include the keys method and not the entire lodash lib.
        minChunks: module => /node_modules/.test(module.resource)
      }),
      new webpack.optimize.CommonsChunkPlugin({
          name: 'runtime'
      }),
      new DashboardPlugin()
  ]
};