import axios from 'axios'
import { replace } from 'svelte-spa-router'

const axiosInstance = axios.create({
  baseURL: '/api/data',
})

axiosInstance.interceptors.request.use((req) => {
  const token = localStorage['token']
  req.headers['Authorization'] = `Bearer ${token}`
  return req
})

axiosInstance.interceptors.response.use(
  (resp) => {
    return resp
  },
  (error) => {
    console.error(error)
    if (401 === error.response.status) {
      localStorage['token'] = ''
      replace('/')
    } else {
      return Promise.reject(error)
    }
  }
)

export default axiosInstance
