
import * as path from "path";
import * as webpack from "webpack";
import { VueLoaderPlugin } from "vue-loader";

const extConfig: webpack.Configuration = {
  mode: "development",
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
  mode: "development",
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