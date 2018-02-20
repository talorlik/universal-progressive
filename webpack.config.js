const path = require("path");
var nodeExternals = require("webpack-node-externals");
var copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    server: "./src/server.ts"
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "main.server": path.join(__dirname, "dist", "server", "main.bundle.js")
    }
  },
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  plugins: [
    new copyWebpackPlugin([{
        from: './ssl', to: './ssl'
    }])
  ],
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }]
  }
};
