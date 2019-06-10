import { combineReducers } from 'redux'
import progress from './uiReducers/progressReducers'
import currentUser from './uiReducers/currentUserReducers'
import comments from './domainReducers/commentReducers'
import msgs from './domainReducers/messageReducers'
import userList from './domainReducers/usersReducers'
import author from './uiReducers/authorReducer'
import replies from './domainReducers/replyReducers'
import shareList from './domainReducers/shareReducers'
// import * as reducers 得到一个以它们的名字作为key的Object

// 顶级Reducer
const reducers = {
  // 这里是数据库的state
  comments,
  msgs,
  userList,
  replies,
  shareList,
  // 以下为UI state
  author,
  progress,
  currentUser,
}

export default combineReducers(reducers)
