import { DISPLAY_JOB_OFFERS, DISPLAY_JOB_OFFERS_ERROR } from '../actions/types';

const INITIAL_STATE = {
  jobOffers: null,
  error: null
}

export default function jobOffersReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case DISPLAY_JOB_OFFERS:
      console.log(action.payload)
      return { ...state, jobOffers: action.payload }
    case DISPLAY_JOB_OFFERS_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}