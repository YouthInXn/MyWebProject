/*
* 留言板API接口层
* */

const MessageServices = require('../service/MessageServices')

const MessageRoutes = (router) => {
  router
        .post('/message/contact', MessageServices.contact) // 联系作者
        .post('/message', MessageServices.addMessage)  // 新增留言
        .get('/message', MessageServices.getAllMessage)   // 获取所有留言
        .get('/message/:messageId', MessageServices.getMessageById)  // 获取某个留言
        .post('/message/likes', MessageServices.likesMessage)  // 点赞留言
        .post('/message/comments', MessageServices.commentsMessage) // 评论留言
        .get('/message/comments/:messageId', MessageServices.getCommentsList)  // 获取某个留言的评论
        .post('/message/reply', MessageServices.replyComments) // 回复评论
}

module.exports = MessageRoutes

