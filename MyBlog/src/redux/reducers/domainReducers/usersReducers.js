import { combineReducers } from 'redux'
import {ADD_MESSAGE, ADD_COMMENT, GET_ALL_MESSAGE} from '../../constants/constants'
/**
 * 数据中的用户信息
 * */
const MESSAGE_BYID_HANDLER = {
  // 添加留言
  [ADD_MESSAGE] : (state, action) => {
    const { entities } = action.data
    const { users } = entities
    return { ...state, ...users }
  },
  // 添加评论
  [ADD_COMMENT]: (state, action) => {
    const { result, entities } = action.data
    const { users } = entities
    return { ...state, ...users }
  },
  [GET_ALL_MESSAGE]: (state, action) => {
    const { entities } = action.msgs
    return { ...state, ...entities.users }
  },
}
const USERS_ALLIDS_HANDLER = {
  [ADD_MESSAGE]: (state, action) => {
    if (state.includes(action.userId)) {
      return state
    }
    return state.concat(action.userId)
  },
  [ADD_COMMENT]: (state, action) => {
    if (state.includes(action.userId)) {
      return state
    }
    return state.concat(action.userId)
  },
  [GET_ALL_MESSAGE]: (state, action) => {
    const { entities } = action.msgs
    return entities.users ? state.concat(Object.keys(entities.users)) : []
  }
}

const usersById = function (state = {}, action) {
  const handler = MESSAGE_BYID_HANDLER[action.type]
  return handler ? handler(state, action) : state
}

const allUsers = function (state = [], action) {
  const handler = USERS_ALLIDS_HANDLER[action.type]
  return handler ? handler(state, action) : state
}

const userReducers = combineReducers({
  byId:usersById,
  allIds:allUsers
})

export default userReducers
