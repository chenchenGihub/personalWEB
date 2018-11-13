const webpackDevConfig = require('./webpack.prod');
const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');

const spinner = ora('生产环境编译中....');

spinner.start();


webpack(webpackDevConfig, (err, status) => {
    spinner.stop()
    if (err) throw err;

    process.stdout.write(status.toString({
        colors: true,
        modules: false,
        children: true, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (status.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(chalk.cyan(`#######\n编译成功\n######.\n`))
      

})


