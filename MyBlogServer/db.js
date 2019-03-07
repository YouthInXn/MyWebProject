
var Mongoose = require('mongoose')
const dbConfig = require('./dbconfig.js')
Mongoose.Promise = global.Promise

const DB_URL = `${dbConfig.url}/${dbConfig.dbName}`
// 连接
Mongoose.connect(DB_URL, { useNewUrlParser:true })
// 连接成功
Mongoose.connection.on('connected', function () {
  console.log('MongoDB Server is Connected to ' + DB_URL)
})
// 连接出错
Mongoose.connection.on('error', function (error) {
  console.log('MongoDB Connection Error:' + error)
})
// 连接断开
Mongoose.connection.on('disconnected', function () {
  console.log('MongoDB Connection Disconnected.')
})

module.exports = Mongoose
