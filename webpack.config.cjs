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

const babelLoader = {
  rules: [
    {
      test: /\.(js|jsx)$/, // Fixing the typo here: `.` -> `\.` to match file extensions
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
      type: "asset/resource", // Built-in Webpack 5 asset handling
    },
  ],
};

const resolve = {
  extensions: [".js", ".jsx"], // Resolves `.js` and `.jsx` without explicitly specifying the extension
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
    rules: babelLoader.rules, // Fix: ensure `module` uses `rules` directly
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
    publicPath: "/static/", // Ensure trailing slash to correctly resolve paths
    filename: "client.js",
    assetModuleFilename: "assets/[hash][ext][query]", // Output images to `dist/assets/`
  },
  module: {
    rules: babelLoader.rules, // Fix: ensure `module` uses `rules` directly
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/client/index.html"), // Use `path.join` for consistency
    }),
  ],
  resolve,
};

module.exports = [serverConfig, clientConfig];
