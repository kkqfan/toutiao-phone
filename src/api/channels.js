/**
 * 频道相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取全部频道列表
 */
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels',
    })
}

/**
* 添加频道到我的频道
*/
export const addUserChannel = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data
    })
}
/**
* 删除用户指定频道
*/
export const deleteUserChannel = channelID => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channelID}`,
    })
}