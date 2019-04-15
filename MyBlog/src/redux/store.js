/**
 * testReduxStore
 * */
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducers'
import thunkMiddleWare from 'redux-thunk'
import promiseMiddleware from './Middlewares/customPromiseMiddleware'
// import reduxPromiseMiddleWare from 'redux-promise'

let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare, promiseMiddleware))
/**
 * React Hot Loader config
 * */
if (module.hot) {
  module.hot.accept('./reducers/rootReducers', () => {
    const nextReducers = require('./reducers/rootReducers').default
    store.replaceReducer(nextReducers)
  })
}

export default store
