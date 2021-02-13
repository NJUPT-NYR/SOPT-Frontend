var path = require("path"),
  webpack = require("webpack"),
  nodeExternals = require("webpack-node-externals"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  transformCssModuleBabelPlugin = require("./plugins/transform-css-module.babel");

var htmlTemplate = `<!DOCTYPE html>
<html <%- helmet.htmlAttributes.toString() %> >
  <head>
    <%- helmet.title.toString() %>
    <%- helmet.meta.toString() %>
    <%- helmet.link.toString() %>
  </head>
  <body <%- helmet.bodyAttributes.toString() %> >
    <div id="root"><%- content %></div>
  </body>
  <script>
    window.__PRERENDER_INIT_PAGE_PROPS__ = "<%- initPageProps %>";
  </script>
</html>
`;

/**
 * @type {import("webpack").Configuration}
 */
var serverConfig = {
  mode: process.env.NODE_ENV,
  target: "node",
  entry: {
    server: path.resolve("./src/server.ts"),
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: (path) => !/\.module\.css$/.test(path) && /\.css$/.test(path),
        use: "ignore-loader",
      },
      {
        test: /module\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          // "postcss-loader",
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    node: "14.15.4",
                  },
                },
              ],
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              "@babel/plugin-proposal-class-properties",
              transformCssModuleBabelPlugin,
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              emitFile: false,
              outputPath: "static/images",
              publicPath: "/static/images/",
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve("./build/server"),
  },
  externals: [nodeExternals({ allowlist: ["react"] })],
  plugins: [
    new webpack.CleanPlugin(),
    new webpack.DefinePlugin({
      STATIC_FILE_PATH: String("'../client/static'"),
      ENALBE_SERVER_CLUSTER:
        String(process.env.ENALBE_SERVER_CLUSTER).toLowerCase() === "true",
      SERVER_PORT: Number(process.env.SERVER_PORT),
      ENABLE_MOCK: process.env.ENABLE_MOCK,
      API_GATEWAY_URL: process.env.API_GATEWAY_URL,
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx"],
    alias: {
      "@": path.resolve("./src"),
    },
  },
  devtool: false,
  stats: "minimal",
};

/**
 * @type {import("webpack").Configuration}
 */
var clientConfig = {
  mode: process.env.NODE_ENV,
  target: "web",
  entry: {
    index: path.resolve("./src/index.tsx"),
  },
  output: {
    path: path.resolve("./build/client"),
    filename: "static/js/[name].js",
    publicPath: "/",
  },
  plugins: [
    new webpack.CleanPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/css/[name]_[chunkhash].css",
      chunkFilename: "static/css/[id]_[chunkhash].css",
    }),
    new HtmlWebpackPlugin({
      templateContent: htmlTemplate,
      filename: "index.html",
    }),
    new webpack.DefinePlugin({
      SERVER_PORT: Number(process.env.SERVER_PORT),
      ENABLE_MOCK: process.env.ENABLE_MOCK,
      API_GATEWAY_URL: process.env.API_GATEWAY_URL,
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx"],
    alias: {
      "@": path.resolve("./src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "> 0.25%, not dead",
                },
              ],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },
      {
        test: (path) => !/\.module\.css$/.test(path) && /\.css$/.test(path),
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              outputPath: "static/images",
              publicPath: "/static/images/",
            },
          },
        ],
      },
    ],
  },
  devtool: false,
  stats: "minimal",
};

module.exports = {
  commonServerConfig: serverConfig,
  commonClientConfig: clientConfig,
};
