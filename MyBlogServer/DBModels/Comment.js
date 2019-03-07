/**
 * 评论的集合 comments
 * */
const Mongoose = require('../db')
require('./Reply').ReplyModel

const Schema = Mongoose.Schema

const CommentSchema = new Schema({
  // 评论的用户
  commenter:{ type:Schema.Types.ObjectId, ref:'User', required:[true, '评论必须有用户！'] },
  // 评论的时间
  time:{ type:Number },
  // 评论的内容
  content:{ type:String, required:true, minLength:[1, '评论内容不能为空！'] },
  // 评论的类型(对象) [ 留言,  帖子, 共享的内容 ]
  commentTo:{ type:String, enum:['Message', 'Post', 'Share' ] },
  // 喜欢该评论的用户ID列表
  likesUsers: { type:Array, default:[] },
  // 评论的回复
  replies: [{ type:Schema.Types.ObjectId, ref:'Reply', default: [] }],
  // 评论的父亲id
  parentId:{ type:Schema.Types.ObjectId, required:[true, '请输入被评论对象的ID！'] },
  // at的用户Id
  atUser: { type:Schema.Types.ObjectId, ref:'User' }
},
  {
    // 指定集合名称
    collection:'comments',
    // 去掉版本控制 _v字段
    versionKey:false
  })
// 每次查找评论之前 填充数据
CommentSchema.pre('find', function (next) {
  this.populate({ path:'commenter', select:'_id name' })
      .populate({ path:'replies' })
  next()
})

module.exports.CommentSchema = CommentSchema
module.exports.CommentModel =  Mongoose.model('Comment', CommentSchema)

