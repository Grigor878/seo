// const path = require('path')
// const webpack = require('webpack')
// const htmlWebpackPlugin = require('html-webpack-plugin')

// const babelLoader = {
//     rules: [
//         {
//             test: /.(js|jsx)$/,
//             exclude: /node_modules/,
//             use: {
//                 loader: "babel-loader",
//                 options: {
//                     presets: ['@babel/preset-env',
//                         ['@babel/preset-react', { 'runtime': 'automatic' }]
//                     ]
//                 }
//             }
//         }
//     ]
// }

// const resolve = {
//     extensions: ['.js', '.jsx']
// }

// const serverConfig = {
//     target: 'node',
//     mode: 'development',
//     entry: './src/server/server.jsx',
//     output: {
//         path: path.join(__dirname, '/dist'),
//         filename: 'server.cjs'
//     },
//     module: babelLoader,
//     plugins: [
//         new webpack.EnvironmentPlugin({
//             PORT: 3001
//         })
//     ],
//     resolve
// }

// const clientConfig = {
//     target: 'web',
//     mode: 'development',
//     entry: './src/client/index.jsx',
//     output: {
//         path: path.join(__dirname, './dist'),
//         publicPath: '/static',
//         filename: 'client.js'
//     },
//     module: babelLoader,
//     plugins: [
//         new htmlWebpackPlugin({
//             template: `${__dirname}/src/client/index.html`
//         })
//     ],
//     resolve
// }

// module.exports = [serverConfig, clientConfig]

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const babelLoader = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
        },
      },
    },
    {
      // Image rule
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: "asset/resource",
    },
    // {
    //   // SCSS rule
    //   test: /\.scss$/,
    //   use: [
    //     process.env.NODE_ENV === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
    //     "css-loader",   // Resolves CSS imports and URLs
    //     "sass-loader",  // Compiles SCSS to CSS
    //   ],
    // },
    {
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        'css-loader'
      ],
    },
  ],
};

const resolve = {
  extensions: [".js", ".jsx", ".scss"],
};

const serverConfig = {
  target: "node",
  mode: "development",
  entry: "./src/server/server.jsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "server.cjs",
    publicPath: "/static/",
  },
  module: {
    rules: babelLoader.rules,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PORT: 3001,
    }),
  ],
  resolve,
};

const clientConfig = {
  target: "web",
  mode: "development",
  entry: "./src/client/index.jsx",
  output: {
    path: path.join(__dirname, "./dist"),
    publicPath: "/static/",
    filename: "client.js",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  module: {
    rules: babelLoader.rules,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/client/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", // Output CSS files
    }),
  ],
  resolve,
};

module.exports = [serverConfig, clientConfig];
