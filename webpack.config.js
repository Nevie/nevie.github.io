const path = require('path');
require("babel-register");
const webpack = require('webpack');

const config = {

    entry: ['babel-polyfill','whatwg-fetch', "./src/app.js"],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }],
            },
        ]
    },
  plugins : [
       new webpack.ProvidePlugin({
           Promise: 'exports-loader?self.Promise!es6-promise/dist/es6-promise',
           fetch: 'exports-loader?self.fetch!whatwg-fetch/dist/fetch.umd',       }),
    ],
    watch: true,
};
// Exports
module.exports = config;