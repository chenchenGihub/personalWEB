const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackCommonConfig = require('./webpack.common')
const portfinder = require('portfinder');
const ip = require('ip');
const NotifierPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let pathsToClean = [
    'dist',
]

let cleanOptions = {
    root: path.resolve(__dirname, '..'),
    exclude: [],
    verbose: true,
    dry: false
}

const WebpackDevConfig = merge(webpackCommonConfig, {
    mode:'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'vue-style-loader',
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        //也可以使用数组，从多个目录提供内容
        contentBase: path.resolve(__dirname, '../dist'),
        compress: true,
        //访问白名单,允许访问
        allowedHosts: [
            '.xxx.com'
        ],
        //此选项在启动时，通过 ZeroConf 网络广播服务
        bonjour: true,
        //当使用内联模式(inline mode)时，会在开发工具(DevTools)的控制台(console)显示消息，例如：在重新加载之前，在一个错误之前，或者模块热替换(Hot Module Replacement)启用时。这可能显得很繁琐
        clientLogLevel: 'info',
        //设置为 true 时，此选项绕过主机检查。不建议这样做，因为不检查主机的应用程序容易受到 DNS 重新连接攻击。
        disableHostCheck: true,
        //在惰性模式中，此选项可减少编译。 默认在惰性模式，每个请求结果都会产生全新的编译。使用 filename，可以只在某个文件被请求时编译
        //lazy: true,
        // filename: 'app.js',
        //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
        historyApiFallback: {
            rewrites: [
                { from: /^\/error/, to: path.resolve(__dirname, '../src/404.html') }
            ],
        },
        host: '0.0.0.0',
        port: 9100,
        //开启热模块替换若不使用webpack.HotModuleReplacementPlugin则需要在cli里添加--hot
        // hot: false,
        //自动打开浏览器
        open: false,
        https: false,
        index: 'index.htm',
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://xxxx:3000',
            }
        },
        //   public:'/',
        /**
         *  necessary for FriendlyErrorsPlugin
         */
        quiet: true,
        useLocalIp: true,
        watchContentBase: true,
    },
    plugins: [
        /**
         * 在打包之前先删除指定文件夹里的文件或者删除整个文件夹
         */
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
})

module.exports = new Promise((resolve, reject) => {

    portfinder.basePort = process.env.PORT || 9100;

    portfinder.getPortPromise()
        .then(port => {
            for (let plugin of WebpackDevConfig.plugins) {
                if (plugin.constructor.name === 'HtmlWebpackPlugin') {
                    plugin.options = Object.assign(plugin.options, { chunksSortMode: 'none' })
                }
            }
            process.env.PORT = port;
            WebpackDevConfig.devServer.port = port;
            WebpackDevConfig.plugins.push(
                new NotifierPlugin({
                    compilationSuccessInfo: {
                        messages: [`你的应用运行在 ${WebpackDevConfig.devServer.https ? 'https' : 'http'}://${ip.address()}:${port}`],
                        notes: [`Congradulation!!! ${'😄'} ${'😄'} ${'😄'} ${'😄'}`]
                    },
                    onErrors: (severity, errors) => {
                        if (severity !== 'error') return;
                        const error = errors[0];
                        notifier.notify({
                            title: "应用报错信息如下",
                            message: severity + ': ' + error.name,
                            subtitle: error.file || '',
                            icon: path.resolve(__dirname, 'logo.png')
                        });
                    }
                })
            )

            resolve(WebpackDevConfig)
        })
        .then(err => {
            reject(err)
        })
});