const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');

const webpackCommonConfig = require('./webpack.common')
const env = require('../config/prod.env');

let pathsToClean = [
    'dist',
]

let cleanOptions = {
    root: path.resolve(__dirname, '..'),
    exclude: [],
    verbose: true,
    dry: false
}


let Minification = {
    collapseWhitespace: true,//去除空格,
    removeComments: true,//删除注释
    removeEmptyAttributes: true,//移除空属性 eg:<div id=''></div> => <div></div>
}

module.exports = merge(webpackCommonConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        // chunkFilename: '[id].[chunkhash].js'

    },
    module: {
        rules: [
            // {
            //     test: require.resolve(__dirname, '../src/main.js'),
            //     use: 'imports-loader?this=>window'
            // }
        ]
    },
    plugins: [
        /**
         * 在打包之前先删除指定文件夹里的文件或者删除整个文件夹
         */
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        /**
         * 生成html模版
         */
        new HtmlWebpackPlugin({
            title: 'a vue demo',
            filename: 'index.html',
            // template: '../dist/index.html',
            inject: 'body', //将所有js代码放置在<body>最底下，
            meta: {
                viewport: "width=device-width,initial-scale=1,shrink-to-fit=no"
            },
            minify: Minification,//如果是true则开启生产模式去最小化模版,
            hash: true,//为引入的css,js添加hash 对于缓存来说非常有用,
            cache: true,//只有当文件变化时才发射文件
            //当生成模版失败时是否显示错误
            showErrors: true,
            //Allows you to skip some chunks (e.g don't add the unit-test chunk)
            excludeChunks: ``
        }),
        /**
         * 保证vendor的hash不会随便修改
         */
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })

    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: 'single'
    }
})