const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base.config");

const config = merge(base, {
  entry: {
    app: "./src/app.js",
  },
  resolve: {
    alias: {},
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.VUE_ENV": '"client"',
    }),
  ],
});

module.exports = config;
