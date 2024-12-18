import axios from 'axios'
axios.defaults.baseURL = 'https://bug.otmdb.cn:8088'
axios.defaults.withCredentials = true
export const $axios = axios