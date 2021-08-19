import {request} from './requst'

export function goodsList(data) {
  return request({
    url: '/api/admin/goods',  
    data 
  })
}
// 上架
export function goodsGrounding(id) {
  return request({
    url:`/api/admin/goods/${id}/on`,  
    method: 'PATCH'
  })
}
// 添加
export function addGoods(data) {
  return request({
    url:'/api/admin/goods',  
    method: 'post',
    data
    // :{
    //   category_id:15,
    //   title:'sss',
    //   description:'ss',
    //   price:55,
    //   stock:55,
    //   cover:'sss',
    //   details:'sss'
    // }
    
  })
}
// 分类
export function goodsCategory() {
  return request({
    url:'/api/admin/category',  
   
  })
}

