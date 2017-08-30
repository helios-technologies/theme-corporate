const path = require('path')
const glob = require('glob')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

var plugins = [
  new ExtractTextPlugin({
    filename: 'theme.css'
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Tether: 'tether',
    bootstrap: 'bootstrap'
  }),
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'})
]

glob.sync('library/{,ecommerce/,docs/,blog/}*.html').forEach((page) => {
  var pageName = path.basename(page).replace('.html', '')

  // 'index-app' -> 'Index App'
  var title = pageName
    .replace('-', ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())

  plugins.push(
    new HtmlWebpackPlugin({
      title: title,
      pageName: pageName,
      filename: path.relative('library', page),
      inject: 'head',
      template: path.resolve(__dirname, page)
    })
  )
})

module.exports = {
  cache: true,
  entry: {
    js: './javascripts/theme.js',
    vendor: ['bootstrap', 'jquery', 'tether']
  },
  devServer: {
    contentBase: './public'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'theme.js'
  },
  module: {
    loaders: [{
      test: /.html$/,
      loader: 'html-loader',
      options: {
        interpolate: true,
        root: path.resolve(__dirname),
        attrs: [':src']
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
        name: 'images/[path][hash]-[name].[ext]',
        limit: 25000
      }
    },
    {
      test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000',
      options: { name: 'fonts/[name].[hash].[ext]' }
    }]
  },
  plugins: plugins
}
