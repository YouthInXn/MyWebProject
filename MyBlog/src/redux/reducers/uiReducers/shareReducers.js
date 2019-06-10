import { createCaseReducer, createSliceReducer } from '../reducerUtils'
import { GET_SHARE_LIST, GET_SHARE_LIST_FAILURE, GET_SHARE_LIST_SUCCESS } from '../../constants'


const initState = {
  loading:false
}

const ACTION_HANDLER = {
  [GET_SHARE_LIST]: (state) => createCaseReducer(state, { loading: true }),
  [GET_SHARE_LIST_SUCCESS]: (state) => createSliceReducer(state, { loading:false }),
  [GET_SHARE_LIST_FAILURE]: (state) => createSliceReducer(state, { loading:false })
}


export default createSliceReducer(initState, ACTION_HANDLER)
