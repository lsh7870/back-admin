import {request} from './requst'

// 添加轮播图
export function addImg(data) {
  return request({
    url: '/api/admin/slides',

    method:'POST',
    data
  })
}

// 轮播图list
export function ImgList(data) {
  return request({
    url: '/api/admin/slides',
    data
  })
}
// 轮播图list禁用启用
export function ImgEnable(id) {
  return request({
    url: `/api/admin/slides/${id}/status`,
    method:'PATCH'
  })
}
// 轮播图删除
export function deleteImg(id) {
  return request({
    url: `/api/admin/slides/${id}`,
    method:'DELETE',
  })
}
// 获取oss token
export function getOssToken() {
  return request({
    url: '/api/auth/oss/token'
   
  })
}



