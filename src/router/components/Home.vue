<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout()">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF" unique-opened :collapse="isCollapse"
          :collapse-transition="false" router>
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"/>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-menu"/>
                <span>{{subItem.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!--        主区域路由占位符-->

        <!--        三个按钮-->
        <el-row>
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
        </el-row>


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
            icon: 'el-icon-menu',
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
            icon: 'el-icon-menu'
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
    background-color: #373d41;
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

  .el-aside {
    background-color: #333744;
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
</style>
