import { combineReducers } from 'redux'
import aboutMe from './aboutMeReducers'
import share from './shareReducers'

const authorRootReducer = combineReducers({
  aboutMe,    // 关于作者模块的reducers
  // message, // 留言板模块的reducer
  share,   // 个人分享模块的reduer
})

export default authorRootReducer
