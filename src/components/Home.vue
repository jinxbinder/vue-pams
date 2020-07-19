<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <span>绩效管理系统</span>
      </div>
      <ul class="nav">
        <li>
          <i class="el-icon-s-home"></i><br>
          <span>首页</span>
        </li>
        <li>
          <i class="el-icon-s-order"></i><br>
          <span>绩效考评</span>
        </li>
        <li>
          <i class="el-icon-tickets"></i><br>
          <span>经费预算</span>
        </li>
        <li>
          <i class="el-icon-s-check"></i><br>
          <span>人力资源</span>
        </li>
        <li>
          <i class="el-icon-setting"></i><br>
          <span>系统管理</span>
        </li>
        </ul>
        <ul class="nva-rig">
          <li class="avatar" style="margin-left: 100px">
            <div id="avatar"></div>
            <span>您好，管理员</span>
          </li>
          <li class="avatar">
            <i class="el-icon-lock"></i>
            <span @click="pwdManage()">密码管理</span>
          </li>
          <li class="avatar">
            <i class="el-icon-switch-button"></i>
            <span @click="logout()"> 退出登录</span>
          </li>
        </ul>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'" style=" background-color: #3584f7;">
        <div class="toggle-button" @click="toggleCollapse" style=" background-color: #1346d7;" >|||</div>
        <el-menu
          background-color="#3584f7"
          text-color="#fff"
          active-text-color="#1346d7" unique-opened :collapse="isCollapse"
          :collapse-transition="false" router>
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id" style="border-bottom: 0.5px solid #ecf4fe;">
            <template slot="title" >
              <i :class="item.icon" style="color:#fff;" />
              <span>{{item.name}}</span>
            </template>
            <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-menu" style="color:#fff;" />
                <span>{{subItem.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!--        主区域路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
    <!--密码管理弹出框-->
    <el-dialog :visible.sync="centerDialogVisible" width="30%" center class="pas">
      <el-form :model="rePass">
        <div>
          <span style="margin-right: 8px">请输入用户姓名</span><el-input style="width: 250px" v-model="rePass.username"></el-input>
        </div>
        <div>
          <span style="margin-right: 20px">请输入旧密码</span><el-input style="width: 250px" v-model="rePass.password"></el-input>
        </div>
        <div>
          <span style="margin-right: 20px">请输入新密码</span><el-input style="width: 250px" v-model="rePass.newPass"></el-input>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="repass">确 定</el-button>
  </span>
    </el-dialog>

  </el-container>
</template>

<script>
  import {getMenuList} from './../plungs/mock'

  export default {

    data() {
      return {
        menuList: [],
        centerDialogVisible:false,
        imageUrl:'./img/logout.png',
        rePass:{},

        // 是否折叠
        isCollapse: false,
        iconsObj: {
          '1': 'iconfont icon-user',
          '2': 'iconfont icon-tijikongjian',
          '3': 'iconfont icon-shangpin',
          '4': 'iconfont icon-danju',
          '5': 'iconfont icon-baobiao'
        },
      }
    },
    created() {
      this.getMenu()
    },
    methods: {

      //获取菜单列表
      getMenu() {
        console.log(getMenuList())
        this.menuList = [
          {
            id: "1",
            path: "/1",
            name: "员工管理",
            icon: 'el-icon-user-solid',
            children: [
              {
                id: "3",
                path: "/user/userLists",
                name: "员工列表",
                icon: 'el-icon-menu',

              },
              {
                id: "4",
                path: "/user/labor",
                name: "劳动关系",
                icon: 'el-icon-menu',
              }
            ]
          },
          {
            id: "8",
            path: "/2",
            name: "绩效管理",
            icon: 'el-icon-setting',
            children: [
              {
                id: "9",
                path: "/performance/attendance",
                name: "考勤管理",
                icon: 'el-icon-menu',
              },
              {
                id: "10",
                path: "/performance/post",
                name: "岗位管理",
                icon: 'el-icon-menu',
              },
              {
                id: "11",
                path: "/performance/level",
                name: "岗级绩效",
                icon: 'el-icon-menu',
              }
            ]
          }
        ]
        console.log(this.menuList)
      },
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      logout() {
          this.$router.push({path:'/login'})
      },
      pwdManage(){
        this.centerDialogVisible = true
      },
      repass(){
        this.$http.post(`/user/repass`,this.rePass).then(res=>{
            this.centerDialogVisible = false
          if(res.data.flag){
            this.$message({
              type:'success',
              message:res.data.message
            })
          }else{
            this.$message.error(res.data.message);
          }
        })
      }
    }
  }
</script>

<style scoped>
  .home-container {
    height: 100%
  }

  .el-header {
    background-color: #3584f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 20px;
  }

  .el-header > div {
    display: flex;
    align-items: center;
  }

  .el-header > div > span {
    margin-left: 15px;
  }

  .el-main {
    background-color: #eaedf1;
  }

  .iconfont {
    margin-right: 10px;
  }

  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .logout{
    color: whitesmoke;
    font-size: 18px;
  }
  .logout:hover{
    cursor: pointer;
  }
  .nav{

  }
  .nav li{
    list-style: none;
    float: left;
  }
  .nav li:hover{
    cursor: pointer;
    color: #cccccc;
  }
  .nav li{
    padding: 2px 30px;
  }
  .nav li span{
    font-size: 14px;
  }
  .nva-rig{
    float: right;
  }
  .nva-rig li{
    padding: 2px 15px;
    line-height: 44px;
    float: left;
    list-style: none;
  }
  .nva-rig li span{
    font-size: 14px;
  }
  .nva-rig li:hover{
    cursor: pointer;
    color: #cccccc;
  }
  #avatar{
    width: 50px;
    height: 50px;
    background-image: url("img/avatar.png");
    background-size: 100% 100%;
    float: left;
  }
  .pas div{
    margin: 10px 5px 10px 5px;
  }
</style>
