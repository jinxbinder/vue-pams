<template>
    <div>
        <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
          <el-form :inline="true" class="elForm">
            <el-form-item label="权限名称/服务/路径">
              <el-input v-model="pagination.queryString" placeholder="权限名称/服务/路径" class="filter-item" >
              </el-input>
            </el-form-item>
            <el-button class="dalfBut" @click="findPage()">查询</el-button>
          </el-form>
        <el-table :data="dataList" border stripe>
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column label="权限名称" prop="psName" align="center"></el-table-column>
            <el-table-column label="路径" prop="psApiPath" align="center"></el-table-column>
            <el-table-column label="权限级别" prop="psLevel" align="center">
                <template slot-scope="scope">
                    
                    <el-tag v-if="scope.row.psLevel =='1'">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.psLevel =='2'">二级</el-tag>
                    <el-tag type="warning" v-else>三级</el-tag>
                </template>
            </el-table-column>
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
export default {
   name: 'AuthorityLists',
   data () {
       return {
           //封装用户查询的信息
        pagination: {//分页相关模型数据
            currentPage: 1,//当前页码
            pageSize:10,//每页显示的记录数
            total:0,//总记录数
            queryString:null//查询条件
       },
       dataList:[]
   }
 },
 created(){
     this.findPage();
 },
 methods: {
      
      findPage(){
          //封装查询的参数
          var parm = {
              currentPage:this.pagination.currentPage,
              pageSize:this.pagination.pageSize,
              queryString:this.pagination.queryString
          }
          //发送ajax请求，获取后端传过来的数据
          this.$http.post(`/permission/findPage`,parm).then(res => {
              this.dataList = res.data.rows;
              this.pagination.total =res.data.total
          })
      },
      handleCurrentChange(currentPage){
          this.pagination.currentPage = currentPage
          this.findPage()
      }
   }
}
</script>
<style scoped>

</style>