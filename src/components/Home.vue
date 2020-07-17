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
            <span>密码管理</span>
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
        <!--主页数据-->
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {getMenuList} from './../plungs/mock'

  export default {

    data() {
      return {
        menuList: [],
        imageUrl:'./img/logout.png',
        // 是否折叠
        isCollapse: false,
        iconsObj: {
          '1': 'iconfont icon-user',
          '2': 'iconfont icon-tijikongjian',
          '3': 'iconfont icon-shangpin',
          '4': 'iconfont icon-danju',
          '5': 'iconfont icon-baobiao'
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
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
            name: "导航一",
            icon: 'el-icon-user-solid',
            children: [
              {
                id: "3",
                path: "/user/userLists",
                name: "导航1-1",
                icon: 'el-icon-menu',
                children: [
                  {
                    id: "4",
                    path: "/1/1/1",
                    name: "导航1-1-1",
                    icon: 'el-icon-menu',
                  },
                  {
                    id: "5",
                    path: "/1/1/2",
                    name: "导航1-1-2",
                    icon: 'el-icon-menu',
                  },
                  {
                    id: "6",
                    path: "/1/1/3",
                    name: "导航1-1-3",
                    icon: 'el-icon-menu',
                  }
                ]
              },

              {
                id: "2",
                path: "/authority/authorityLists",
                name: "导航1-2",
                icon: 'el-icon-menu',
              }
            ]
          },
          {
            id: "8",
            path: "/2",
            name: "导航二",
            icon: 'el-icon-setting'
          }
        ]
        console.log(this.menuList)
      },
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      logout() {
this.$router.push({path:'/login'})
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
  #avatar{
    width: 50px;
    height: 50px;
    background-image: url("img/avatar.png");
    background-size: 100% 100%;
    float: left;
  }

  .avatar{

  }
</style>
