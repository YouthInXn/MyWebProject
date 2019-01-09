/* webpack开发环境构建 */
/* global __dirname */
const merge = require('webpack-merge')
const commonConfig = require('./webpack.config')
const path = require('path')
const webpack = require('webpack')

module.exports = merge(commonConfig, {
  entry: {
    app:[
      // 'babel-polyfill',
      'react-hot-loader/patch'
    ]
  },
  // 添加开发工具SourceMap，源文件映射，协助开发
  devtool: 'inline-source-map',
  output:{
    /* 这里本该使用chunkhash，否则分离白做了，每次修改代码hash都会变，只在开发环境下 */
    filename: '[name].[hash].js'
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
    contentBase:path.join(__dirname, './dist'),
    // 端口
    port:3001,
    // 都做gzip压缩
    compress:true,
    // 模块热加载
    hot:true,
    // 默认启动打开浏览器
    open:true,
    // 打印进度
    // progress:false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
