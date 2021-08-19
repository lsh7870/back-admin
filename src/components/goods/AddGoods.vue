<template>
  <div>
    <el-breadcrumb style="margin-bottom:30px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-alert title="添加商品信息" type="info"> </el-alert>

    <el-steps :active="active - 0" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="上传图片"></el-step>
      <el-step title="商品详情"></el-step>
      
    </el-steps>
    <el-form
      ref="form"
      :model="addForm"
      label-position="top"
      :rules="addFormRules"
      label-width="80px"
    >
      <el-tabs v-model="active" tabPosition="left">
        <el-tab-pane label="基本信息" name="1">
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="addForm.title"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="addForm.price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品库存" prop="stock">
            <el-input v-model="addForm.stock" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="description">
            <el-input v-model="addForm.description"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="category_id">
            <el-cascader
              v-model="category"
              :options="categoryList"
              :props="cateProps"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="上传图片" name="2">
          <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            :on-change="change"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button size="small" type="primary">选取文件</el-button>
            </template>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
            <template #tip>
              <div class="el-upload__tip">
                只能上传 jpg/png 文件，且不超过 500kb
              </div>
            </template>
          </el-upload></el-tab-pane
        >
        <el-tab-pane label="商品详情" name="3">
          <!-- 富文本编器辑 -->
          <div>
            <editor
              ref="editorOne"
              v-model="addForm.details"
              @change="changeEditor"
            ></editor>
          </div>
            <el-button type="success" plain @click="upload">点击添加</el-button>
        </el-tab-pane>
        
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { goodsCategory,addGoods } from "../../nenwo/goods";
import Editor from "../wangEditor/index.vue";
import alios from "./oss";
export default {
  name: "AddGoods",
  data() {
    return {
      active: "1",
      // 添加form表单数据
      category: '',
      addForm: {
        title: "",
        price: 0,
        stock: 0,
        description: "",
        category_id: '',
        cover:'',
        details: "2",
      },
      // 校验规则
      addFormRules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        pricee: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        stock: [{ required: true, message: "请输入商品库存", trigger: "blur" }],
        description: [
          { required: true, message: "请输入商品描述", trigger: "blur" },
        ],
      },
      // 分类列表数据
      categoryList: [],
      cateProps: {
        expandTrigger: "hover",
        label: "name",
        value: "id",
        children: "children",
      },
      // 图片对象
      file: "",
    };
  },
  created() {
    this.goodsCategory();
  },
  methods: {
    // 获取分类数据
    goodsCategory() {
      goodsCategory().then((res) => {
        console.log(res[1]);
        this.categoryList = res[1];
      });
    },
    // 事件处理函数
    handleChange() {
      // this.addForm.category_id.splice(0,1,0)
          this.addForm.category_id=this.category[1]
      // console.log(this.addForm.category_id);
    },

    // 上传图片
    submitUpload() {
      const uploadPublic = alios();
      const event = this.file;
      uploadPublic.uploadAlioss(event).then((res) => {
        // 上传成功
        console.log(res);
        this.addForm.cover=res
      });
    },
    change(file) {
      console.log(file.raw);
      this.file = file.raw;
    },
      // 富文本
    changeEditor(d) {
      console.log(d);
      this.addForm.details=d
    },
    // 上传按钮事件
    upload(){
      console.log(this.addForm);
      const data =this.addForm
      addGoods(data).then(res=>{
        console.log(res.status);
        if(res.status===201) return this.$message.success('添加成功')
      }).catch(err=>{
        console.log(err);
        this.$message.error("添加失败")
        //  this.$message.error('添加失败，请核对信息')
      })
    }
  },
  components: {
    Editor,
  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin: 15px 0;
}

.el-alert--info {
  margin: 15px 0;
}
.el-steps--horizontal {
  margin: 25px 0;
}
</style>
