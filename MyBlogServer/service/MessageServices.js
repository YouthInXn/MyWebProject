/**
 * 留言板逻辑层
 * 包括联系通道逻辑
 * */

const insertMessage = require('../Contact/MessageTemplate')
const Message = require('../DBModels/Message').MessageModel
const Comment = require('../DBModels/Comment').CommentModel
const User = require('../DBModels/User').UserModel
const getValidationError = require('../DBModels/ValidationErrorHandle').getValidationError
const Reply = require('../DBModels/Reply').ReplyModel
const utils = require('../util/funcUtils')


class MessageServices {
  /**
   * 联系作者
   * @param message
   * */
  static async contact (ctx) {
    const message = ctx.request.body
    try {
      const result = await insertMessage(message)
      if (result.isSuccess) {
        ctx.response.body = {
          isSuccess:true,
          message:'已收到私信，感谢您的关注！(10秒后可再次提交。)'
        }
      } else {
        ctx.response.body = {
          isSuccess: false,
          message:result.message
        }
      }
    } catch (e) {
      if (e.message.indexOf('locked') >= 0) {
        ctx.response.body = {
          isSuccess:false,
          message:'文件被占用，请稍后再试。'
        }
        return
      }
      ctx.throw(e.message)
    }
  }
  /**
   * 新增留言
   * @param userId
   * */
  static async addMessage (ctx) {
    const { user } = ctx.request.body
    let msger = await User.findOne({ _id: user })
    if (!user || !msger) {
      ctx.body = { isSuccess:false, message:'用户不存在！' }
      return
    }
    // 防止频繁留言
    const m = await Message.find({ user:msger._id })
    let flag = false
    if (m.length) {
      m.sort((a, b) => b.time -a.time)
      if (Date.now() - m[0].time < 60000) {
        flag = true
      }
    }
    if (flag) {
      // 1分钟之内不可再次留言
      ctx.body = { isSuccess:false, message:'请在一分钟后再试！' }
      return
    }
    const msg = new Message({ ...ctx.request.body, time: Date.now() })
    const result = await msg.save()
    if (result) {
      ctx.body = { isSuccess:true, message:'留言成功！' }
    } else {
      ctx.body = { isSuccess:false, message:'留言失败！' }
    }
  }
  /**
   * 获取所有留言
   * */
  static async getAllMessage (ctx) {
    const msg = await Message.find({})
    if (msg.length) {
      msg.sort((a, b) => b.time - a.time)
    }
    ctx.body = { isSuccess:true, message:'操作成功！', data:msg }
  }
  /**
   * 获取单个留言
   * @param messageId
   * */
  static async getMessageById (ctx) {
    let messageId = ctx.url.substr(9)
    if (messageId.length === 24) {
      let msg = await Message.find({ _id:messageId })
      ctx.body = { isSuccess:true, message: msg ? '操作成功！' : '未查找到匹配的留言！', data:msg }
    } else {
      ctx.throw(getValidationError('messageId',`ID:${messageId}不合法！`))
    }
  }
  /**
   * 喜欢留言
   * @param messageId
   * @param userId
   * */
  static async likesMessage (ctx) {
    const { msgId, userId } = ctx.request.body
    const m = await Message.findById(msgId)
    if (!m) {
      ctx.body = { isSuccess:false, message:'找不到该留言！' }
      return
    }
    if(m.likesUsers.includes(userId)) {
      ctx.body = { isSuccess:false, message:'你已赞过该留言！' }
      return
    }
    m.likesUsers.push(userId)
    // 填充用户和评论
    let r = await m.save()
    const result = await r.populate({ path:'user', select:'_id name' })
      .populate('comments')
      .execPopulate()
    ctx.body = { isSuccess:true, message:'已喜欢留言。', data:result }
  }
  /**
   * 添加评论
   * @param messageId
   * @param userId
   * @param content
   * */
  static async commentsMessage (ctx) {
    const { messageId, userId, content } = ctx.request.body
    if (messageId.length !== 24 || userId.length !== 24) {
      ctx.body = { isSuccess:false, message:'ID不合法！' }
      return
    }
    const matchedMsg = await Message.findOne({ _id:messageId })
    const matchedUser = await User.findById(userId)
    if (!matchedMsg || !matchedUser) {
      ctx.body = { isSuccess:false, message:'没有匹配的留言或用户！' }
      return
    }
    if (!content.trim()) {
      ctx.body ={ isSuccess:false, message:'评论内容不能为空！' }
      return
    }
    const comment = new Comment()
    comment.set({ commenter: userId, content, parentId:messageId })
    comment.set('time', Date.now())
    comment.set('commentTo', 'Message')
    const r = await comment.save()
    !matchedMsg.comments && matchedMsg.set('comments', [])
    matchedMsg.comments.push(r._id)
    await matchedMsg.save()
    let result = await Message.find({ _id:matchedMsg._id })
    if (result.length) {
      ctx.body = { isSuccess:true, message:'评论成功！', data:result[0] }
    } else {
      ctx.body = { isSuccess:false, message:'评论失败！', data:{} }
    }
  }
  /**
   * 获取某留言的评论列表
   * */
  static async getCommentsList () {}
  /**
   * 回复评论
   * @param replier 回复者
   * @param content 内容
   * @param toComment 回复的评论
   * */
  static async replyComments (ctx) {
    const { replier, content, toComment } = ctx.request.body
    if (!replier || !content || !toComment ) {
      ctx.body = { isSuccess:false, message:'参数错误！' }
      return
    }
    if (!utils.isObjId(replier) || !utils.isObjId(toComment)) {
      ctx.body = { isSuccess:false, message:'ID不合法！' }
      return
    }
    let comment = await Comment.findById(toComment)
    let rUser = await User.findById(replier)
    if (!comment || !rUser) {
      ctx.body = { isSuccess:false, message:'未找到相应的用户！' }
      return
    }
    const reply = new Reply({ ...ctx.request.body, time:Date.now() })
    const r = await reply.save()
    // 评论中添加回复
    comment.replies.push(r._id)
    const c = await comment.save()
    // 填充评论的数据
    const data = await r.populate({ path:'replier', select:'_id name' }).execPopulate()
    if (c && r) { ctx.body = { isSuccess:true, message:'回复成功！', data } }
    else { ctx.body = { isSuccess:false, message:'回复失败！' } }
  }
}

module.exports = MessageServices
