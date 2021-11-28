import axios from 'axios'
import btwBD from '../apis/btwDB'
// import history from '../history'
import { SIGN_IN, SIGN_OUT, SIGN_IN_ERROR } from './types'

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
  const url = process.env.REACT_APP_URL
  await axios.post(`${url}/users/logout`, {}, { 
    headers: {
        Authorization: `Bearer ${token}`
    }
  }
)

  dispatch({ type: SIGN_OUT }) 
  localStorage.removeItem('TOKEN')
}