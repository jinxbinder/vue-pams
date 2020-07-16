import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from  '../components/Home'
import Welcome from '@/components/Welcome'
import UserList from '@/components/user/UserList'
import AuthorityLists from '@/components/authority/AuthorityLists.vue'
import RoleLists from '@/components/authority/RoleLists.vue'

Vue.use(VueRouter)

const routes = [
  
  { path: '/home', component: Home, redirect: '/welcome',
    children:[
      {path: '/welcome',component: Welcome},
      {path: '/user/userLists',component: UserList},
      {path: '/authority/authorityLists',component: AuthorityLists},
      {path: '/authority/roleLists', component: RoleLists}
     ]},
  // eslint-disable-next-line standard/object-curly-even-spacing
  { path: '/', redirect: '/home' }
]

const router = new VueRouter({
  routes
})

export default router
