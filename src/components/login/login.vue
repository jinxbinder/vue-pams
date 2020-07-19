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
                <el-input class="input-val" v-model="loginForm.validateCode" prefix-icon="el-icon-finished"
                placeholder="请输入验证码" style="width:200px; float:left;"/>
                <canvas id="canvas" width="95" height="38"></canvas>
              </el-form-item>
              <!--<div class="validateCode valCode">-->

              <!--</div>-->
              <div class="forget">
                <a>忘记账号密码？</a>
              </div>
              <!-- 按钮-->
              <el-form-item class="btns">
                <el-button class="btn" type="primary" @click="login" style="width:300px;">登录</el-button>
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
  $(function(){
    var show_num = [];
    draw(show_num);
    $("#canvas").on('click',function(){
      draw(show_num);
    })
    $(".btn").on('click',function(){
      var val = $(".input-val").val().toLowerCase();
      console.log(val)
      var num = show_num.join("");
      if(val==''){
        alert('请输入验证码！');
        draw(show_num);
      }else if(val == num){
        alert('提交成功！');
        $(".input-val").val('');
        // draw(show_num);
      }else{
        alert('验证码错误！请重新输入！');
        $(".input-val").val('');
        draw(show_num);
      }
    })
  })
  //生成并渲染出验证码图形
  function draw(show_num) {
    var canvas_width=$('#canvas').width();
    var canvas_height=$('#canvas').height();
    var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    var aCode = sCode.split(",");
    var aLength = aCode.length;//获取到数组的长度
    for (var i = 0; i < 4; i++) { //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
      var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
      // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
      var deg = Math.random() - 0.5; //产生一个随机弧度
      var txt = aCode[j];//得到随机的一个内容
      show_num[i] = txt.toLowerCase();
      var x = 10 + i * 20;//文字在canvas上的x坐标
      var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
      context.font = "bold 23px 微软雅黑";
      context.translate(x, y);
      context.rotate(deg);
      context.fillStyle = randomColor();
      context.fillText(txt, 0, 0);
      context.rotate(-deg);
      context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
      context.strokeStyle = randomColor();
      context.beginPath();
      context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
      context.strokeStyle = randomColor();
      context.beginPath();
      var x = Math.random() * canvas_width;
      var y = Math.random() * canvas_height;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
  }
  //得到随机的颜色值
  function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
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
    width: 95px;
    height: 38px;
    /*background-color: #42b983;*/
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
  #canvas {
    vertical-align: middle;
    box-sizing: border-box;
    border: 1px solid #ddd;
    cursor: pointer;
    z-index: 999;
  }
</style>
