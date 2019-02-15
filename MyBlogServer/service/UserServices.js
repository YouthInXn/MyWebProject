const User = require('../DBModels/User')
const getUserFromCookie = require('../util/cookie')
class UserServices {
  // 用户登录
  static async login (ctx) {
    const param = ctx.request.body
    if (param.hasOwnProperty('name') && param.hasOwnProperty('password')) {
      // 构建Query实例并执行
      const queryResult = await User.findOne({ name:param.name }).exec()
      if (!queryResult) {
        ctx.response.body = { isSuccess:false, message:'用户名不存在!' }
        return
      }
      if (queryResult.get('password') === param.password) {
        // 修改用户最后登录时间
        const user = await User.findOneAndUpdate({
          name:queryResult.name
        }, { lastLoginDate: new Date().getTime() }, { new:true }).exec()
        ctx.response.statusCode = 200
        // 设置cookie
        ctx.cookies.set('_id', queryResult.get('_id'), {
          domain:'localhost',
          path:'/',
          maxAge:120 * 60 * 1000,
          secure: false,
          httpOnly:true,
          overwrite:false,
          // expires:new Date('2019-2-16')
        })
        ctx.response.body = {
          message: '登录成功！',
          isSuccess: true,
          user: user._doc
        }
      } else {
        ctx.response.body = {
          message: '密码错误！',
          isSuccess:false
        }
      }
    } else {
      ctx.throw(500, '参数错误')
    }
  }
  // 获取用户登录状态
  static async getLoginUser (ctx) {
    const user = await getUserFromCookie(ctx)
    if (user) {
      ctx.response.body = {
        isSuccess:true,
        user:user,
        message:`用户${user.name}已登录。`
      }
    } else {
      ctx.response.body = {
        isSuccess:false,
        user:null,
        message:'未登录。'
      }
    }
  }
  // 用户登出
  static async logout (ctx, next) {}
  // 注册用户
  static async register (ctx) {
    const param = ctx.request.body
    if (param.hasOwnProperty('name') && param.hasOwnProperty('password')) {
      const hasExist = await User.findOne({ name:param.name }).exec()
      if (hasExist) {
        ctx.body = {
          isSuccess:false,
          message:`用户名${param.name}已存在！`
        }
        return
      }
      const user = new User({ ...param, lastLoginDate: Date.now()})
      const res = await user.save()
      ctx.statusCode = 200
      ctx.body = {
        isSuccess:true,
        message:`用户${param.name}注册成功！`,
        user:res
      }
    } else {
      ctx.throw(500, '参数错误')
    }
  }
  // 获取用户信息
  static async getUserInfo (ctx, next) {}
  // 修改用户信息
  static async updateUserInfo (ctx, next) {}
  // 获取所有用户
  static async getAllUsers (ctx, next) {
    const data = await User.find({}, function (res) {
      console.log(res)
    })
  }
}

module.exports = UserServices
