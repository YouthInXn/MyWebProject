import {getData, postData} from '../xhr'
import { userUrl } from '../urlConfig'
import { LOADING_DATA, RECEIVED_DATA, USER_LOGIN, USER_REGISTER } from './constants'

// 用户登录
export const login = (user) => async (dispatch) =>{
  try {
    dispatch({ type:LOADING_DATA })
    const result = await postData(`${userUrl}/login`, user)
    if (result) {
      dispatch({ type:RECEIVED_DATA, ...result })
      result.isSuccess && dispatch({ type:USER_LOGIN, user:{ ...result.user } })
    } else {
      dispatch({ type:RECEIVED_DATA, isSuccess:false, message:'服务器响应异常。' })
    }
  } catch (e) {
    dispatch({ type:RECEIVED_DATA, isSuccess:false, message:e.message })
  }
}
// 用户注册
export const register = (user) => async (dispatch) => {
  try {
    dispatch({ type:LOADING_DATA })
    const result = await postData(`${userUrl}/register`, user)
    if (result) {
      dispatch({ type:RECEIVED_DATA, ...result })
      result.isSuccess && dispatch({ type:USER_REGISTER, user:{ ...result.user } })
    } else {
      dispatch({ type:RECEIVED_DATA, isSuccess:false, message:'服务器响应异常。' })
    }
  } catch (e) {
    dispatch({ type:RECEIVED_DATA, isSuccess:false, message:e.message })
  }
}
// 获取已登录的用户
export const getLoginUser = () => async (dispatch) => {
  try {
    dispatch({ type:LOADING_DATA })
    const res = await getData(`${userUrl}/login`)
    if (res) {
      dispatch({ type:RECEIVED_DATA, ...res })
      res.isSuccess && dispatch({ type:USER_LOGIN, user:{ ...res.user } })
    } else {
      dispatch({ type:RECEIVED_DATA, isSuccess:false, message:'服务器响应异常。' })
    }
  } catch (e) {
    dispatch({ type:RECEIVED_DATA, isSuccess:false, message:e.message })
  }
}
// reducer
const initState = {}

export default function (state = initState, action) {
  switch (action.type) {
  case USER_LOGIN:
  case USER_REGISTER:
    return Object.assign({}, state, { ...action.user })
  default:
    return state
  }
}


