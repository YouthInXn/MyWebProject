
/**
 * 创建切片Reducer
 * @param state
 * @param initState
 * @param action
 * @param actionHander
 * */
export const createSliceReducer = (initState, actionHander) => (state = initState || {}, action) => {
  if (!actionHander) { return state }
  const handler = actionHander[action.type]
  return handler ? handler(state, action) : state
}

/**
 * 创建reducer
 * @param newState
 * */
export const createCaseReducer = (oldState, newState) => {
  return Object.assign({}, oldState, { ...oldState, ...newState })
}
