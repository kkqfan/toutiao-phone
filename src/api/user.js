/* 
  用户相关请求模块
*/

import request from '../utils/request'


/*
  登录/注册
*/
export const login = data => {
  return request({
    method: "POST",
    url: "/app/v1_0/authorizations",
    data
  })
}

/*
  发送验证码
*/
export const sendSms = mobile => {
  return request({
    method: "GET",
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/*
  获取用户个人信息
*/
export const getCurrentInfo = () => {
  return request({
    method: "GET",
    url: `/app/v1_0/user`
  })
}

/*
  获取首页文章频道列表
*/
export const getUserChnnels = () => {
  return request({
    method: "GET",
    url: `/app/v1_0/user/channels`
  })
}


/**
 * 添加关注
 */
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}


/**
 * 添加文章收藏
 */
 export const addCollect = articleId => {
  return request({
    method: 'POST',
    url: ' /app/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消文章收藏
 */
export const deleteCollect = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}

/**
 * 文章点赞
 */
 export const addLike = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消文章点赞
 */
export const deleteLike = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
/**
 * 取消用户个人资料
 */
 export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/profile`
  })
}

/**
 * 修改用户个人资料
 */
 export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/profile`,
    data
  })
}
/**
 * 修改用户照片资料
 */
 export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/photo`,
    data
  })
}