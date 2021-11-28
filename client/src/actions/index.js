import axios from 'axios'
import btwDB from '../apis/btwDB'
import btwBD from '../apis/btwDB'
import history from '../history'
import { SIGN_IN, SIGN_OUT, SIGN_IN_ERROR, AUTHENTICATE, CREATE_USER, CREATE_USER_ERROR, EDIT_USER, EDIT_USER_ERROR } from './types'

const URL = process.env.REACT_APP_URL

export const signIn = (formValues) => async (dispatch) => {
  try {
    const response = await btwBD.post('/users/login', { ...formValues })
    
    await dispatch({ type: SIGN_IN, payload: response.data })
    localStorage.setItem('TOKEN', response.data.token)
    history.push('/')
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
  history.push('/')
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

export const onCreateUser = (formValues) => async (dispatch) => {
  try {
    const response = await btwDB.post('/users', { ...formValues })

    await dispatch({ type: CREATE_USER, payload: response.data })
    localStorage.setItem('TOKEN', response.data.token)
    history.push('/')
  } catch (err) {
    dispatch({type: CREATE_USER_ERROR, payload: err})
  }
}

export const editUser = (formValues) => async (dispatch) => {
  const token = localStorage.getItem('TOKEN')
  try {
    const response = await axios.patch(`${URL}/users/me`, { ...formValues }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    await dispatch({ type: EDIT_USER, payload: response.data })
  } catch (err) {
    dispatch({type: EDIT_USER_ERROR, payload: err})
  }
}