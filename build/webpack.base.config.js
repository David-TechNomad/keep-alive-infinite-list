const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { VueLoaderPlugin } = require("vue-loader");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProd ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: isProd ? "[name].js" : "[name].[chunkhash].js",
  },
  resolve: {
    alias: {
      public: path.resolve(__dirname, "../public"),
    },
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.css$/,
        use: isProd ? ["css-loader"] : ["vue-style-loader", "css-loader"],
      },
    ],
  },
  plugins: isProd
    ? [new VueLoaderPlugin()]
    : [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
          template: "src/index.template.html",
        }),
      ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: isProd ? "" : "inline-source-map",
};
