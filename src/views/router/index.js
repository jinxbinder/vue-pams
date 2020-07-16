import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from  '../components/Home'
import Welcome from '@/components/Welcome'
import UserList from '@/components/user/UserList'
import AuthorityLists from '@/components/authority/AuthorityLists.vue'
import RoleLists from '@/components/authority/RoleLists.vue'
import Login from "../components/login/Login";


Vue.use(VueRouter)

const routes = [

  {
    path: '/home', component: Home, redirect: '/welcome',
    children:[
      {path: '/welcome',component: Welcome},
      {path: '/user/userLists',component: UserList},
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

export default router
