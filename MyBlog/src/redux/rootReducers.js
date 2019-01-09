import { combineReducers } from 'redux'
/* import * as reducers 得到一个以它们的名字作为key的Object */
import * as reducers from './reducers'
/* 顶级Reducer合并 */
const rootReducers = combineReducers(reducers)

export default rootReducers
