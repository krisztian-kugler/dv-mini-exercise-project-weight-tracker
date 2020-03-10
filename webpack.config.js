const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "@core": path.resolve(__dirname, "src/app/core"),
      "@event-emitter": path.resolve(__dirname, "src/libs/event-emitter")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
