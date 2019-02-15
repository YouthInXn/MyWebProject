/* webpack生产环境构建 */
const commonConfig = require('./webpack.config')
const merge = require('webpack-merge')
const CleanWebpackPlugins = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWepackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
/* 生产环境中默认启用了tree-shaking中的插件 用于移除上下文中未使用到的代码 */
module.exports = merge(commonConfig, {
  devtool:'source-map',
  module: {
    rules:[
      {
        test:/\.css$/,
        use:ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:'css-loader'
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugins(['dist']),
    /* 把css文件从js脚本抽离出来 */
    new ExtractTextPlugin({
      filename: 'styles/[name].[chunkhash].css'
    }),
    /* 拷贝public目录 */
    new CopyWepackPlugin([
      { from:'public', to:'public' }
    ]),
    /* 压缩优化 */
    new UglifyJSPlugin({
      cache: true
    }),
    /* 指定lib中引用哪些内容 */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
    /* 打包分析 */
    // new BundleAnalyzerPlugin()
  ]
})

