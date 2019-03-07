import axios from 'axios'
/* https://github.com/brickspert/blog/issues/1#op-http */

const customAxios = axios.create({
  withCredentials: true,
  timeout:3000
})

const customPromiseMiddle = () => ({ dispatch, getState }) => next => action => {
  // 函数action交给redux-thunk，这里不做处理
  if (typeof action === 'function') {
    return next(action)
  }

  // action中不带有promise字段，直接进入下一个中间件
  if (!action.promise) {
    return next(action)
  }

  // 解析actions
  // promise是一个函数，将axios作为参数传递进去，在函数内部返回一个Promise对象
  const { promise, types, success, failed, ...rest } = action

  // 解析types 按照顺序actiontype：发起请求,成功,失败
  let REQUEST, SUCCESS, FAILURE
  types.length > 2 ? [ REQUEST, SUCCESS, FAILURE ] = types : [ SUCCESS, FAILURE ] = types

  // 发起一个请求开始的ACTION，一般用于LOADING,
  // 如果types只有两个，则认为没有LOADING的过程，只派发成功和失败的ACTION
  REQUEST && next({ type:REQUEST, ...rest })

  // 请求成功派发成功的action
  const onSuccess = (result) => {
    next({ type:SUCCESS, result:result.data, ...rest })
    success && success(dispatch, getState, result.data)
  }
  // 请求失败派发失败的action
  const onFailure = (error) => {
    next({ type:FAILURE, error, ...rest })
    failed && failed(dispatch, getState, error)
  }
  // dispatch a Promise!
  return promise(customAxios).then(
    onSuccess,
    onFailure
  ).catch(e => {
    console.error('Error in PromiseWare:',  e)
    onFailure(e)
  })
}

export default customPromiseMiddle()
/**
 * action like this
 * */
// export function getUserInfo() {
//   return {
//     types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
//     promise: client => client.get(`http://localhost:8080/api/user.json`)
//   }
// }

// export default  store => next => action => {
//   const {dispatch, getState} = store;
//   /*如果dispatch来的是一个function，此处不做处理，直接进入下一级*/
//   if (typeof action === 'function') {
//     action(dispatch, getState);
//     return;
//   }
//   /*解析action*/
//   const {
//     promise,
//     types,
//     afterSuccess,
//     ...rest
//   } = action;
//
//   /*没有promise，证明不是想要发送ajax请求的，就直接进入下一步啦！*/
//   if (!action.promise) {
//     return next(action);
//   }
//
//   /*解析types*/
//   const [REQUEST,
//     SUCCESS,
//     FAILURE] = types;
//
//   /*开始请求的时候，发一个action*/
//   next({
//     ...rest,
//     type: REQUEST
//   });
//   /*定义请求成功时的方法*/
//   const onFulfilled = result => {
//     next({
//       ...rest,
//       result,
//       type: SUCCESS
//     });
//     if (afterSuccess) {
//       afterSuccess(dispatch, getState, result);
//     }
//   };
//   /*定义请求失败时的方法*/
//   const onRejected = error => {
//     next({
//       ...rest,
//       error,
//       type: FAILURE
//     });
//   };
//
//   return promise(axios).then(onFulfilled, onRejected).catch(error => {
//     console.error('MIDDLEWARE ERROR:', error);
//     onRejected(error)
//   })
// }

