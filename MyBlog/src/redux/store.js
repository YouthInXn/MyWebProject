/**
 * testReduxStore
 * */
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducers'
import thunkMiddleWare from 'redux-thunk'
import promiseMiddleware from './Middlewares/customPromiseMiddleware'
// import reduxPromiseMiddleWare from 'redux-promise'

let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare, promiseMiddleware))
/**
 * React Hot Loader config
 * */
if (module.hot) {
  module.hot.accept('./rootReducers', () => {
    const nextReducers = require('./rootReducers').default
    store.replaceReducer(nextReducers)
  })
}

export default store
