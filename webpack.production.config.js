var webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./src/react-emoji",

  output: {
    library: 'ReactEmoji',
    libraryTarget: 'umd',
    path: __dirname + "/dist/",
    filename: "react-emoji.js"
  },

  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
