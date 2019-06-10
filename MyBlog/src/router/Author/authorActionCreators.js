import {
  LOADING_DATA,
  RECEIVED_DATA,
  LOST_DATA,
  RECEIVED_DATA_NOTICE,
  GET_AUTHOR_INFO
} from '../../redux/constants/index'
import { userUrl } from '../../urlConfig'

// const LIKE_AUTHOR = 'LIKE_AUTHOR'

// 获取作者信息
export const getAuthorInfo = () => {
  return {
    types:[LOADING_DATA, RECEIVED_DATA, LOST_DATA],
    promise:(axios) => axios.get(`${userUrl}/author`),
    success: (dispatch, getState, result) => {
      dispatch({ type:GET_AUTHOR_INFO, author:result.author })
    }
  }
}
// 喜欢作者
export const likesAuthor = () => {
  return {
    types:[LOADING_DATA, RECEIVED_DATA, LOST_DATA],
    promise:(axios) => axios.post(`${userUrl}/author/likes`, {}),
    success: (dispatch, getState, result) => {
      dispatch({ type:RECEIVED_DATA_NOTICE, message:result.message })
      // 点击喜欢之后，重新获取作者信息，刷新状态中的author
      dispatch({ type:GET_AUTHOR_INFO, author: result.author })
    }
  }
}
