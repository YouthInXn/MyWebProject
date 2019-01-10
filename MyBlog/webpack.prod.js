/* webpack生产环境构建 */
const commonConfig = require('./webpack.config')
const merge = require('webpack-merge')
const CleanWebpackPlugins = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
      filename:'[name].[chunkhash].css',
      allChunks:true
    }),
    new BundleAnalyzerPlugin()
  ],
})

