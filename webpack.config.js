// Imports
const path = require('path');
//const htmlWebpackPlugin = require('html-webpack-plugin');
require("babel-register");
const webpack = require('webpack'); //to access built-in plugins

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const isProd = env === 'production';

const config = {
    entry: ['babel-polyfill', "./src/app.js"],

    // Output
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    // Loaders
    module: {
        rules: [
            // JavaScript/JSX Files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }],
            },
        ]
    },
  /* plugins : [
       new webpack.ProvidePlugin({
           Promise: 'es6-promise-promise',
           fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
       }),
    ],*/
    watch: true,
};
// Exports
module.exports = config;