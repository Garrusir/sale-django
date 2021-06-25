const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = __dirname + '/src';
const DIST_DIR = __dirname + '/static/frontend/';

module.exports = {
    watch: true,
    entry: [
        SRC_DIR + '/index.js',
    ],
    output: {
        path: DIST_DIR,
        publicPath: '/',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(scss|sass|css)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]___[hash:base64:5]'
                            },
                            sourceMap: true,
                            importLoaders: 1,
                        }
                    },
                    'sass-loader',
                ]
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        // new HtmlWebpackPlugin({
        //     template: SRC_DIR + '/index.html',
        //     filename: './index.html'
        // })
    ],
    devServer: {
        contentBase: DIST_DIR,
        hot: true,
        port: 9000
    }
};
