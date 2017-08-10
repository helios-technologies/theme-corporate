const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './javascripts/theme.js',
  devServer: {
    contentBase: './public'
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'assets/theme.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          interpolate: true,
          root: __dirname,
          attrs: ['img:src', 'link:href']
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(ico|jpg|jpeg|gif|png)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[path][hash]-[name].[ext]',
          limit: 25000
        }
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        options: { name: 'assets/fonts/[name].[hash].[ext]' }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        options: { name: 'assets/fonts/[name].[hash].[ext]' }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
        options: { name: 'assets/fonts/[name].[hash].[ext]' }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: { name: 'assets/fonts/[name].[hash].[ext]' }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        options: { name: 'assets/fonts/[name].[hash].[ext]' }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('assets/theme.css'),
    new HtmlWebpackPlugin({
      template: 'library/index.html'
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      Tether: 'tether'
    }),
  ]
};
