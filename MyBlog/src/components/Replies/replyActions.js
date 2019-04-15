import {
  ADD_REPLY,
  LOADING_DATA,
  LOST_DATA,
  RECEIVED_DATA,
  RECEIVED_DATA_NOTICE
} from '../../redux/constants/constants'
import { messageUrl } from '../../urlConfig'
import { normalizrReplies } from '../../redux/Normalizrs/normalizrMsgs'


export const commitReply = (param) => {
  return {
    types:[LOADING_DATA, RECEIVED_DATA, LOST_DATA],
    promise:(axios) => axios.post(`${messageUrl}/reply`, param),
    success: (dispatch, getState, result) => {
      if (result.isSuccess) {
        dispatch({ type:ADD_REPLY, data:normalizrReplies(result.data), commentId:param.toComment })
      } else {
        dispatch({ type:RECEIVED_DATA_NOTICE, message:result.message })
      }
    }
  }
}
