/* eslint-disable no-case-declarations */
import user from './user'
import author from '../router/Author/authorReducer'
import progress from '../components/Progress/reducers'

/*
* 整合所有的顶级reducers
* 按照这种模式继续拆分，顶级reducers可以按照菜单模块划分
* */

module.exports = {
  // 请求状态LOADING MESSAGE统一管理
  progress,
  // 用户相关
  user,
  // author整合三个模块的reducer
  author
}
