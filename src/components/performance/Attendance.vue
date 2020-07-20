<template>

  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>绩效管理</el-breadcrumb-item>
      <el-breadcrumb-item>考勤管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain @click="exportExcel()">导出数据</el-button>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-table :data="dataList" border stripe>
        <!--            <el-table-column type="index"></el-table-column>-->
        <el-table-column label="姓名" prop="name" width="148px" align="center" ></el-table-column>
        <el-table-column label="应出勤(天)" prop="swork" width="186px" align="center" ></el-table-column>
        <el-table-column label="实际出勤(天)" prop="rwork" width="200px" align="center" ></el-table-column>
        <el-table-column label="迟到(次)" prop="later" width="150px" align="center" ></el-table-column>
        <el-table-column label="旷工(次)" prop="absent" width="150px" align="center" ></el-table-column>
        <el-table-column label="早退(次)" prop="level" width="150px" align="center" ></el-table-column>
        <el-table-column label="调休(小时)" prop="rest" width="150px" align="center" ></el-table-column>
        <el-table-column label="综合得分" prop="rest" width="120px" align="center" ></el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <div class="pagination-container">
        <el-pagination
          class="pagiantion"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>

    </el-card>
  </div>


</template>

<script>
  import {checkEmail,checkPhone} from '../../plungs/verification'
  export default {
    name: 'UserList',
    data(){
      return {
        //封装用户查询的信息
        pagination: {//分页相关模型数据
          currentPage: 1,//当前页码
          pageSize:10,//每页显示的记录数
          total:0,//总记录数
          queryString:null//查询条件
        },
        dataList: [],//列表数据
        dialogFormVisible: false,
      }
    },
    created () {
      this.findPage()
    },
    methods:{
      findPage(){
        let parm={
          currentPage: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
          queryString:this.pagination.queryString
        }
        this.$http.post(`/checkWork/findPage`,parm).then(res=>{
          this.dataList = res.data.rows
          this.pagination.total = res.data.total

        })
      },
      resetFormData(){
        this.formData={}
      },
      exportExcel(){
        // this.$http.get(`/checkWork/export`).then(res=>{
        //
        // })
        this.$http.get("/checkWork/export",{responseType: 'blob'}).then(response=>{
          // //将response 新建成文件流
          // var blob = new Blob([response], {type: 'application/vnd.ms-excel;charset=utf-8'})
          // //创建下载地址以及a标签,并且模拟a标签的点击事件进行下载文件。
          // var url = window.URL.createObjectURL(blob);
          // var aLink = document.createElement("a");
          // aLink.style.display = "none";
          // aLink.download = '员工考勤模板.xlsx';
          // aLink.href = url;
          // document.body.appendChild(aLink)
          // aLink.click()

        }).catch(error=>{
          console.log(error);
        })

      },
      handleCurrentChange(currentPage){
        //为模型数据赋值（当前页面）
        this.pagination.currentPage = currentPage;
        this.findPage();
      }
    },

  }
</script>

<style scoped>

</style>

