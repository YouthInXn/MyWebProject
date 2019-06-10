import { userUrl } from '../urlConfig'
import {
  USER_LOGIN,
  USER_REGISTER,
  LOGIN_POP_TOGGLE
} from './constants/index'
import {
  LOADING_DATA, RECEIVED_DATA, LOST_DATA, RECEIVED_DATA_NOTICE
} from './constants/index'

// 用户登录
export const login = (user) => {
  return {
    types:[ LOADING_DATA, RECEIVED_DATA, LOST_DATA ],
    promise:(axios) => axios.post(`${userUrl}/login`, user),
    // 成功之后派发了RECEIVED_DATA，再继续派发,并弹出提示
    success:(dispatch, getState, result) => {
      if (result.isSuccess) {
        dispatch({ type:USER_LOGIN, user:result.user })
        dispatch(hideLoginPop())
      }
      dispatch({ type:RECEIVED_DATA_NOTICE, message:result.message })
    }
  }
}
// 用户注册
export const register = (user) => {
  return {
    types:[ LOADING_DATA, RECEIVED_DATA, LOST_DATA ],
    promise: (axios) => {
      return axios.post(`${userUrl}/register`, user)
    },
    success: (dispatch, getState, result) => {
      if (result.isSuccess) {
        dispatch({ type:USER_REGISTER, user:result.user })
        dispatch(hideLoginPop())
      }
      dispatch({ type:RECEIVED_DATA_NOTICE, message:result.message })
    }
  }
}
// 获取已登录的用户
export const getLoginUser = () => {
  return {
    types:[ LOADING_DATA, RECEIVED_DATA, LOST_DATA ],
    promise: (axios) => {
      return axios.get(`${userUrl}/login`)
    },
    success: (dispatch, getState, result) => {
      dispatch({ type:USER_LOGIN, user:result.user || {} })
    }
  }
}
// 显示登录弹框
export const showLoginPop = () => {
  return {
    type:LOGIN_POP_TOGGLE,
    popShow:true
  }
}
// 隐藏登录窗口
export const hideLoginPop = () => {
  return {
    type:LOGIN_POP_TOGGLE,
    popShow:false
  }
}


