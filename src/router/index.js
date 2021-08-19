import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('../views/Login.vue');
const routes = [
  {
    path: '/',
    name: 'login',
    redirect:'/login',
    // component:Login,
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    redirect:'/welcome',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/Home.vue'),
    children:[{
      path: '/welcome',
      name: 'welcome',
      component: () => import( '../components/Welcome.vue')
    },
    {
      path: '/25',
      name: '/25',
      component: () => import( '../components/user/User.vue')
    },
     // 添加轮播图
     {
      path: '/38',
      name: '38',
      component: () => import( '../components/Carouselimg/AddCarouselimg.vue')
    },
    // 添加轮播图列表
    {
      path: '/37',
      name: '37',
      component: () => import( '../components/Carouselimg/CarouselImgList.vue')
    },
    // 商品管理
     {
      path: '/30',
      name: '30',
      component: () => import( '../components/goods/GoodsList.vue')
    },
    {
      path: '/31',
      name: '31',
      component: () => import( '../components/goods/AddGoods.vue')
    },
      // 分类管理
      {
        path: '/27',
        name: '27',
        component: () => import( '../components/category/Category.vue')
      },
      {
        path: '/28',
        name: '28',
        component: () => import( '../components/category/addcategory.vue')
      },
  ]
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  document.title='后台管理系统'
  const token =window.localStorage.getItem('token')
  if(to.path==='/login'&&token){
    return next('/home')
  } 
  if(to.path==='/login'&&!token) return next()
  if(!token) return next('/login')

  next()
})
export default router
