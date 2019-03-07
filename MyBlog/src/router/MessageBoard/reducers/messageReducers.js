import { GET_ALL_MESSAGE, LIKE_MESSAGE_SUCCESS, COMMIT_COMMENTS, REPLY_COMMENTS } from '../constants'

const initState = {
  msgs:[],
}

const ACTION_HANDLER = {
  [GET_ALL_MESSAGE]: (state, action) => {
    return Object.assign({}, state, { msgs:action.msgs })
  },
  [LIKE_MESSAGE_SUCCESS]: (state, action) => {
    const { data } = action.result
    let t = state.msgs.map(m => {
      if (m._id === data._id) {
        return data
      }
      return m
    })
    return Object.assign({}, state, { msgs:t })
  },
  [COMMIT_COMMENTS]: (state, action) => {
    const { data } = action
    let newMsgs = state.msgs.map(m => {
      if (m._id === data._id) {
        return data
      }
      return m
    })
    return Object.assign({}, state, { msgs:newMsgs })
  },
  [REPLY_COMMENTS]: (state, action) => {
    const { data, msgId } = action
    let newMsgs = state.msgs.map(m => {
      if (m._id === msgId) {
        let nm = m.comments.map(i => {
          if (i._id === data.toComment) {
            i.replies.push(data)
          }
          return i
        })
        return nm
      }
      return m
    })
    return Object.assign({}, state, { msgs:newMsgs })
  }
}

export default function (state = initState, action) {
  const handler = ACTION_HANDLER[action.type]
  return handler ? handler(state, action) : state
}
