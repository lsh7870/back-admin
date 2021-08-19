<template>
  <div>
    <el-breadcrumb style="margin-bottom:30px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加轮列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="list" style="width: 100%" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="created_at" label="图片" width="180">
        <template v-slot="scope">
          <!-- {{ scope.row }} -->
          <img class="img" :src="scope.row.img_url" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180"> </el-table-column>
      <el-table-column prop="img_url" label="跳转链接" width="180">
      </el-table-column>
      <el-table-column prop="status" label="是否禁用" width="80">
        <template v-slot="scope">
          <!-- {{ scope.row.status }} -->
          <el-switch v-model="scope.row.status" @click="ccc(scope.row.id)">
          </el-switch>
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
            @click="dialogVisibleb(scope.row.id)"
            icon="el-icon-delete"
            size="mini"
          >
          </el-button>
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
    <!-- 对话框 -->
    <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否删除轮播图</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisiblea">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ImgList, ImgEnable ,deleteImg} from "../../nenwo/carousel";
export default {
  name: "CarouselImgList",
  data() {
    return {
      list: [],
      // 对话框显示变量
      dialogVisible: false,
      // 确认删除id
      deleteID:'',
      // ImgLists:''
    };
  },
  created() {
    this.ImgLists()
 
  },
  methods: {
    ImgLists(){
         ImgList().then((res) => {
      // 如果res里status 存在/等于就让他等于 true
      console.log(res);
       res[1].data.map((s) => {
        if (s.status) s.status = true;
      });
      this.list = res[1].data;
    });
      },
    ccc(e) {
      let id = e;
      ImgEnable(id).then((res) => {
        if (res.status) this.$message.success("修改成功");
      });
    },
    // 确认删除轮播图
    dialogVisiblea() {
       const id =this.deleteID
       console.log(id);
       deleteImg(id).then(res=>{
         if (res.status) this.$message.success("删除成功");
       }).catch(err=>{
         console.log('shibai');
       })
      this.ImgLists()
      this.dialogVisible = false;
    },
    /* 
    **获取点击的轮播图id
    */
    dialogVisibleb(e){
      this.deleteID=e
      this.dialogVisible = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.img {
  height: 50px;
}
</style>
<style>
.el-table,
.cell {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
