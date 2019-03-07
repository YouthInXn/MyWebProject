/**
 * 用户模块API层
 * */
const UserServices = require('../service/UserServices')

const UserRoutes = (router) => {
  router
        .post('/users/login', UserServices.login) // 用户登录
        .get('/users/login', UserServices.getLoginUser) // 获取用户登录状态
        .post('/users/author/likes', UserServices.likesAuthor)  // 喜欢作者
        .get('/users/author', UserServices.getAuthorInfo) // 获取作者信息
        .post('/users/register', UserServices.register) // 用户注册
        .get('/users', UserServices.getAllUsers)  //  获取全部用户
        .get('/users/:userId', UserServices.getUserInfo)  // 获取某个用户信息
        .post('/users/:userId', UserServices.updateUserInfo) // 修改用户信息
}

module.exports = UserRoutes
