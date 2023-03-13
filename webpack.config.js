const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader", //all the js files will be handeled by this loader
        exclude: /node_modules/,
        query: {
          //   presets: ["react", "es2015"],
          //   plugins: ["transform-class-properties"],
        },
      },
      //   {
      //     test: /\.css$/,
      //     exclude: /node_modules/,
      //     use: [
      //       //this is the long form, if you want to apply muliple loaders and configs
      //     ],
      //   },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};
