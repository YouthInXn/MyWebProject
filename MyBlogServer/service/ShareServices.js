/**
 * 作者分享逻辑层
 * 2019/4/25
 * */

const Share = require('../DBModels/Share').ShareModel

class ShareServices {
  /**
   * 新增分享
   * */
  static async addShare (ctx) {
    const { content } = ctx.request.body
    const share = new Share({ content, time:Date.now() })
    const result = await share.save()
    if (result) {
      ctx.body = { isSuccess:true, message:'添加成功!' }
    } else {
      ctx.body = { isSuccess:false }
    }
  }
  /**
   * 删除分享
   * */
  static deleteShare (ctx) {}
  /**
   * 获取分享数据
   * */
  static async getShare (ctx) {
    const data = await Share.find({})
    ctx.body = { isSuccess:true, data }
  }
  /**
   * 评论分享
   * */
  static async addComment () {}
  /**
   * 点赞分享
   * */
  static async likeShare () {}
}

module.exports = ShareServices
