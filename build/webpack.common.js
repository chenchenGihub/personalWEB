const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");






module.exports = {
    context: path.resolve(__dirname, '..'),
    entry: {
        app: './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        pathinfo: false,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        experimentalWatchApi: true,
                        appendTsSuffixTo: [/\.vue$/]
                    },
                }],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: "vue-loader",
                    options: {
                        extractCSS: true
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                  loader: 'url-loader',
                  options: {
                    limit: 10000
                  }
                }]
              }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src')
        },
        extensions: ['.ts', '.js', '.vue', '.json']
    },
    plugins: [
        /**
         * 生成html模版
         */
        new HtmlWebpackPlugin({
            title: 'a vue demo',
            filename: 'index.html',
            template: 'index.html',
            inject: 'body', //将所有js代码放置在<body>最底下，
            meta: {
                viewport: "width=device-width,initial-scale=1,shrink-to-fit=no"
            }
        }),
        new webpack.ProvidePlugin({
            join: ['lodash', 'join']
        }),
        new VueLoaderPlugin(),

    ]
}