import axios from 'axios'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8080'
} else {
  axios.defaults.baseURL = 'https://bug.otmdb.cn:8088'
}
axios.defaults.withCredentials = true
export const $axios = axios