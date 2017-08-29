const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './javascripts/theme.js',
  devServer: {
    contentBase: './public'
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    publicPath: '/',
    filename: 'theme.js'
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
          name: '[path][hash]-[name].[ext]',
          limit: 25000
        }
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        options: { name: 'fonts/[name].[hash].[ext]' }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        options: { name: 'fonts/[name].[hash].[ext]' }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
        options: { name: 'fonts/[name].[hash].[ext]' }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: { name: 'fonts/[name].[hash].[ext]' }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        options: { name: 'fonts/[name].[hash].[ext]' }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('theme.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": "jquery",
      Tether: 'tether'
    }),
  ]
};

glob.sync('library/*.html').forEach((page) => {
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: path.basename(page),
      template: page,
      inject: 'head'
    })
  )
});

glob.sync('library/docs/*.html').forEach((page) => {
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: path.join('docs', path.basename(page)),
      template: page
    })
  )
});

glob.sync('library/ecommerce/*.html').forEach((page) => {
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: path.join('ecommerce', path.basename(page)),
      template: page
    })
  )
});

glob.sync('library/blog/*.html').forEach((page) => {
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: path.basename(page),
      template: page
    })
  )
});

module.exports = config;
