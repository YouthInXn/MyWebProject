import { combineReducers } from 'redux'
import { createSliceReducer } from '../reducerUtils'
import { SHOW_SHARE_LIST } from '../../constants'

const SHARE_BYID_HANDLER = {
  [SHOW_SHARE_LIST]: (state, action) => {
    const { entities } = action.data
    return { ...entities.share }
  }
}

const SHARE_ALLIDS_HANDLER = {
  [SHOW_SHARE_LIST]: (state, action) => {
    const { result } = action.data
    return [ ...result ]
  }
}

export default combineReducers({
  allIds:createSliceReducer([], SHARE_ALLIDS_HANDLER),
  byId:createSliceReducer({}, SHARE_BYID_HANDLER)
})

