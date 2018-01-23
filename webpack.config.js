"use strict";
var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
var htmlWebPackPlugin=require('html-webpack-plugin');

var config = {
    devtool: 'source-map',
    entry: SRC_DIR + "/main.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/"
    },
    plugins: [
      new htmlWebPackPlugin({
          template:'./src/index.html',
          filename:'index.html',
          minify:{
            removeComments:true
          }
      })],
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loaders: ['babel-loader']
            },
            {
                test: /\.*css$/,
                include: SRC_DIR,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                include: SRC_DIR,
                loader: 'url-loader?limit=819&name=images/[name].[ext]'
            },
            {
                test:/\.json$/,
                include: SRC_DIR,
                loader:'json-loader?name=JSON/[name].json'
            },
            {
                 test:/\.tpl\.html$/,
                 include: SRC_DIR,
                 loader: 'html-loader'
            }
        ]
    }
};

module.exports = config;