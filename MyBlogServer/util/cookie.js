const User = require('../DBModels/User').UserModel

// 从cookie中解析用户信息的工具函数
const getUserFromCookie = async (ctx) => {
  if (!ctx.cookies) { return null }
  const userId = ctx.cookies.get('_id')
  if (!userId) {
    return null
  }
  const user = await User.findOne({ _id:userId }).exec()
  return user
}

module.exports = getUserFromCookie
