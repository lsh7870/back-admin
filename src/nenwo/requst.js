import axios from 'axios';

export function request(config) {
  const instance = axios.create({
      baseURL: 'https://api.shop.eduwork.cn',
      timeout:5000
  })

  //请求拦截
  instance.interceptors.request.use(config=>{
      // 如果有一个接口需要认证才可以访问，就在这统一设置
      const token = window.localStorage.getItem('token');

      if(token) {
          config.headers.Authorization = 'Bearer '+token;
      }
      // 直接放行
      return config;
  }, err=>{

  })

  // 响应拦截
  instance.interceptors.response.use(res=>{
    //  console.log(res);
     let ress = [res.status,res.data]
      return res.data ? ress : res 
      // return res ? res: res;
  }, err=>{
      // 如果有需要授权才可以访问的接口， 统一去login授权
      if(err.response.status == '401') {
  
          router.push({path:'/login'});
      }

      // 如果有错误，这里面会去处理，显示错误信息
    
  })

  return instance(config);
}

