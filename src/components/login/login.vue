<template>
  <div class="warp">
    <div class="container">
      <el-card class="box-card">
        <div class="header">
          <span>绩效考核</span>
        </div>
       <div class="log">

       </div>
        <div class="login">
          <p>登录</p>
          <div class="loginForm">
            <el-form :model="loginForm" :rules="rules" ref="formRef" class="login_form" label-width="0px" >
              <!--            用户名称-->
              <el-form-item prop="username">
                <el-input class="el-input" v-model="loginForm.username" prefix-icon="iconfont icon-user"
                style="width:300px;" placeholder="输入用户" clearable/>
              </el-form-item>
              <!--            用户密码-->
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"
                type="password" placeholder="输入密码" show-password clearable/>
              </el-form-item>
              <!--           验证码-->
              <el-form-item prop="validateCode">
                <el-input v-model="loginForm.validateCode" prefix-icon="el-icon-finished"
                placeholder="输入验证码" style="width:200px; float:left;"/>
              </el-form-item>
              <div class="validateCode">
                验证码
              </div>
              <div class="forget">
                <a>忘记账号密码？</a>
              </div>
              <!-- 按钮-->
              <el-form-item class="btns">
                <el-button type="primary" @click="login" style="width:300px;">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
        },
        rules: {
          password: [
            {required: true, message: '请输入用户密码', trigger: 'blur'},

          ],
          username: [
            {required: true, message: '请输入用户名称', trigger: 'blur'}
          ]
        },

      }
    },
    methods: {
     login(){
       this.$http.post('/login/',this.loginForm).then(res=>{
         if(res.data.flag){
           this.$message({
             message:res.data.message,
             type: 'success'
           })
           //登录成功之后的一些操作
           //将登录成功之后token保存到客户端中得sessionStorage中；
           window.sessionStorage.setItem("Authorization", JSON.stringify(res.data.data));
           //项目中除了登录之外的接口，其他接口必须在登录之后才能访问

           //通过路由编程式导航到主页面中
           this.$router.push('/home');
         }else {
           this.$message.error(res.data.message)
         }
       })
     }
    }

  }
  var token = null;
  sessionStorage.setItem("",token)
</script>
<style scoped>
  .warp{
    background-color: #42b983;
    width: 100%;
    height: 100%;
    padding: 0;
    overflow: hidden;
    background-image:url("../img/bag.jpg");
  }
  .container{
    width: 1000px;
    height: 600px;
    background-color: #A9A9AB;
    margin: 80px 245px;
  }
  .log{
    width: 430px;
    height: 330px;
    background-image: url("../img/log.jpg");
    background-size: 100% 100%;
    float: left;
    margin: 100px 20px 100px 40px;
  }
  .header{
    width: 100%;
    height: 50px;
    padding: 0;
    margin: 0;
    border-bottom: #cccccc solid 1px;
  }
  .header span{
    font-size: 28px;
    color: #489af3;
   float: left;
    font-weight: 800;
    letter-spacing: 4px;
  }
  .login{
    float: right;
  }
  .login p{
    color: #489af3;
    font-size: 20px;
    font-weight: 700;
    margin-top: 40px;
  }
  .loginForm{
    margin: 30px 40px;
  }
  .validateCode{
    float: right;
    margin-top: -60px;
    width: 80px;
    height: 38px;
    background-color: #42b983;
    text-align: center;
    line-height: 38px;
  }
  .btns{
    margin-top: 50px;
  }
  .forget{
    margin-left: -186px;
    color: #d9dede;
  }
  .forget a{
    font-size: 14px;
  }
  .forget a:hover{
    cursor:pointer;
  }

</style>
