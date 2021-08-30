import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user';

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY), //当前登录用户的登录状态（token 等数据）
    cachePages: ['layoutIndex']

  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      //防止页面刷新后数据丢失，在此将 token 数据保存到本地存储，达到数据持久化
      setItem(USER_KEY, data)
    },
    addCachePages(state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },

    removeCachPages(state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {

  }
})
