const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const common = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /build/],
                use: ['babel-loader', 'eslint-loader']
            },
            // other version with options, but without eslint
            // use: {
            //     loader: 'babel-loader',
            //     options: {
            //         presets: ['@babel/preset-env','@babel/preset-react'],
            //         plugins: ['@babel/plugin-proposal-object-rest-spread']
            //     }
            // }
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s(a|c)ss$/i,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|ico)(\?\S*)?$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    publicPath: '/src/assets/'
                }
            },
            {
                test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'url-loader?limit=100000'
            },
            {
                test: /\.(csv|tsv)$/,
                use: 'csv-loader'
            },
            {
                test: /\.xml$/,
                use: 'xml-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve('./public/index.html'),
            favicon: path.resolve('./public/favicon.ico')
        })
    ],

    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin()
        ]
     },


    performance: {
        // hints: 'warning', // false, 'error'
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};

const developmentConfig = {
    devServer: {
        contentBase: './build',
        stats: 'errors-only',
        overlay: {
            errors: true,
            warnings: true
        },
        port: 3003
    },
    // watch: true,
    devtool: 'source-map'
    // devtool: 'inline-source-map'
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
