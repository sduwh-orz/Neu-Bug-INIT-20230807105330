import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8088'
axios.defaults.withCredentials = true
export const $axios = axios