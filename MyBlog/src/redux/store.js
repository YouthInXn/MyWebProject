/**
 * testReduxStore
 * */
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducers'
import thunkMiddleWare from 'redux-thunk'

let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))

export default store
