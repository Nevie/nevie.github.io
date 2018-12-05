const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

const config = {
    entry: ['babel-polyfill', 'whatwg-fetch', "./src/app.js"],
    output: {
        chunkFilename: '[name].bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        open: true,
        port: 9000
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
                    publicPath:'./dist'
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
            template: './src/index.html'
        }),
        new ExtractTextWebpackPlugin('style.css')

    ],
    watch: true,
};
module.exports = config;