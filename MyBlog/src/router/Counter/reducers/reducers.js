import { INCREMENT, DECREMENT, RESET } from '../actions/index'

/**
 * initState
 * */
const initState = {
  count:0
}
/**
 * reducers
 * */
export default function countReducer (state = initState, action) {
  switch (action.type) {
  case INCREMENT:
    return Object.assign({}, state, { count:state.count + 1 })
  case DECREMENT:
    return Object.assign({}, state, { count:state.count - 1 })
  case RESET:
    return Object.assign({}, state, { count:0 })
  default:
    return state
  }
}
