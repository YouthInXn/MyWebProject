
const dbConfig = require('../dbconfig')
var mongoose = require('mongoose')

const dbUrl = `${dbConfig.url}/${dbConfig.dbName}`

mongoose.connect(dbUrl, { useNewUrlParser:true })

let db = mongoose.connection

db.on('error', function () {
  console.log('error in connect.')
})
db.once('open', function () {
  console.log('mongodb server is connected.')
  // 1.定义模式
  var kittySchema = mongoose.Schema({
    name:String
  },{ collection:'kitty', versionKey:false })
  // 4.给猫添加speak方法
  kittySchema.methods.speak = function () {
    var greeting = this.name ? 'My name is ' + this.name + '.' : "I don't hava a name."
    console.log(greeting)
  }
  // 2.编译为Model
  var Kitty = mongoose.model('Kitten', kittySchema)
  // 3.创建一只Kitty实例
  var tom = new Kitty({ name:'Tom' })
  // 5.保存到数据库
  tom.save(function (err, tom) {
    if (err) return console.error(err)
    tom.speak()
  })
})

