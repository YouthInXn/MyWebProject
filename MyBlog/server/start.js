/* node 配置启动HMR DEV SERVER */
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const config = require('../webpack.config')

/* DEV_SERVER&&HMR设置 */
const option = {
  hot:true,
  contentBase:'../dist',
  open:true,
  port:3001,
  compress:true
}
/* 注入到webpack配置对象中去 */
WebpackDevServer.addDevServerEntrypoints(config, option)

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, option)

server.listen(3001, 'localhost', () => {
  console.log('Webpack-Dev-Server is Running at localhost:3001')
})
