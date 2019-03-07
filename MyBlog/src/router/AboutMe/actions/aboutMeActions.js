import { messageUrl } from '../../../urlConfig'


export const AUTHOR_CONTACT_SUCCESS = 'AUTHOR_CONTACT_SUCCESS'
export const AUTHOR_CONTACT_FAILURE = 'AUTHOR_CONTACT_FAILURE'

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
