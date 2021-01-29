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

axiosInstance.interceptors.response.use((resp) => {
  resp.status === 401 && replace('/')
  return resp
})

export default axiosInstance
