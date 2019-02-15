
const Mongoose = require('../db.js')

const Schema = Mongoose.Schema
// 用户模型
const UserSchema = new Schema({
  name:{
    type:String,
    // 使用内建验证器
    required:[true, '请输入用户名！']
  },
  age:{
    type:Number,
    max:[130, '年龄不合法！'],
    min:[0, '年龄不合法！']
  },
  gender:{
    type:String,
    enum:['男','女']
  },
  // TODO 用户邮箱验证
  email:String,
  password:String,
  // TODO UserStar:{}
  fans:{
    type:Number,
    min:[0, '粉丝数不能少于0！']
  },
  type:{
    type:String,
    enum: ['AUTHOR','NORMAL']
  },
  avatar:String,
  desc:String,
  lastLoginDate:{
    type:Number
  }
},
  {
    // 指定集合名称
    collection:'users',
    // 去掉版本控制 _v字段
    versionKey:false
  })

module.exports = Mongoose.model('User',UserSchema)
