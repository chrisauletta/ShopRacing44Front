import axios from 'axios'
import store from '@/store'

const http = axios.create({
  baseURL: 'http://192.168.237.86:21044/',
  //baseURL: 'http://auto-unity.kinghost.net:21044',
  headers: {
    'Accept': 'application/json',
    'Content': 'application/json',
  }
})


export default http
