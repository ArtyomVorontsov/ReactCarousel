let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/index.js",
        vendor: "./src/vendor.js"
    },


    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|jpg|jpeg|png|webp)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs",
                        publicPath: './imgs/'
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                //exclude: "./node_modules",
                use: {
                    loader: "babel-loader"
                }
            }

        ]
    }



}