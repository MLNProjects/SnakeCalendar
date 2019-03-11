const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const path = require("path");

module.exports = (env, argv) => {

  // variables
  const isDev = argv.mode === "development";
  const sourcePath = path.join(__dirname, "./src");
  const outPath = path.join(__dirname, "./dist");

  return {
    node: {
      fs: 'empty'
    },
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
    },

    module: {
      rules: [{
          test: /\.scss$/,
          use: [
            "style-loader",
            'typings-for-css-modules-loader?modules&namedExport&sass',
            // "typings-for-css-modules-loader?modules",
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
        },
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader"
        },
        {
          test: /\.(jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(a?png|svg)$/,
          use: "url-loader?limit=10000"
        },
        {
          test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
          use: "file-loader"
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
      disableHostCheck: true
    }
  }
};
