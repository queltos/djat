let webpack = require("webpack");

module.exports = {
  entry: "./Chat/frontend/index.js",
    output: {
      path: "/vagrant/Chat/static/Chat/assets",
      filename: "bundle.js",
      sourceMapFilename: 'bundle.map'
    },
    devtool: '#source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['env', 'stage-0', 'react']
          }
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        warnings: false,
        mangle: true
      })
    ]
}