const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const path = require("path");
const glob = require("glob");

function getAllFiles(srcDir, extension) {
  return glob.sync(`${srcDir}/**/*${extension}`);
}

module.exports = (env, argv) => {

  // variables
  const isDev = argv.mode === "development";
  const sourcePath = path.join(__dirname, "./src");
  const outPath = path.join(__dirname, "./dist");

  return {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
          rules: [
            {
              test: /\.scss$/,
              use: [
                "style-loader",
                "css-loader?modules", // translates CSS into CommonJS
                // "typings-for-css-modules-loader?modules",
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
              ]
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
              test: /\.tsx?$/,
              loader: "awesome-typescript-loader"
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
          }
        ]
    },
    plugins: [
      new webpack.DefinePlugin({
        PRODUCTION: !isDev
      }),
      new HtmlWebpackPlugin({
        template: "./index.html"
      })
    ],
    devServer: {

    }
  }
};
