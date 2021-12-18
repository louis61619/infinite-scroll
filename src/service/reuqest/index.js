import axios from 'axios'

import { BASE_URL, TIMEOUT } from './config'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return err
  }
)

instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log('請求錯誤')
          break
        case 401:
          console.log('未授權')
          break
        default:
          break
      }
    }
    return err
  }
)

export default instance
