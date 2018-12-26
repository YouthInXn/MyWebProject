const path  = require('path')
/* 配置eslint不能识别的全局变量 */
/* global __dirname */
const WebpackHtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  // webpack 入口
  entry:[
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src/index.js')
  ],
  // webpack 出口
  output: {
    path:path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    chunkFilename: 'main[chunkhash].min.js'
  },
  // webpack loader
  module: {
    rules:[
      {
        test:/\.js$/,
        use:['babel-loader?cacheDirectory=true'],
        include:path.resolve(__dirname, 'src')
      },
      {
        test:/\.css$/,
        use:['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          // 小于等于8K的图片会被转成base64编码，直接插入HTML中
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },
  // 添加开发工具SourceMap，源文件映射，协助开发
  devtool: 'inline-source-map',
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
    // progress:true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 配置打包的html模板文件
    new WebpackHtmlPlugin({
      title:'YouthInXian的个人网站',
      // 图标
      favicon:path.join(__dirname, 'public/favicon.jpg'),
      // 使用该模板
      template:path.join(__dirname, 'src/index.html'),
      // 打包到dist下的文件名称
      filename: 'index.html',
      // true:把打包好的js/css等注入到模板中
      inject: true,
      // 缩小
      minify: {
        // 去掉空格
        collapseWhitespace: true,
      }
    })
  ]
}
