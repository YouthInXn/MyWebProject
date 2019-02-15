const path  = require('path')
/* 配置eslint不能识别的全局变量 */
/* global __dirname */
const WebpackHtmlPlugin = require('html-webpack-plugin')
const projectConfig = require('./myBlog.config')
const webpack = require('webpack')

module.exports = {
  // webpack 入口
  entry: {
    app:[
      'babel-polyfill',
      path.resolve(__dirname, 'src/index.js')
    ],
    vendor:projectConfig.vendors
  },
  // webpack 出口
  output: {
    path:path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    /* 非入口chunk包的名称,chunkhash解决缓存问题，可更细节的优化，减少第三方依赖的构建次数 */
    chunkFilename: '[name].[chunkhash].min.js',
  },
  // webpack loader
  module: {
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        use:[
          {
            loader:'babel-loader',
            options:{
              cacheDirectory: true,
              presets: [
                'es2015',
                'react',
                'stage-0'
              ],
              plugins: [
                'transform-runtime',
                'babel-plugin-syntax-dynamic-import',
                [
                  'import',
                  [
                    {
                      libraryName:'@material-ui/core',
                      libraryDirectory:'./',
                      camel2DashComponentName: false
                    },
                    {
                      libraryName:'@material-ui/icons',
                      libraryDirectory:'./',
                      camel2DashComponentName: false
                    }
                  ]
                ]
              ]
            }
          }
        ]
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
      title:projectConfig.title,
      // 图标
      favicon:projectConfig.favicon,
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
      name:['vendor', 'runtime'],
      minChunks: Infinity,
    }),
    /* 减少第三方库的加载,保证第三方库的hash在修改代码未改变时不变 */
    new webpack.HashedModuleIdsPlugin(),
  ]
}
