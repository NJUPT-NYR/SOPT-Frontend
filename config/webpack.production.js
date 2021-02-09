var { commonClientConfig, commonServerConfig } = require("./webpack.common"),
  { merge } = require("webpack-merge"),
  TerserPlugin = require("terser-webpack-plugin");

/**
 * @type {import("webpack").Configuration}
 */
var serverConfig = merge(commonServerConfig, {
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: true,
        test: /\.(js|ts|jsx|tsx)(\?.*)?$/i,
      }),
    ],
  },
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
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: true,
        test: /\.(js|ts|jsx|tsx)(\?.*)?$/i,
      }),
    ],
  },
});

module.exports = [clientConfig, serverConfig];
