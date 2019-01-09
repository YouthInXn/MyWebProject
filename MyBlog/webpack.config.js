const path  = require('path')
/* 配置eslint不能识别的全局变量 */
/* global __dirname */
const WebpackHtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
/* 分离第三方库 */
const vendors = ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']

module.exports = {
  // webpack 入口
  entry: {
    app:[
      'babel-polyfill',
      path.resolve(__dirname, 'src/index.js')
    ],
    vendor:vendors
  },
  // webpack 出口
  output: {
    path:path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    /* 非入口chunk包的名称,chunkhash解决缓存问题，可更细节的优化，减少第三方依赖的构建次数 */
    chunkFilename: '[name].[chunkhash].min.js',
    publicPath: '/'
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
  plugins: [
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
    }),
    /* 分离第三方库 */
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    /* 减少第三方库的加载,保证第三方库的hash在代码未改变时不变 */
    new webpack.HashedModuleIdsPlugin()
  ]
}
