/* webpack开发环境构建 */
/* global __dirname */
const merge = require('webpack-merge')
const commonConfig = require('./webpack.config')
const path = require('path')
const webpack = require('webpack')

module.exports = merge(commonConfig, {
  // 添加开发工具SourceMap，源文件映射，协助开发
  devtool: 'inline-source-map',
  output:{
    /* 这里本该使用chunkhash，否则分离白做了，每次修改代码hash都会变，只在开发环境下 */
    filename: '[name].js',
    publicPath:'/'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[ 'style-loader', 'css-loader' ]
      },
    ]
  },
  // webpack-dev-server 文件服务器配置(使用CLI方式配置)
  devServer: {
    /* 在还未开发服务端情况下，所有404被代替为index.html */
    historyApiFallback:true,
    contentBase:path.join(__dirname, './dist'),
    /* 支持手机访问 */
    host:'0.0.0.0',
    // 端口
    port:3001,
    // 都做gzip压缩
    // compress:true,
    // 模块热加载
    hot:true,
    // 默认启动打开浏览器
    open:false,
    // 打印进度(CLI)
    // progress:false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
