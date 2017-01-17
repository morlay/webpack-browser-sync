const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    app: './main.js',
  },
  output: {
    path: path.resolve('./public/__built__'),
    publicPath: '/__built__/',
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
    }),
  ],
  // devServer: {
  //   browserSync: {
  //     https: true,
  //   },
  // },
};
