let common = require("./webpack.common");
let path = require("path");
let { merge } = require("webpack-merge")
let HtmlWebpackPlugin = require("html-webpack-plugin");
let TerserWebpackPlugin = require("terser-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = merge(common, {
    mode: "production",

    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },

    

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "index.css",
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/template.html",
            minify: {
                removeAttributeQuotes: true,
                removeComments: true,
                collapseWhitespace: true
            }
        }),
    ],
    
    optimization: {
        minimize: true,
        minimizer: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./src/template.html",
                minimizer: {

                }
            }),
            new TerserWebpackPlugin({
                test: /\.js(\?.*)?$/i,
            }),
            new OptimizeCssAssetsWebpackPlugin()],
           
    },

    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
            },

            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    },
                    
                ],
                include: /\.module\.css$/i
            },

            

            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
                exclude: /\.module\.css$/i
            },
            
            
        ]
    }
})