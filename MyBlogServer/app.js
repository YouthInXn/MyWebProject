// 入口文件
const Koa = require('koa')
const router = require('./router')
const staticServer = require('koa-static')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const handleValidationError = require('./DBModels/ValidationErrorHandle').handleValidationError

const app = new Koa()

const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    if (e.name === 'ValidationError') {
      handleValidationError(e, ctx)
      return
    }
    console.error(e.message + ':' + e.stack)
    ctx.response.status = e.statusCode || e.status || 500
    ctx.response.body = {
      message:e.message,
      isSuccess:false
    }
  }
}
// 跨域设置
app.use(async function (ctx, next) {
  // ctx.request.originalUrl
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200
  }
  ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:3001')
  ctx.response.set('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,DELETE')
  ctx.response.set('Access-Control-Allow-Headers', 'content-type')
  // 允许跨域时携带cookie
  ctx.response.set('Access-Control-Allow-Credentials', true)
  await next()
})
// 数据解析器
app.use(bodyParser())
// 处理错误
app.use(errorHandler)
// static files
app.use(staticServer(path.join(__dirname, '/public')))
// routes
app.use(router.routes())

app.listen(8081, function () {
  console.log('Server is Running at localhost:8081')
})
