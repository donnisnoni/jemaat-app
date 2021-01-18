import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((req) => {
  const token = localStorage['token']
  req.headers['Authorization'] = `Bearer ${token}`
  return req
})

export default axiosInstance
