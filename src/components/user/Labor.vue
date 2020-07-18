<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>劳动关系</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-table :data="dataList" border stripe>
          <el-table-column type="index" label="序号" align="center"></el-table-column>
          <el-table-column label="员工姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="入职时间" prop="date" align="center"></el-table-column>
          <el-table-column label="试用时间" prop="tryDate" align="center"/>
          <el-table-column label="是否转正" prop="isFormal" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isFormal" disabled
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="转正时间" prop="formalDate" align="center"></el-table-column>
          <el-table-column label="转正审批人" prop="formalPer" align="center"></el-table-column>
          <el-table-column label="操作" align="center" >
            <template slot-scope="scope">
              <!-- 查看审批-->
              <el-button type="primary" icon="el-icon-zoom-in" size='mini'  @click="check(scope.row.empId)">查看审批</el-button>
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
      <!--查看审批弹出框-->
      <el-dialog
        title="审批情况"
        :visible.sync="dialogVisible" center>
        <el-form label-width="80px" label-position="left" :model="formData">
          <el-row>
            <el-col :span="12">
              <el-form-item label="审核状态">
                <el-input  placeholder="审核状态" v-model="formData.formalStatus"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="12">
            <el-form-item label="审核">
              <el-select v-model="formData.isFormal" >
                <el-option label="审核通过" :value="1"></el-option>
                <el-option label="审核不通过" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="审批人" prop="formalPer">
                <el-input  v-model="formData.formalPer"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="update()">保存</el-button>
            <el-button type="info" @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "Labor",

      data () {
        return {
          //封装用户查询的信息
          pagination: {//分页相关模型数据
            currentPage: 1,//当前页码
            pageSize:10,//每页显示的记录数
            total:0,//总记录数
            queryString:null//查询条件
          },
          dialogVisible:false,
          dataList:[],
          formData:{}
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
          this.$http.post(`/labor/findPage`,parm).then(res => {
            this.dataList = res.data.rows;
            this.pagination.total =res.data.total
          })
        },
        check(empId){
          this.dialogVisible = true;
          this.$http.get(`/labor/findByEmpId?empId=${empId}`).then(res=>{
             this.formData =res.data.data;
          })
        },
        update(){
          this.$http.post(`labor/update`,this.formData).then(res =>{
            this.dialogVisible = false;
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
        handleCurrentChange(currentPage){
          this.pagination.currentPage = currentPage
          this.findPage()
        }
      }
    }
</script>

<style scoped>

</style>
