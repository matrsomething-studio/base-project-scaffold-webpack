const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const HandlebarsLayouts = require('handlebars-layouts');


module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: 'assets/built/scripts/main.built.js',
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
            filename: 'assets/built/styles/main.built.css'
        }),
        new CopyPlugin ({
            patterns: [
                { from: './assets', to: './' },
            ]
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), 'src', 'hbs', 'index*.{html,hbs}'),
            output: path.join(process.cwd(), 'dist', '[name].php'),
            data: require('./data/config.json'),
            partials: [
                path.join(process.cwd(), 'src', 'hbs', '*', '*', '*.hbs')
            ],
            helpers: {
                projectHelpers: path.join(process.cwd(), 'app', 'helpers', '*.helper.js')
            },
            onBeforeSetup: function (Handlebars) {
                Handlebars.registerHelper(HandlebarsLayouts(Handlebars));
            }
        })
    ]
};