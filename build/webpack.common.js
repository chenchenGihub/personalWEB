const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let pathsToClean = [
    'dist',
]

let cleanOptions = {
    root: path.resolve(__dirname, '..'),
    exclude: [],
    verbose: true,
    dry: false
}

module.exports = {
    context: path.resolve(__dirname, '..'),
    mode: 'none',
    entry: {
        app: './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        pathinfo: false,
        publicPath:'/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        experimentalWatchApi: true,
                        appendTsSuffixTo:[/\.vue$/]
                    },
                }],
                exclude:/node_modules/
            },
            {
                test:/\.scss$/,
                use:['vue-style-loader','style-loader','css-loader','sass-loader'],
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                use: [{
                    loader:"vue-loader"
                }],
                exclude:/node_modules/
            }
        ]
    },
    resolve:{
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
          },
          extensions: ['.ts', '.js', '.vue', '.json']
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
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            meta: {
                viewport: "width=device-width,initial-scale=1,shrink-to-fit=no"
            },
            //当生成模版失败时是否显示错误
            showErrors:true,
            //Allows you to skip some chunks (e.g don't add the unit-test chunk)
            excludeChunks:``,
            favicon:''
        }),
        new webpack.ProvidePlugin({
            join: ['lodash', 'join']
        }),
        new VueLoaderPlugin()
    ]
}