import { AUTHENTICATE, SIGN_IN, SIGN_IN_ERROR, SIGN_OUT } from '../actions/types'

const INITIAL_STATE = {
  firstName: null,
  lastName: null,
  _id: null,
  email: null,
  userToken: null
}

export default function userReducer(state= INITIAL_STATE, action) {
  switch(action.type) {
    case SIGN_IN:
      const { firstName, lastName, _id, email } = action.payload.user
      const { token } = action.payload
      return { ...state, firstName, lastName, _id, email, userToken: token }
    case AUTHENTICATE:
      return { ...state, firstName: action.payload.firstName, lastName: action.payload.lastName, _id: action.payload._id, email: action.payload.email }
    case SIGN_OUT:
    case SIGN_IN_ERROR:
      return { ...state, firstName: null, lastName: null, _id: null, email: null, userToken: null }
    default:
      return state
  }
}