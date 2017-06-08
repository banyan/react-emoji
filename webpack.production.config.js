var webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./src/index.js",

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
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
