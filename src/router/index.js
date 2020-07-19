import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from  '../components/Home'
import Welcome from '@/components/Welcome'
import UserList from '@/components/user/UserList'
import AuthorityLists from '@/components/authority/AuthorityLists.vue'
import RoleLists from '../components/user/UserList'
import Login from "../components/login/Login";
import PwdManage from "../components/PwdManage";
import Attendance from "../components/performance/Attendance";
import Labor from "../components/user/Labor";
import Post from "../components/performance/Post";
import Level from "../components/performance/Level";
Vue.use(VueRouter)

const routes = [

  {
    path: '/home', component: Home, redirect: '/welcome',
    children:[
      {path: '/welcome',component: Welcome},
      {path:'/pwd',component: PwdManage},
      {path: '/user/userLists',component: UserList},
      {path: '/user/labor',component:Labor },
      {path:'/performance/attendance',component: Attendance},
      {path:'/performance/post',component: Post},
      {path: '/performance/level',component: Level},
      {path: '/authority/authorityLists',component: AuthorityLists},
      {path: '/authority/roleLists', component: RoleLists},
      // {path:'/components/login/Login',component:Login}
     ]
  },
  {path: '/login',component:Login},
  // eslint-disable-next-line standard/object-curly-even-spacing
  { path: '/', redirect: '/home' },
  {path: '/',redirect: '/login'}
]

const router = new VueRouter({
  routes
})
 router.beforeEach((to,from,next)=>{
  if (to.path === '/login')return next()
  //从sessionStorage获取保存的token值
  const sessionStorage = window.sessionStorage.getItem("Authorization")
  if (!sessionStorage){
    return next('/login')
  }
  next()
})
export default router




