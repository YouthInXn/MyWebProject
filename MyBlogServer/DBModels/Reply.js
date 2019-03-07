/**
 * 回复的集合replies
 * */
const Mongoose = require('../db')

const Schema = Mongoose.Schema

// 回复只针对评论
const ReplySchema = new Schema({
  // 发表回复的用户
  replier:{ type:Schema.Types.ObjectId, ref:'User', required:[true, '回复必须有用户！'] },
  // 发表时间
  time:{ type:Number },
  // 回复的内容
  content:{ type:String, minLength:[1, '回复内容不能为空！'], required:[true, '请输入回复的内容！'] },
  // 回复的评论ID
  toComment:{ type:Schema.Types.ObjectId, ref:'Comment', required:[true, '请输入回复的评论ID！'] },
  // atUserId
  atUser: { type: Schema.Types.ObjectId, ref:'User' }
},
{
  // 指定集合名称
  collection:'replies',
  // 去掉版本控制 _v字段
  versionKey:false
})

module.exports.ReplySchema = ReplySchema
module.exports.ReplyModel = Mongoose.model('Reply', ReplySchema)

