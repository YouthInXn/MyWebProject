import { combineReducers } from 'redux'
import count from '../router/Counter/reducers/reducers'

const rootReducers = combineReducers({
  /* 注意隐式传递参数 countReducer:countReducer(state.count, action) */
  count
})

export default rootReducers
