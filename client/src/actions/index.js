import axios from 'axios'
import btwBD from '../apis/btwDB'
// import history from '../history'
import { SIGN_IN, SIGN_OUT, SIGN_IN_ERROR, AUTHENTICATE } from './types'

const URL = process.env.REACT_APP_URL

export const signIn = (formValues) => async (dispatch, getState) => {
  try {
    const response = await btwBD.post('/users/login', { ...formValues })
    
    await dispatch({ type: SIGN_IN, payload: response.data })
    localStorage.setItem('TOKEN', response.data.token)
    // history.push('/')
  } catch (err) {
    dispatch({ type: SIGN_IN_ERROR, payload: err})
  }
}


export const signOut = () => async (dispatch) => {
  const token = localStorage.getItem('TOKEN')
  await axios.post(`${URL}/users/logout`, {}, { 
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  
  dispatch({ type: SIGN_OUT }) 
  localStorage.removeItem('TOKEN')
}

export const authenticate = () => async (dispatch) => {
  const token = localStorage.getItem('TOKEN')
  const user = await axios.get(`${URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  dispatch({ type: AUTHENTICATE, payload: user.data })
}