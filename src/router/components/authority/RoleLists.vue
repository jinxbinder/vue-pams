<template>
    <div>
        <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
          <el-form :inline="true" class="elForm">
            <el-button type="primary"  class="butT" @click="dialogFormVisible=true;formData={}">新增</el-button>
          </el-form>
        <el-table :data="dataList" border stripe>
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column label="角色名称" prop="roleName" align="center"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">   
                    <!-- 修改 -->
                    <el-button type="primary" icon="el-icon-edit" size='mini'  @click="edit(scope.row.roleId)"></el-button>
                    <!-- 删除 -->
                    <el-button type="danger" icon="el-icon-delete" size='mini' @click="dele(scope.row.roleId)" ></el-button>
                    <!-- 查看权限 -->
                    <el-tooltip class="item" effect="dark" content="查看权限" placement="top" :enterable="false">
                        <el-button type="primary" icon="el-icon-zoom-in" size='mini'  @click="findAuthList(scope.row.roleId)">
                        </el-button>
                    </el-tooltip>
                    
                    <!-- 分配权限 -->
                    <el-tooltip class="item" effect="dark" content="分配权限" placement="top" :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size='mini' @click="setAuthDialog(scope.row.roleId)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <div class="pagination-container">
            <el-pagination
                class="pagiantion"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
      </el-card>
      <!-- 弹出查看权限对话框 -->
      <el-dialog :visible.sync="authDialogVisible" width="80%" center>
        <el-row v-for="(item1, index1) in authList" :key=item1.id 
        :class="['bdbottom',index1===0?'bdtop':'','vcenter']">
            <!-- 渲染一级权限列表 -->
            <el-col :span="5">
                <el-tag>{{item1.psName}}</el-tag>
                <i class="el-icon-caret-right"></i>
            </el-col>
            <!-- 渲染二级和三级权限列表 -->
            <el-col :span="19">
                <el-row v-for="(item2,index2) in item1.children" :key="item2.id" 
                :class="[index2 ===0?'':'bdtop','vcenter']">
                    <!-- 渲染二级权限列表 -->
                    <el-col :span="6">
                        <el-tag type="success">{{item2.psName}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                    </el-col>
                    <!-- 渲染三级权限列表 -->
                    <el-col :span="18" v-model="roleId">
                        <el-tag type="warning" closable  @close="deleteAuthById(roleId,item3.id)"
                            v-for="(item3) in item2.children" :key="item3.id">{{item3.psName}}
                        </el-tag>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>  
      </el-dialog>
      <!-- 设置权限的对话框 -->
      <el-dialog title="设置权限"
  :visible.sync="setAuthDialogVisible" width="50%" center>
  <el-tree :data="authTree" :props="authProps" show-checkbox 
  :default-expand-all="defaultExpandAll" node-key="id"
  :default-checked-keys="checkedKeys"></el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setAuthDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="setAuthDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
export default {
   data () {
       return {
           //封装用户查询的信息
        currentPage: 1,//当前页码
        pageSize:10,//每页显示的记录数
        total:0,//总记录数
        dataList:[],//分页查询表单数据
        authList:{},//查询角色对应权限数据
        authDialogVisible:false, // 查看角色对话框
        roleId:0,//用户的id
        setAuthDialogVisible:false,
        //树形控件树形绑定
        authProps:{
            label:'psName',
            children:'children'
        },
        authTree:[],
        defaultExpandAll:true,
        checkedKeys:[]

   }
 },
 
 created(){
     this.findPage();
 },
 methods: {
      findPage(){
          //发送ajax请求，获取后端传过来的数据
          this.$http.get(`/role/findPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}`).then(res => {
              this.dataList = res.data.rows;
              this.total =res.data.total
              
          })
      },
      findAuthList(id){
          this.roleId = id
          this.$http.get(`/role/findAuthTree?id=${id}`).then(res =>{
              if(res.data.flag){
                 this.authList = res.data.data
                 this.authDialogVisible =true;
                 this.$message({
                     type:'success',
                     message:res.data.message
                 })
              }else{
                  this.$message.error(res.data.message)
              }
          })
      },
      deleteAuthById(roleId,permissionId){
          this.$confirm('您确定要永久删除该角色对应的权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.get(`/role/deleteAuth?roleId=${roleId}&permissionId=${permissionId}`).then(res =>{
                if(res.data.flag){
                    this.$message({
                        type:'success',
                        message:res.data.message
                    })
                    this.authDialogVisible = false;
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
      //设置权限
      setAuthDialog(id){
          this.findPermissionIds(id);
          console.log('id:'+id)
          this.$http.get(`/role/findPermissionTreeArray`).then(res=>{
              if(res.data.flag){
                  this.authTree = res.data.data
                  this.setAuthDialogVisible = true;
                  this.$message({
                      type:'success',
                      message:res.data.message
                  })
              }else {
                  this.$message.error(res.data.message)
              }
          })
      },
      findPermissionIds(id){
          this.$http.get(`/role/findPermissionIds?roleId = ${id}`).then(res =>{
              console.log(res)
              this.checkedKeys = res.data.data
              console.log("permissionIds:"+res.data.data);
          })
      },
      handleCurrentChange(currentPage){
          this.currentPage = currentPage
          this.findPage()
      }
   }
}
</script>
<style scoped>
    .el-tag{
        margin: 7px;
    }
    .bdtop{
        border-top: 1px solid #eee;
    }
    .bdbottom{
        border-bottom: 1px solid #eee;
    }
    .el-dialog{
        min-width: 1000px;
    }
    /* 纵向上的剧中水平显示 */
    .vcenter{
        display: flex;
        align-items: center;
    }
</style>
