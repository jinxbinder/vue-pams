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

import JsEncrypt from 'jsencrypt'
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


/**
 * 配置全局的加密方法
 * @param obj 需要加密的字符串
 */
Vue.prototype.$encruption = function (obj) {
  let encrypt = new JsEncrypt()
  // 公钥
  encrypt.setPublicKey(
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwKu2HHRujU9jzdlETM887TrdB5FnEBDzt8u0LD7GTdbeprFwqYXepWTgGriNzb9s88a/muJFyZAKoLcq4e7xhmQBvqDicZmkbwl4AUzUZHbhRSMAiYDeVM6HXJaBEgZWK0/iyJPpu6q4Y1g8/m6dU9c/Fg9VwFtzPEyFpghbNMOkPpcgqj3aT0ms1Dpe8TGSBeAkxuLN/FVVn8mPd6NnKHE1177HGcPYqCtu6CqHrl8ROoHVOXxzCkcFoYSYoAsk3i56cRBDqt8NwmKAKAhS1HYp8QyT7sEDuy9WZ5znHvv4wzCjsCn2iJEZwTPGR58chyrFp3hhpnlzZESyrOz4zQIDAQAB'
  )
  return encrypt.encrypt(obj)
}
