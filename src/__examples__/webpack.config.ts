import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
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
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                declaration: false,
              },
            },
          },
        ],
      },
    ],
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

export = conf;
