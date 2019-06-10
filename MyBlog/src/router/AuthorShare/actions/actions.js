import {
  GET_SHARE_LIST_FAILURE,
  GET_SHARE_LIST_SUCCESS,
  GET_SHARE_LIST, SHOW_SHARE_LIST
} from '../../../redux/constants'
import { shareUrl } from '../../../urlConfig'
import { normalizrShareList } from '../../../redux/Normalizrs/normalizrData'

// 获取分享列表
export const getShareList = () => {
  return {
    types:[GET_SHARE_LIST, GET_SHARE_LIST_SUCCESS, GET_SHARE_LIST_FAILURE],
    promise:(axios) => axios.get(`${shareUrl}`),
    success: (dispatch, getState, result) => {
      const { isSuccess, data } = result
      dispatch({ type:SHOW_SHARE_LIST, data:isSuccess ? normalizrShareList(data) : {} })
    }
  }
}
export const addShare = (content) => {}
