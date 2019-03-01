const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './src/js/index.js',
    './src/scss/style.scss'
  ],
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'js/bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'env'
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/style.css',
            }
          },

          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader?-url'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            name: 'index.html'
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    }),
    new CopyWebpackPlugin([
      {from: './src/img', to: path.resolve(__dirname, './dist/img')},
      {from: './src/favicon', to: path.resolve(__dirname, './dist/favicon')},
      {from: './src/fonts', to: path.resolve(__dirname, './dist/fonts')},
    ])
  ]
};