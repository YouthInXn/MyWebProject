import {
  LOADING_DATA,
  RECEIVED_DATA_NOTICE,
  RECEIVED_DATA,
  LOST_DATA
} from '../../redux/constants/index'
import { messageUrl } from '../../urlConfig'
import { ADD_COMMENT } from '../../redux/constants/index'
import { normalizrComments } from '../../redux/Normalizrs/normalizrData'
// 添加评论
export const commitComment = (param) => {
  return {
    types:[ LOADING_DATA, RECEIVED_DATA, LOST_DATA ],
    promise:(axios) => axios.post(`${messageUrl}/comments`, { ...param }),
    success: (dispatch, getState, result) => {
      if (result.isSuccess) {
        dispatch({ type:ADD_COMMENT, data:normalizrComments(result.data), ...param })
      } else {
        dispatch({ type:RECEIVED_DATA_NOTICE, message:result.message })
      }
    }
  }
}
