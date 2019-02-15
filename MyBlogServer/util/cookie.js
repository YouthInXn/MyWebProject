const User = require('../DBModels/User')

// 从cookie中解析用户信息的工具函数
const getUserFromCookie = async (ctx) => {
  const userId = ctx.cookies.get('_id')
  if (!userId) {
    return null
  }
  const user = await User.findOne({ _id:userId }).exec()
  console.log(`用户${user.name}上线。`)
  return user
}

module.exports = getUserFromCookie
