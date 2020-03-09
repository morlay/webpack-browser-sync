//@ts-ignore
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";

const conf: Configuration = {
  context: __dirname,
  entry: {
    app: "./main.ts",
  },
  output: {
    path: path.resolve("./public/__built__"),
    publicPath: "/__built__/",
    filename: "[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "../index.html",
    }),
  ],
  // devServer: {
  //   browserSync: {
  //     https: true,
  //   },
  // },
};

module.exports = conf;
