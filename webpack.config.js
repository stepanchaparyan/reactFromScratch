const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const common = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: [/node_modules/, /build/], use: ['babel-loader', 'eslint-loader'] },
            { test: /\.css$/, exclude: /node_modules/, use: ['style-loader', 'css-loader'] },
            { test: /\.s[ac]ss$/i, exclude: /node_modules/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|png|svg)$/, exclude: /node_modules/, loader: 'file-loader', options: { name: 'images/[name].[ext]' } }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./public/index.html'),
            favicon: path.resolve('./public/favicon.ico')
        })
    ]
};

const developmentConfig = {
    devServer: {
        stats: 'errors-only',
        overlay: {
            errors: true,
            warnings: true
        },
        port: 3003
    }
    // watch: true
    // devtool: 'source-map'
};

module.exports = function (env) {
    if (env === 'production') {
        return common;
    }
    if (env === 'development') {
        return merge([
            common,
            developmentConfig
        ]);
    }
};
