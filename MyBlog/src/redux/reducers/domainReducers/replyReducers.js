import { combineReducers } from 'redux'
import {ADD_REPLY, GET_ALL_MESSAGE} from '../../constants/constants'

const REPLY_BYID_HANDLER = {
  [ADD_REPLY]: (state, action) => {
    const { entities } = action.data
    return { ...state, ...entities.replies }
  },
  [GET_ALL_MESSAGE]: (state, action) => {
    const { entities } = action.msgs
    const { replies } = entities
    return { ...state, ...replies }
  }
}

const REPLY_ALLIDS_HANDLER = {
  [ADD_REPLY]: (state, action) => {
    const { result } = action.data
    return state.concat(result)
  },
  [GET_ALL_MESSAGE]: (state, action) => {
    const { entities } = action.msgs
    const { replies } = entities
    return replies ? Object.keys(replies) : []
  }
}

const replyById = (state = {}, action) => {
  const handler = REPLY_BYID_HANDLER[action.type]
  return handler ? handler(state, action) : state
}
const allReplies = (state = {}, action) => {
  const handler = REPLY_ALLIDS_HANDLER[action.type]
  return handler ? handler(state, action) : state
}
const replyReducer = combineReducers({
  byId:replyById,
  allIds:allReplies
})

export default replyReducer
