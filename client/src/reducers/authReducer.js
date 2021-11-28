import { AUTHENTICATE, CREATE_USER, CREATE_USER_ERROR, SIGN_IN, SIGN_IN_ERROR, SIGN_OUT } from '../actions/types'

const INITIAL_STATE = {
  isSignIn: false,
  error: null
}

export default function authReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SIGN_IN:
    case AUTHENTICATE:
    case CREATE_USER:
      return { ...state, isSignIn: true, error: null }
    case SIGN_OUT:
      return { ...state, isSignIn: false, error: null }
    case SIGN_IN_ERROR:
    case CREATE_USER_ERROR:
      return { ...state, isSignIn: false, error: action.payload }
    default:
      return state
  }
}