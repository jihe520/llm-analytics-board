// 封装http axios 请求
import axios from 'axios'

const httpInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})


// 请求拦截器
httpInstance.interceptors.request.use((config) => {
  return config
}, (error) => {
  console.error('请求配置错误:', error)
  return Promise.reject(error)
})


// 响应拦截器
httpInstance.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (error.code === 'ECONNABORTED') {
    console.error('请求超时，正在重试...')
    // 重试请求
    return httpInstance(error.config)
  }
  return Promise.reject(error)
})



export default httpInstance
