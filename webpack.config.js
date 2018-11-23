const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

const config = {
    entry: ['babel-polyfill', 'whatwg-fetch', "./src/app.js"],
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
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader'
                        }],
                    publicPath:'/dist'
                }),
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'exports-loader?self.Promise!es6-promise/dist/es6-promise',
            fetch: 'exports-loader?self.fetch!whatwg-fetch/dist/fetch.umd',
        }),
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            minify:{
                collapseWhitespace:true
            },
            hash: true,
            template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new ExtractTextWebpackPlugin('style.css')

    ],
    watch: true,
};
module.exports = config;