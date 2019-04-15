import { normalize, schema } from 'normalizr'

// 用户架构
const user = new schema.Entity('users', {}, { idAttribute:'_id' })
// 回复架构
const reply = new schema.Entity('replies', {
  replier:user
}, { idAttribute:'_id' })

// 评论架构
const comment = new schema.Entity('comments', {
  commenter:user,
  replies:[reply]
}, { idAttribute:'_id' })

// 留言架构
const msgs = new schema.Entity('msgs', {
  user:user,
  comments:[comment]
}, { idAttribute:'_id' })

const msgsList = [msgs]
// 留言列表
export const normalizrMsgs = (data) => {
  return normalize(data, msgsList)
}
// 单个留言
export const normalizrMsg = (data) => {
  return normalize(data, msgs)
}
export const normalizrComments = (data) => {
  return normalize(data, comment)
}
export const normalizrReplies = (data) => {
  return normalize(data, reply)
}

