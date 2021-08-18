import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user';

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) //当前登录用户的登录状态（token 等数据）
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      //防止页面刷新后数据丢失，在此将 token 数据保存到本地存储，达到数据持久化
      setItem(USER_KEY, data)
    }
  },
  actions: {

  }
})
