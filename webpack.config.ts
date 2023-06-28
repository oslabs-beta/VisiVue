// //@ts-check

// 'use strict';

// const path = require('path');

// //@ts-check
// /** @typedef {import('webpack').Configuration} WebpackConfig **/

// /** @type WebpackConfig */
// const extensionConfig = {
//   target: 'node', // VS Code extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
// 	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

//   entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
//   output: {
//     // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'extension.js',
//     libraryTarget: 'commonjs2'
//   },
//   externals: {
//     vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
//     // modules added here also need to be added in the .vscodeignore file
//   },
//   resolve: {
//     // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
//     extensions: ['.ts', '.js']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: 'ts-loader'
//           }
//         ]
//       }
//     ]
//   },
//   devtool: 'nosources-source-map',
//   infrastructureLogging: {
//     level: "log", // enables logging required for problem matchers
//   },
// };
// module.exports = [ extensionConfig ];

import * as path from "path";
import * as webpack from "webpack";
import { VueLoaderPlugin } from "vue-loader";

const extConfig: webpack.Configuration = {
  target: "node",
  entry: "./src/extension.ts",
  output: {
    filename: "extension.js",
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "out"),
  },
  resolve: { extensions: [".ts", ".js", ".vue"] },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
      // { test: /\.vue$/, loader: "vue-loader" },
    ],
  },
  externals: { vscode: "vscode" },
  // plugins: [new VueLoaderPlugin()],
};

const webviewConfig: webpack.Configuration = {
  target: "web",
  entry: "./src/webview/main.js", // ENTRY FILE: CHANGE FOR VUE
  output: {
    filename: "[name].wv.js",
    path: path.resolve(__dirname, "out"),
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".scss", ".vue"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: ["babel-loader", "ts-loader"] },
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};

export default [webviewConfig, extConfig];