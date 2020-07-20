<template>

  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>绩效管理</el-breadcrumb-item>
      <el-breadcrumb-item>岗级绩效</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-form :inline="true" class="elForm">
        <el-form-item>
          <el-input v-model="pagination.queryString" placeholder="用户姓名/学历" class="filter-item" >
          </el-input>
        </el-form-item>

        <el-button class="dalfBut" @click="findPage()">查询</el-button>
        <el-button type="primary"  class="butT" @click="dialogFormVisible=true;formData={}">新增</el-button>
      </el-form>
      <el-table :data="dataList" border stripe>
        <!--            <el-table-column type="index"></el-table-column>-->
        <el-table-column label="岗位基本工资" prop="levelBasicSalary" width="148px" align="center" ></el-table-column>
        <el-table-column label="绩效工资" prop="levelPrp" width="200px" align="center" ></el-table-column>
        <el-table-column label="岗级" prop="telephone" width="200px" align="center" ></el-table-column>
        <el-table-column label="操作" width="365px" align="center" >
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size='mini'  @click="edit(scope.row.id)"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size='mini' @click="dele(scope.row.id)"></el-button>
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
      <!-- 弹出编辑窗口 -->
      <el-dialog  :visible.sync="dialogFormVisible"            >
        <el-form label-width="80px" label-position="left"  :model="formData">
          <el-row>
            <el-col :span="12">
              <el-form-item label="岗位基本工资" prop="levelBasicSalary">
                <el-input  placeholder="" v-model="formData.levelBasicSalary"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="绩效工资" prop="levelPrp">
                <el-input placeholder="" v-model="formData.levelPrp"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗级" prop="level">
                <el-input placeholder="" v-model="formData.level"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="save()">保存</el-button>
            <el-button type="info" @click="dialogFormVisible = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>


</template>

<script>
  import {checkEmail,checkPhone} from '../../plungs/verification'
  export default {
    name: 'Level',
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
        formData: {},//表单数据
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
        this.$http.post(`/lev/findByLevelPage`,parm).then(res=>{
          this.dataList = res.data.rows
          this.pagination.total = res.data.total

        }).catch(error=>{
          console.log("错误状态码："+error.response.status)
          if(401 === error.response.status){
            this.$message.info("您长时间未操作，请重新登录！")
            window.sessionStorage.setItem("Authorization", '');
            this.$router.push('/login')
          }
        })
      },
      //弹出新增或修改窗口
      edit(id){
        this.dialogFormVisible = true;
        this.$http.get(`/lev/level?id=${id}`).then(res=>{
          this.formData=res.data.data
          if(id != null){
            this.titleMsg = "编辑信息"
          }else {
            this.titleMsg = "新增员工"
          }
        }).catch(error=>{
          console.log("错误状态码："+error.response.status)
          if(401 === error.response.status){
            this.$message.info("您长时间未操作，请重新登录！")
            window.sessionStorage.setItem("Authorization", '');
            this.$router.push('/login')
          }
        })
      },
      save(id){
        this.$http.post(`/emp/${this.formData.id==null?'save':'update'}`,this.formData).then(res=>{
          this.dialogFormVisible=false;
          if(res.data.flag){
            this.$message({
              type:'success',
              message:res.data.message
            })
            this.findPage()
          }else{
            this.$message.error(res.data.message);
          }
        }).catch(error=>{
          console.log("错误状态码："+error.response.status)
          if(401 === error.response.status){
            this.$message.info("您长时间未操作，请重新登录！")
            window.sessionStorage.setItem("Authorization", '');
            this.$router.push('/login')
          }
        })
      },
      dele(id){
        this.$confirm('您确定要永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(`/emp/delete?id=${id}`).then(res=>{
            if(res.data.flag){
              this.$message({
                type: 'success',
                message: res.data.message
              });
              this.findPage()
            }else{
              this.$message.error(res.data.message)
            }
          })
        }).catch(error=>{
          console.log("错误状态码："+error.response.status)
          if(401 === error.response.status){
            this.$message.info("您长时间未操作，请重新登录！")
            window.sessionStorage.setItem("Authorization", '');
            this.$router.push('/login')
          }
        })
      },
      resetFormData(){
        this.formData={}
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

