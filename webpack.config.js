// Path
const path = require('path');


// Plugins
const CopyPlugin = require("copy-webpack-plugin");
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const HandlebarsLayouts = require('handlebars-layouts');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');


// Config
module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: 'assets/built/scripts/[name].built.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'production',
    module: {
        rules: [{
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        envName: 'production'
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new TerserPlugin({
            terserOptions: {
                format: {
                    comments: false,
                },
            },
            extractComments: false,
        }),
        new CopyPlugin({
            patterns: [{
                from: './assets',
                to: './'
            }, ]
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), 'src', 'hbs', '**', 'index*.{html,hbs}'),
            output: path.join(process.cwd(), 'dist', '[path]', '[name].html'),
            data: require('./data/config.json'),
            partials: [
                path.join(process.cwd(), 'src', 'hbs', '**', '*.hbs')
            ],
            helpers: {
                projectHelpers: path.join(process.cwd(), 'src', 'helpers', '*.helper.js')
            },
            onBeforeSetup: function(Handlebars) {
                Handlebars.registerHelper(HandlebarsLayouts(Handlebars));
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/built/styles/[name].built.css'
        })
    ]
};