import { combineReducers } from 'redux'
import { ADD_COMMENT, ADD_REPLY, GET_ALL_MESSAGE } from '../../constants/index'
/**
 * 评论Reducer
 * */
const BYID_HANDLER = {
  // 添加留言评论
  [ADD_COMMENT]: (state, action) => {
    const { result, entities } = action.data
    return { ...state, [result]: entities.comments[result] }
  },
  [GET_ALL_MESSAGE]: (state, action) => {
    const { entities } = action.msgs
    return { ...state, ...entities.comments }
  },
  [ADD_REPLY]: (state, action) => {
    const { commentId, data } = action
    return {
      ...state,
      [commentId]:{
        ...state[commentId],
        replies: [ ...state[commentId].replies, action.data.result ]
      }
    }
  }
}

const ALLIDS_HANDLER = {
  [ADD_COMMENT]: (state, action) => {
    return state.concat(action.data.result)
  },
  [GET_ALL_MESSAGE]: (state, action) => {
    const { entities } = action.msgs
    return entities.comments ? Object.keys(entities.comments) : []
  }
}

const commentsById = function (state = {}, action) {
  const handler = BYID_HANDLER[action.type]
  return handler ? handler(state, action) : state
}

const allComments = function (state = [], action) {
  const handler = ALLIDS_HANDLER[action.type]
  return handler ? handler(state, action) : state
}

const commentReducers = combineReducers({
  byId:commentsById,
  allIds: allComments
})

export default commentReducers
