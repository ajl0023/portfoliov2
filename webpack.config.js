const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");
module.exports = {
  mode: "development",
  entry: "./src/index.js",

  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        exclude: /\.module\.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                compileType: "icss",
              },
            },
          },
          "sass-loader",
          // Translates CSS into CommonJS

          // Compiles Sass to CSS
        ],
      },
      {
        test: /\.module\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                compileType: "module",
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg/,
        type: "asset/inline",
        generator: {
          dataUrl: (content) => {
            
            content = content.toString();
            return content;
          },
        },
      },
    ],
  },

  devtool: "inline-source-map",

  devServer: {
    contentBase: "./dist",
    watchContentBase: true,
    hot: true,
    inline: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/test.html" })],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
