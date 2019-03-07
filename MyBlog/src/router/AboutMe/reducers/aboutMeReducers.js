
import { AUTHOR_CONTACT_SUCCESS, AUTHOR_CONTACT_FAILURE } from '../actions/aboutMeActions'
import { GET_AUTHOR_INFO } from '../../Author/authorActionCreators'
const initState = {
  contact:{
    isSuccess:false,
    message:''
  },
  author:null
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

export default function (state = initState, action) {
  let sliceReducer = ACTION_HANDLE[action.type]
  return sliceReducer ? sliceReducer(state, action) : state
}
