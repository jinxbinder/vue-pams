import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
// import './plungs/element.js'
import ElementUi from 'element-ui'
import './plungs/healthmobile.js'
import './plungs/jutils.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import $ from 'jquery'
axios.defaults.baseURL='http://localhost:8081/'
//通过axios请求拦截器添加token，保证获取数据的权限
axios.interceptors.request.use(config=>{
  //为请求头对象添加token的Authorization字段
  let token = sessionStorage.getItem('Authorization')
  if (!config.headers.hasOwnProperty('Authorization') && token) {
    config.headers.Authorization = token;
    // config.headers.Authorization = window.sessionStorage.getItem('Authorization')
  }
  return config
});
//响应拦截器
/*
axios.interceptors.response.use(res=>{
  console.log("响应状态码："+res.status);

  return res;
},
  error => {
  console.log("错误状态码",error.status);
  console.log("错误状态码",error.code);
  console.log("错误状态码",error.status.code);
  console.log("错误状态码",error.toString());
    if(401 === error.status){
      router.push('/login')
      // alert("您长时间未操作，需要重新登录！");

    }
  });
*/

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUi)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
