import {request} from './requst'
// 用户列表
export function getuserslist(current) {
  return request({
    // url: '/api/admin/users?'+'current='+current,
    // 'api/goods?'+type+'=1&page='+page,
    url: `/api/admin/users?${current}`,
    method:'get',
    data:{
      current:4
    }
  })
}
// 添加用户

export function adduser(data) {
  return request({
    url:'/api/admin/users',
    method:'post',
    data
  })
}
