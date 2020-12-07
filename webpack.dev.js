let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let { merge } = require("webpack-merge")
let common = require("./webpack.common");

module.exports = merge(common, {
    mode: "development",

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },

    devServer: {
        open: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/template.html"
        }),
    ],

    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },

            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[path]_[name]_[local]_[hash:base64:5]"
                            }
                        }
                    },
                ],
                include: /\.module\.css$/i
            },

            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                ],
                exclude: /\.module\.css$/i
            },
        ]
    }
    
})