import { messageUrl } from '../../../urlConfig'
import {
  AUTHOR_CONTACT_FAILURE,
  AUTHOR_CONTACT_SUCCESS
} from '../../../redux/constants/index'

/**
 * 联系作者
 * */
export const contactAuthor = (info) => {
  return {
    types:[AUTHOR_CONTACT_SUCCESS, AUTHOR_CONTACT_FAILURE],
    promise:(axios) => {
      return axios.post(`${messageUrl}/contact`, info)
    }
  }
}
