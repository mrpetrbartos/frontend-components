const { SourceMapDevToolPlugin, HotModuleReplacementPlugin } = require('webpack');
const ESLintPlugin = new(require('eslint-webpack-plugin'))();
const ProvidePlugin = new(require('webpack').ProvidePlugin)({
    process: 'process/browser.js',
    Buffer: [ 'buffer', 'Buffer' ]
});

const SourceMapsPlugin = new SourceMapDevToolPlugin({
    test: /src\/.*\.js$/i,
    exclude: /(node_modules|bower_components)/i,
    filename: `sourcemaps/[name][hash].js.map`
});
const ExtractCssWebpackPlugin = new(require('mini-css-extract-plugin'))({
    chunkFilename: 'css/[name].[contenthash].css',
    filename: 'css/[name].[contenthash].css'
});
const CleanWebpackPlugin = new(require('clean-webpack-plugin').CleanWebpackPlugin)();
const WebpackHotModuleReplacement = new HotModuleReplacementPlugin();

module.exports = ({
    rootFolder,
    appDeployment,
    htmlPlugin,
    replacePlugin,
    insights,
    modules
} = {}) => {
    const HtmlWebpackPlugin = new(require('html-webpack-plugin'))({
        title: 'My App',
        filename: 'index.html',
        template: `${rootFolder || ''}/src/index.html`,
        ...htmlPlugin || {}
    });

    const HtmlReplaceWebpackPlugin = new(require('html-replace-webpack-plugin'))([
        {
            pattern: '@@env',
            replacement: appDeployment || ''
        },
        ...replacePlugin || []
    ]);

<<<<<<< HEAD
=======
    const SitemapGenerator = new(require('./sitemap-plugin'))(rootFolder);

    const ChunkMapper = new(require('../chunk-mapper'))({ modules: [
        insights.appname,
        ...modules || []
    ] });

>>>>>>> 0f1f85b0... Add chunk-mapper plugin
    return [
        SourceMapsPlugin,
        ExtractCssWebpackPlugin,
        CleanWebpackPlugin,
        HtmlWebpackPlugin,
        HtmlReplaceWebpackPlugin,
        WebpackHotModuleReplacement,
        ESLintPlugin,
        ProvidePlugin,
        ChunkMapper
    ];
};
