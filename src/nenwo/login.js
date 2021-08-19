import {request} from './requst'

export function getlogin(data) {

  return request({
    url: '/api/auth/login',
    // url: '/api/index',
    // /api/index
    method:'POST',
    data
   
  })
}

