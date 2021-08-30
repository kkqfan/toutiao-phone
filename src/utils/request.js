/*
 * 封装 axios 请求
*/
import axios from "axios";

import store from '@/store.js'
import JSONbig from 'json-bigint'
import { Toast } from 'vant';

import router from '@/router.js';

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
})

const request = axios.create({
  //baseURL:'http://ttapi.research.itcast.cn/'
  baseURL: 'http://ttapi.research.itcast.cn/',
  //baseURL:'/api',
  // 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // console.log(data)

    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      //console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }

    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]

})

//请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么，例如加入token
  const { user } = store.state;
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

//响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, async function (error) {
  // 对响应错误做点什么
  // console.log(error);
  const status = error.response.status
  if (status === 400) {
    //客户端请求参数错误
    Toast.fail('客户端请求参数错误')
  } else if (status === 401) {
    //token 无效
    //如果没有 user 或者 user.token ,直接去登录
    const { user } = store.state
    if (!user || !user.token) {
      return redirectlogin()
    }
    //如果有 refresh_token 请求获取新的 token
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: `/app/v1_0/authorizations`,
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }

      })
      user.token = data.data
      store.commit('setUser', user)

      return request(error.config)
    } catch (error) {
      redirectlogin()
    }
  } else if (status === 403) {
    //没有权限
    Toast.fail('没有权限')
  } else if (status >= 500) {
    //服务器异常
    Toast.fail('服务器异常，请稍后重试')
  }
  //抛出异常
  return Promise.reject(error);
});

function redirectlogin() {
  router.replace('/login')
}

//导出
export default request