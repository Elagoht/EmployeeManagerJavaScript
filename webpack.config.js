const path = require('path');

module.exports = {
  entry: ["@babel/polyfill", './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'bundles'),
    filename: 'bundle.js'
  },
  watchOptions: {
    ignored: [
      '**/node_modules/**',
      '**/api/**'
    ]
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|api)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  devServer: {
    liveReload: false,
    port: 3200,
    open: true,
    hot: true,
    static: __dirname
  }
}