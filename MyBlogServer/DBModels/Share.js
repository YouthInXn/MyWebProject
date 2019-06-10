/**
 * 作者分享集合
 * */
const Mongoose = require('../db')

const Schema = Mongoose.Schema

const ShareSchema = new Schema(
  {
    time:{ type:Number, required:true },
    content: { type:String, required:true },
    // 喜欢该分享的用户ID列表
    likesUsers: { type:Array, default: [] },
    // 分享的评论
    comments:[{ type:Schema.Types.ObjectId, ref:'Comment', default:[] }]
  },
  {
    // 指定集合名称
    collection:'share',
    // 去掉版本控制 _v字段
    versionKey:false
  })
// query中间件, this指向query
// ShareSchema.pre('find', function (next) {
//   this.populate({ path:'comments' })
//   next()
// })

module.exports.ShareSchema = ShareSchema
module.exports.ShareModel = Mongoose.model('Share', ShareSchema)
