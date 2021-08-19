<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable
            placeholder="请输入内容"
            class="input-with-select"
            v-model="username"
            @clear="clear"
          >
            <template #append>
              <el-button icon="el-icon-search" @click="kkk"></el-button>
            </template> </el-input
        ></el-col>
        <el-col :span="6"
          ><el-button type="primary" @click="dialogVisible = true">添加用户</el-button
          >
          </el-col
        >
      </el-row>
      <el-table :data="userlist" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="created_at" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="is_locked" label="状态">
          <template v-slot="scope">
            <!-- {{ scope.row }} -->
            <el-switch v-model="scope.row.is_locked"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作" width="180">
          <template v-slot="scope">
            <el-button
              round
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              round
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top">
              <el-button
                round
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-sizes="[10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" v-model="dialogVisible" width="50%" @close="addDialogClosed">
      <el-form ref="formm" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisiblea"
            >确 定</el-button
          >
     
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getuserslist,adduser } from "../../nenwo/users";
export default {
  name: "User",
  data() {
    return {
      username: "",
      userlist: [],
      total: 0,
      currentpage: 0,
      pagesize: 0,
      dialogVisible: false,
      // 添加用户
      form:{
        name:'',
        email:'',
        password:''
      },

    };
  },
  created() {
    const a = 1;
    const current = "current=" + a;
    getuserslist(current).then((res) => {

      this.list=res[1].data
      this.userlist = res[1].data;
      this.total = res[1].meta.pagination.total;
      this.currentpage = res[1].meta.pagination.current_page;
      this.pagesize = res[1].meta.pagination.count;
    });
  },
  methods: {
    handleSizeChange(s) {
      console.log(s);
    },
    handleCurrentChange(y) {
      const a = y;
      const current = "current=" + a;
      getuserslist(current).then((res) => {
        this.userlist = res[1].data;
        this.total = res[1].meta.pagination.total;
        this.currentpage = res[1].meta.pagination.current_page;
        this.pagesize = res[1].meta.pagination.count;
      });
    },
    // 搜索用户
    kkk() {
      const a = 1;
      const name = this.username;
      const kk = "current=" + a + "&&name=" + name;
      const current = kk;
      getuserslist(current).then((res) => {
        this.userlist = res[1].data;
        this.total = res[1].meta.pagination.total;
        this.currentpage = res[1].meta.pagination.current_page;
        this.pagesize = res[1].meta.pagination.count;
      });
    },
    // 清楚搜索宽，重置数据
    clear() {
      const a = 1;
      const name = this.username;
      const kk = "current=" + a + "&&name=" + name;
      const current = kk;
      getuserslist(current).then((res) => {
        this.userlist = res[1].data;
        this.total = res[1].meta.pagination.total;
        this.currentpage = res[1].meta.pagination.current_page;
        this.pagesize = res[1].meta.pagination.count;
      });
    },
    // 对话框取消清楚输入框
    addDialogClosed(){
      console.log(this.form);
      this.$refs.formm.model.name=''
      this.$refs.formm.model.email=''
      this.$refs.formm.model.password=''
    },
    dialogVisiblea(){
      const data={
        name:this.form.name,
        email:this.form.email,
        password:this.form.password
      }
      // console.log(data);
      adduser(data).then(res=>{
        console.log(res.status);
        if(res.status!==201) return this.$message.error('添加失败，请核对信息')
        this.$message.success('添加成功')
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-table {
  margin-top: 15px;
}
</style>
