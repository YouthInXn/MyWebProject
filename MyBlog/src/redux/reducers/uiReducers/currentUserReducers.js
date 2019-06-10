// reducer
import {LOGIN_POP_TOGGLE, USER_LOGIN, USER_REGISTER} from '../../constants/index'

const initState = { current: {}, popShow: false }

export default function (state = initState, action) {
  switch (action.type) {
  case USER_LOGIN:
  case USER_REGISTER:
    return Object.assign({}, state, { current: action.user })
  case LOGIN_POP_TOGGLE:
    return Object.assign({}, state, { popShow: action.popShow })
  default:
    return state
  }
}
