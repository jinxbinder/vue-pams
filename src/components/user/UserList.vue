<template>

    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>员工管理</el-breadcrumb-item>
          <el-breadcrumb-item>员工列表</el-breadcrumb-item>
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
            <el-table-column label="姓名" prop="name" width="148px" align="center" ></el-table-column>
            <el-table-column label="邮箱" prop="email" width="200px" align="center" ></el-table-column>
            <el-table-column label="电话" prop="telephone" width="200px" align="center" ></el-table-column>
            <el-table-column label="学历" prop="education" width="100px" align="center" ></el-table-column>
            <el-table-column label="民族" prop="nation" width="120px" align="center" ></el-table-column>
            <el-table-column label="技能水平" prop="technology" width="120px" align="center" ></el-table-column>
            <el-table-column label="操作" width="365px" align="center" >
                <template slot-scope="scope">
                    <!-- 修改 -->
                    <el-button type="primary" icon="el-icon-edit" size='mini'  @click="edit(scope.row.id)"></el-button>
                    <!-- 删除 -->
                    <el-button type="danger" icon="el-icon-delete" size='mini' @click="dele(scope.row.id)"></el-button>
                    <!-- 分配角色 -->
                    <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size='mini'></el-button>
                    </el-tooltip>
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
          <el-dialog :title="titleMsg" :visible.sync="dialogFormVisible"            >
          <el-form label-width="80px" label-position="left" :rules="rules" ref="ruleForm" :model="formData">
            <el-row>
              <el-col :span="12">
                  <el-form-item label="姓名">
                    <el-input  placeholder="姓名" v-model="formData.name"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="技能">
                  <el-select v-model="formData.technology" style="width: 285px;">
                    <el-option label="计算机二级" value="计算机二级"></el-option>
                    <el-option label="软件设计师" value="软件设计师"></el-option>
                    <el-option label="系统架构师" value="系统架构师"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户邮箱" prop="email">
                  <el-input placeholder="用户邮箱" v-model="formData.email"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户电话" prop="telephone">
                  <el-input placeholder="用户电话" v-model="formData.telephone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学历" style="padding-right: 30px;">
                  <el-select v-model="formData.education" style="width: 285px;">
                      <el-option label="本科" value="本科"></el-option>
                      <el-option label="学士" value="学士"></el-option>
                      <el-option label="博士" value="博士"></el-option>
                      <el-option label="大专" value="大专"></el-option>
                      <el-option label="中专" value="中专"></el-option>
                      <el-option label="中专以下" value="中专以下"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="民族">
                  <el-select v-model="formData.nation" style="width: 285px;">
                    <el-option label="汉族" value="汉族"></el-option>
                    <el-option label="藏族" value="汉族"></el-option>
                    <el-option label="维吾尔族" value="维吾尔族"></el-option>
                    <el-option label="壮族" value="壮族"></el-option>
                    <el-option label="回族" value="回族"></el-option>
                  </el-select>
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
        rules: {
          telephone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        },
        dataList: [],//列表数据
        formData: {},//表单数据
        dialogFormVisible: false,
        titleMsg:""
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
         this.$http.post(`/emp/findPage`,parm).then(res=>{
          this.dataList = res.data.rows
          this.pagination.total = res.data.total

        })
      },
      //弹出新增或修改窗口
      edit(id){
          this.dialogFormVisible = true;
          this.$http.get(`/emp/findById?id=${id}`).then(res=>{
            this.formData=res.data.data
            if(id != null){
              this.titleMsg = "编辑信息"
            }else {
              this.titleMsg = "新增员工"
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
