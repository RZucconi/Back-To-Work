import axios from 'axios'

const token = localStorage.getItem('TOKEN')

export default axios.create(
  {
  baseURL: 'http://localhost:3080',
  headers: {
    // Authorization: `Bearer ${token}`,
    token
  }
})
