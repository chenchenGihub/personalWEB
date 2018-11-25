const path = require('path');
const os = require('os');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackCommonConfig = require('./webpack.common')
const env = require('../config/prod.env');

let Minification = {
    collapseWhitespace: true,//去除空格,
    removeComments: true,//删除注释
    removeEmptyAttributes: true,//移除空属性 eg:<div id=''></div> => <div></div>
}

let pathsToClean = [
    'dist',
]

let cleanOptions = {
    root: path.resolve(__dirname, '..'),
    exclude: [],
    verbose: true,
    dry: false
}

module.exports = merge(webpackCommonConfig, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    'sass-loader'
                ],
                exclude: /node_modules/
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                styles: {
                    name: 'styles',
                    test: /\.(sa|sc|c)ss$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        runtimeChunk: 'single',
        minimizer: [
            new UglifyJSPlugin({
                test: /\.js$/i,
                include: path.resolve(__dirname, '..dist'),
                sourceMap: true,
                uglifyOptions: {
                    /**
                     * 并发数默认cpu核数减一,加快构建速度
                     */
                    parallel: os.cpus().length,
                    // ecma: 8,
                    parse: {},
                    warnings: false,
                    compress: {},
                    mangle: true,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                },
            }),
            new OptimizeCSSAssetsPlugin({
                test: new RegExp(
                    '\\.(' +
                    ['scss', 'css'].join('|') +
                    ')$'
                ),
                filename: '[path].gz[query]',
                cache: true,
                algorithm: 'gzip',
                threshold: 1000,
                minRatio: 0.8,
                deleteOriginalAssets: true
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
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
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }),
        // new webpack.DllReferencePlugin({
        //     context: path.resolve(__dirname,'..'),
        //     manifest: require('../dist/dll/vue.manifest.json')
        //   })
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            // chunkFilename: '[id].[hash].css',
        })
    ]
})