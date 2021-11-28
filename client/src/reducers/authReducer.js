import { AUTHENTICATE, SIGN_IN, SIGN_IN_ERROR, SIGN_OUT } from '../actions/types'

const INITIAL_STATE = {
  isSignIn: false,
  signInError: null
}

export default function authReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SIGN_IN:
    case AUTHENTICATE:
      return { ...state, isSignIn: true, signInError: null }
    case SIGN_OUT:
      return { ...state, isSignIn: false }
    case SIGN_IN_ERROR:
      return { ...state, isSignIn: false, signInError: action.payload }
    default:
      return state
  }
}