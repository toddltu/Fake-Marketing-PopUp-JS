const path = require('path');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: './assets/js/[name].min.js',
        path: path.resolve(__dirname),
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./assets/js/*.min.js','./assets/css/style.min.*']
        }),
        new MiniCssExtractPlugin({
            filename: './assets/css/style.min.css'
        })
    ],
});