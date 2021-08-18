/*
 * 封装 axios 请求
*/
import axios from "axios";

import store from '@/store.js'

const request = axios.create({
    //baseURL:'http://ttapi.research.itcast.cn/'
    baseURL: 'http://ttapi.research.itcast.cn/'
})

//请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么，例如加入token
    const {user}=store.state;
    if(user){
        config.headers.Authorization=`Bearer ${user.token}`
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

//响应拦截器

//导出
export default request