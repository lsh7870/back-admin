import {request} from './requst'

export function getmenus() {

  return request({
    url: '/api/admin/menus',
   
  })
}
