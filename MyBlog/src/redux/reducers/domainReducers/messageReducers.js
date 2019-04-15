import { combineReducers } from 'redux'
import {ADD_MESSAGE, ADD_COMMENT, LIKE_MESSAGE_SUCCESS} from '../../constants/constants'
import { GET_ALL_MESSAGE } from '../../constants/constants'
/**
 * 留言的Reducer
 * */
const MESSAGE_BYID_HANDLER = {
  [ADD_MESSAGE] : (state, action) => {
    const { entities, result } = action.data
    const { msgs } = entities
    return { ...state, [result]:msgs[result] }
  },
  [ADD_COMMENT]: (state, action) => {
    const { data, messageId } = action
    const msg = state[messageId]
    return {
      ...state,
      [messageId]:{ ...msg, comments:msg.comments.concat(data.result) }
    }
  },
  [GET_ALL_MESSAGE]: (state, action) => {
    const { entities } = action.msgs
    return { ...state, ...entities.msgs }
  },
  [LIKE_MESSAGE_SUCCESS]: (state, action) => {
    const { userId, msgId } = action
    state[msgId].likesUsers.push(userId)
    return { ...state }
  }
}

const MESSAGE_ALLIDS_HANDLER = {
  [ADD_MESSAGE] : (state, action) => {
    return [ action.data.result, ...state ]
  },
  [GET_ALL_MESSAGE]: (state, action) => {
    const { result } = action.msgs
    return [ ...result ]
  }
}

const messageById = function (state = {}, action) {
  const handler = MESSAGE_BYID_HANDLER[action.type]
  return handler ? handler(state, action) : state
}

const allMessages = function (state = [], action) {
  const handler = MESSAGE_ALLIDS_HANDLER[action.type]
  return handler ? handler(state, action) : state
}

const messageReducers = combineReducers({
  byId:messageById,
  allIds:allMessages
})

export default messageReducers
