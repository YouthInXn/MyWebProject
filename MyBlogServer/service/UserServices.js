const User = require('../DBModels/User').UserModel
const getUserFromCookie = require('../util/cookie')
class UserServices {
  // 获取作者信息
  static async getAuthorInfo (ctx) {
    const author = await User.findOne({ admin:true }).exec()
    if (author) {
      ctx.body = { isSuccess:true, message:null, author }
    } else {
      ctx.body = { isSuccess:false, message:'数据获取失败！' }
    }
  }
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
          // TODO 可访问的域名动态化
          domain:'localhost',
          path:'/',
          maxAge:2 * 60 * 60 * 1000,
          secure: false,
          httpOnly:true,
          overwrite:true,
          // expires:new Date('2019-2-16')
        })
        ctx.response.body = { message: '登录成功！', isSuccess: true, user: user._doc }
        console.log('用户登录：' + user._doc.name)
      } else {
        ctx.response.body = { message: '密码错误！', isSuccess:false }
      }
    } else {
      ctx.body = { isSuccess:false, message:'账号或密码错误!' }
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
  static async logout (ctx) {
    ctx.response.statusCode = 200
    ctx.cookies.set('_id', '-', {
      domain:'localhost',
      path:'/',
      secure: false,
      httpOnly:true,
      overwrite:false,
      expires:new Date('2019-1-1') // 删除cookies
    })
    ctx.response.body = {
      isSuccess:true,
      message:`已登出。`
    }
  }
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
      const user = new User({ ...param, lastLoginDate: Date.now(), admin:false })
      const res = await user.save()
      ctx.statusCode = 200
      // 设置cookie
      ctx.cookies.set('_id', res.get('_id'), {
        domain:'localhost',
        path:'/',
        maxAge:120 * 60 * 1000,
        secure: false,
        httpOnly:true,
        overwrite:false,
        // expires:new Date('2019-2-16')
      })
      ctx.body = {
        isSuccess:true,
        message:`用户${param.name}注册成功！`,
        user:res
      }
      console.log(`新用户注册：${param.name}`)
    } else {
      ctx.body = { isSuccess: false, message:'用户名或者密码错误！' }
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
  // 喜欢作者
  static async likesAuthor (ctx, next) {
    const loginUser = await getUserFromCookie(ctx)
    if (!loginUser) {
      ctx.body = {isSuccess: false, message: '当前未登录。'}
      return
    }
    const author = await User.findOne({admin: true}).exec()
    if (author.fans.indexOf(loginUser._id) >= 0) {
      ctx.body = {isSuccess: false, message: '不能再喜欢了！'}
      return
    }
    author.fans.push(loginUser._id)
    const r = await new Promise(function (resolve) {
      author.save(function (err, author) {
        if (err) { ctx.throw(err) }
        else { resolve(author) }
      })
    })
    ctx.body = { isSuccess:true, message:'感谢关注！', author:r }
    console.log('新增关注：' + loginUser.name)
  }
}

module.exports = UserServices
