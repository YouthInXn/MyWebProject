import {
  LOADING_DATA,
  RECEIVED_DATA,
  RECEIVED_DATA_NOTICE,
  LOST_DATA, NOTICE_MESSAGE_OPEN,
} from '../../../components/Progress/constant'
import { messageUrl } from '../../../urlConfig'
import {
  GET_ALL_MESSAGE, LIKE_MESSAGE,
  LIKE_MESSAGE_SUCCESS, COMMIT_COMMENTS,
  REPLY_COMMENTS
} from '../constants'

// 获取所有留言
export const getAllMessage = () => {
  return {
    types:[ LOADING_DATA, RECEIVED_DATA, LOST_DATA ],
    promise: (axios) => axios.get(`${messageUrl}`),
    success: (dispatch, getState, result) => {
      dispatch({ type:GET_ALL_MESSAGE, msgs:result.data })
    }
  }
}
// 新增留言
export const addNewMessage = (msg) => {
  return {
    types:[ LOADING_DATA, RECEIVED_DATA, LOST_DATA ],
    promise: (axios) => axios.post(`${messageUrl}`, msg),
    success: (dispatch, getState, result) => {
      result.isSuccess && dispatch(getAllMessage())
      dispatch({ type:RECEIVED_DATA_NOTICE, message:result.message || '' })
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
        dispatch({ type: LIKE_MESSAGE_SUCCESS, result })
      } else {
        dispatch({ type:NOTICE_MESSAGE_OPEN, message: result.message })
      }
    }
  }
}
// 添加评论
export const commitComment = (param) => {
  return {
    types:[ LOADING_DATA, RECEIVED_DATA, LOST_DATA ],
    promise:(axios) => axios.post(`${messageUrl}/comments`, { ...param }),
    success: (dispatch, getState, result) => {
      if (result.isSuccess) {
        dispatch({ type:COMMIT_COMMENTS, data:result.data })
      } else {
        dispatch({ type:RECEIVED_DATA_NOTICE, message:result.message })
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

