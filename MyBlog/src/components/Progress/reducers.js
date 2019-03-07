import {
  NOTICE_MESSAGE_CLOSE, NOTICE_MESSAGE_OPEN, TOGGLE_LOADING,
  LOADING_DATA, RECEIVED_DATA_NOTICE, RECEIVED_DATA, LOST_DATA
} from './constant'


const initState = {
  loading:false,
  open:false,
  message:''
}

function progressReducer(state = initState, action) {
  switch (action.type) {
  case TOGGLE_LOADING:
    return Object.assign({}, state, { loading:action.loading })
  case NOTICE_MESSAGE_OPEN:
    return Object.assign({}, state, { open:true, message:action.message })
  case NOTICE_MESSAGE_CLOSE:
    return Object.assign({}, state, { open:false, message:'' })
  case LOADING_DATA:
    return Object.assign({}, state, { loading:true, message:'' })
  // 收到数据，也就是请求成功，Promise中间件自动派发RECEIVED_DATA的ACTION, 关闭loading
  case RECEIVED_DATA:
    return Object.assign({}, state, { loading:false })
  // 收到数据，并且提示信息
  case RECEIVED_DATA_NOTICE:
    return Object.assign({}, state, { open:true, message:action.message })
  // 未收到数据，也就是请求失败，Promise中间件自动派发LOST_DATA的Action，并提示错误信息
  case LOST_DATA:
    return Object.assign({}, state, { open:true, loading:false, message:action.error.message })
  default:
    return state
  }
}

export default progressReducer
