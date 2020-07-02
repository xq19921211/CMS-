'use strict'
const Path = require('path');

function resolve(dir) {
    return Path.join(__dirname, dir)
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
exports.publicPath = '/';
exports.outputDir = 'dist';
exports.assetsDir = 'static';
exports.lintOnSave = process.env.NODE_ENV === 'development';
exports.productionSourceMap = false;
exports.devServer = {
    port: 8080,
    open: true,
    overlay: {
        warnings: false,
        errors: true
    },
};
exports.configureWebpack = {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'Front End Of G-Force',
    resolve: {
        alias: {
            '@': resolve('src')
        }
    }
};
exports.chainWebpack = (config) =>{
    // set svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end();
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
        .end();
};
// module.exports = {
//     pwa: {
//         iconPaths: {
//             favicon32: 'favicon.ico',
//             favicon16: 'favicon.ico',
//             appleTouchIcon: 'favicon.ico',
//             maskIcon: 'favicon.ico',
//             msTileImage: 'favicon.ico'
//         }
//     }
// }

