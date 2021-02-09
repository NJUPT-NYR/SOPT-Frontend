var { commonClientConfig, commonServerConfig } = require("./webpack.common"),
  { merge } = require("webpack-merge"),
  NodemonPlugin = require("nodemon-webpack-plugin");

/**
 * @type {import("webpack").Configuration}
 */
var serverConfig = merge(commonServerConfig, {
  plugins: [new NodemonPlugin()],
});

/**
 * @type {import("webpack").Configuration}
 */
var clientConfig = merge(commonClientConfig, {
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          name: "vendor",
        },
      },
    },
  },
});

module.exports = [clientConfig, serverConfig];
