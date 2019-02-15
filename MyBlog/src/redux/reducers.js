import counter from '../router/Counter/reducers/reducers'
import user from './user'
import { LOADING_DATA, RECEIVED_DATA } from './constants'
/*
* 整合所有的顶级reducers
* 按照这种模式继续拆分，顶级reducers可以按照菜单模块划分
* */

const initState = {
  isSuccess:false,
  message:'',
  loading:false
}

function xhr(state = initState, action) {
  switch (action.type) {
  case LOADING_DATA:
    return Object.assign({}, state, { isSuccess:false, loading:true, message:'' })
  case RECEIVED_DATA:
    return Object.assign({}, state, { isSuccess:action.isSuccess, loading:false, message:action.message })
  default:
    return state
  }
}

module.exports = {
  xhr,
  counter,
  user,
}
