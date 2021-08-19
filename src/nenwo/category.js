import {request} from './requst'

// 分类
export function goodsCategory() {
  return request({
    url:'/api/admin/category',  
   
  })
}
// 添加分类
export function addCategory(data) {
  return request({
    url:'/api/admin/category',
    method:'POST',
    data  
   
  })
}

