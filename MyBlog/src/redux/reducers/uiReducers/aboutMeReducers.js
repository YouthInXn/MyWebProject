
import {
  AUTHOR_CONTACT_SUCCESS,
  AUTHOR_CONTACT_FAILURE,
  GET_AUTHOR_INFO
} from '../../constants/index'
import { createSliceReducer } from '../reducerUtils'
const initState = {
  contact:{
    isSuccess:false,
    message:''
  },
}

const ACTION_HANDLE = {
  [AUTHOR_CONTACT_SUCCESS]: (state, action) => {
    // 成功之后Action会带有一个result
    let { isSuccess, message } = action.result
    return Object.assign({}, state, { contact:{ isSuccess, message } })
  },
  [AUTHOR_CONTACT_FAILURE]: (state, action) => {
    // 失败之后Action会带有一个error
    let { error } = action
    return Object.assign({}, state, { contact:{ isSuccess:false, message:error.message } })
  },
  [GET_AUTHOR_INFO]: (state, action) => {
    return Object.assign({}, state, { author: action.author })
  }
}

export default createSliceReducer(initState, ACTION_HANDLE)
