import {
  LOADING_DATA,
  RECEIVED_DATA,
  RECEIVED_DATA_NOTICE,
  LOST_DATA, ADD_MESSAGE,
} from '../../../redux/constants/constants'
import { messageUrl } from '../../../urlConfig'
import {
  GET_ALL_MESSAGE, LIKE_MESSAGE,
  LIKE_MESSAGE_SUCCESS,
  REPLY_COMMENTS
} from '../../../redux/constants/constants'
import { normalizrMsg, normalizrMsgs } from '../../../redux/Normalizrs/normalizrMsgs'

// 获取所有留言
export const getAllMessage = () => {
  return {
    types:[ LOADING_DATA, RECEIVED_DATA, LOST_DATA ],
    promise: (axios) => axios.get(`${messageUrl}`),
    success: (dispatch, getState, result) => {
      const data = normalizrMsgs(result.data)
      dispatch({ type:GET_ALL_MESSAGE, msgs:data })
    }
  }
}
// 新增留言
export const addNewMessage = (param) => {
  return {
    types:[ LOADING_DATA, RECEIVED_DATA, LOST_DATA ],
    promise: (axios) => axios.post(`${messageUrl}`, param),
    success: (dispatch, getState, result) => {
      if(result.isSuccess) {
        dispatch({ type:ADD_MESSAGE, data:normalizrMsg(result.data), userId:param.user })
      } else {
        dispatch({ type:RECEIVED_DATA_NOTICE, message:result.message })
      }
    }
  }
}
// 点赞留言
export const likeMessage = (msgId, userId) => {
  return {
    // LIKE_MESSAGE 不做任何事情
    types:[ LIKE_MESSAGE, LOST_DATA ],
    promise: (axios) => axios.post(`${messageUrl}/likes`, { userId, msgId }),
    success: (dispatch, getState, result) => {
      if (result.isSuccess) {
        dispatch({ type: LIKE_MESSAGE_SUCCESS, userId, msgId })
      } else {
        dispatch({ type:RECEIVED_DATA_NOTICE, message: result.message })
      }
    }
  }
}

// 添加回复
export const replyComment = (param) => {
  return {
    types:[LOADING_DATA,RECEIVED_DATA, LOST_DATA],
    promise: (axios) => axios.post(`${messageUrl}/reply`, param),
    success: (dispatch, getState, result) => {
      if (result.isSuccess) {
        dispatch({ type:REPLY_COMMENTS, data:result.data, msgId:param.msgId })
      } else {
        dispatch({ type:RECEIVED_DATA_NOTICE, message:result.message })
      }
    }
  }
}

