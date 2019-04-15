/**
 * 留言的集合 messages
 * */
const Mongoose = require('../db.js')

const Schema = Mongoose.Schema

const MessageSchema = new Schema({
  // 发表留言的用户ID
  user:{ type:Schema.Types.ObjectId, required:[true, '用户ID不能为空！'], ref:'User' },
  // 提交时间
  time:{ type:Number },
  // 留言内容
  content: { type:String, required: [true, '留言内容不能为空!'], minLength:[1, '留言内容不能为空！'] },
  // 喜欢该留言的用户ID列表
  likesUsers: { type:Array, default: [] },
  // 留言的评论
  comments:[{ type:Schema.Types.ObjectId, ref:'Comment', default:[] }]
},
{
  // 指定集合名称
  collection:'messages',
  // 去掉版本控制 _v字段
  versionKey:false
})
// Query中间件
MessageSchema.pre('find', function (next) {
  // 在Message查找之前 填充数据
  this.populate({ path:'user', select:'_id name' })
      .populate({ path:'comments' })
  next()
})
// doc中间件
MessageSchema.post('save', async function (docs) {
  await docs.populate({ path:'user', select:'_id name' })
        .populate({ path:'comments' })
        .execPopulate()
})


module.exports.MessageSchema = MessageSchema
module.exports.MessageModel = Mongoose.model('Message',MessageSchema)
