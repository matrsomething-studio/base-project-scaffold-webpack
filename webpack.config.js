const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.built.[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: 'images/[name]-[hash][ext]',
        // publicPath: 'http://some-cdn.com/'
        publicPath: 'dist/' // default 'auto'
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.(ttf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.txt/,
                type: 'asset/source'
            },
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
        })
    ]
};

// Inline module as SVGs into JS code - small file
/*
    {
        test: /\.(png|jpg)$/,
        type: 'asset/inline'
    }
*/

// Asset module WebPack will decided what to use
/*
    {
        test: /\.(png|jpg)$/,
        type: 'asset',
        parser: {
            dataUrlCondition: {
                maxSize: 3 * 1024 // 3kb
            }
        }
    }
*/