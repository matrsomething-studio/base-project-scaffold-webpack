// Path
const path = require('path');


// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const HandlebarsLayouts = require('handlebars-layouts');


// Config
module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: 'assets/built/scripts/main.built.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.(scss)$/,
            use:  [
                'style-loader', 
                MiniCssExtractPlugin.loader, 
                'css-loader',
                'sass-loader' // envoked top > botton
            ]
        }]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: './assets',
                to: './'
            }, ]
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), 'src', 'hbs', 'index*.{html,hbs}'),
            output: path.join(process.cwd(), 'dist', '[name].html'),
            data: require('./data/config.json'),
            partials: [
                path.join(process.cwd(), 'src', 'hbs', '*', '*', '*.hbs')
            ],
            helpers: {
                projectHelpers: path.join(process.cwd(), 'app', 'helpers', '*.helper.js')
            },
            onBeforeSetup: function(Handlebars) {
                Handlebars.registerHelper(HandlebarsLayouts(Handlebars));
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/built/styles/main.built.css'
        })
    ]
};