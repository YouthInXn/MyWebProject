import store from './store'
import { increment, decrement, reset } from '../router/Counter/actions'

console.log(store.getState())
/**
 * 给store注册监听
 * */
let unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(increment())
store.dispatch(decrement())
store.dispatch(increment())
store.dispatch(reset())

/* 取消监听 */
unsubscribe()
