const path = require('path');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: './dist/js/[name].min.js',
        path: path.resolve(__dirname),
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist/*']
        }),
        new MiniCssExtractPlugin({
            filename: './dist/css/style.min.css'
        })
    ],
});