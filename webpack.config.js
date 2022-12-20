const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HandlebarsPlugin = require('handlebars-webpack-plugin');

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: 'assets/built/main.built.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader', 
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // 'style-loader', 
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'sass-loader' // envoked top > botton
                ]
            }
        ]
    },
    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css'
        }),
        new CopyPlugin ({
            patterns: [
                { from: './assets', to: './' },
            ]
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), 'src', 'hbs', 'index*.{html,hbs}'),
            output: path.join(process.cwd(), 'dist', '[name].php'),
            helpers: {
                nameOfHbsHelper: Function.prototype,
                projectHelpers: path.join(process.cwd(), 'src', 'helpers', '*.helper.js')
            }
        })
    ]
};