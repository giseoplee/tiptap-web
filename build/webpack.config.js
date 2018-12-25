const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    index : ['babel-polyfill', resolve('/src/client/index.js')]
  },
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=1000'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.less$/,
        use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "less-loader" }
        ]
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
    proxy: {
      '/api': 'http://localhost:9090'
    }
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      template: resolve('/public/index.html'),
      favicon: resolve('/public/assets/img/stamp.png')
    })
  ]
};
