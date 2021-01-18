import axios from 'axios'
import { push } from 'svelte-spa-router'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((req) => {
  const token = localStorage['token']
  if (!token) {
    push('/')
  }
  req.headers['Authorization'] = `Bearer ${token}`
  return req
})

export default axiosInstance
