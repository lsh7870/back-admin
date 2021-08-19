<template>
  <div>
    <el-breadcrumb style="margin-bottom:30px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      ref="form"
      class="categoryForm"
      :model="form"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="商品分类">
        <div>选择父级分类</div>
        <el-cascader
          v-model="form.pid"
          :options="categoryList[1]"
          :props="cateProps"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="form.name"></el-input>
        <el-button type="success" @click="addCategory">添加分类</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addCategory, goodsCategory } from "../../nenwo/category";
export default {
  name: "addcategory",
  data() {
    return {
      form: {
        name: "",
        pid: "",
        group: "",
      },
      categoryList: [],
      cateProps: {
        expandTrigger: "hover",
        label: "name",
        value: "id",
        children: "children",
      },
    };
  },
  created() {
    this.goodsCategory();
  },
  methods: {
    goodsCategory() {
      goodsCategory().then((res) => {
        res[1].map((res) => {
          delete res.children;
        });
        this.categoryList = res;
        console.log(this.categoryList[1]);
      });
    },

    addCategory() {
      console.log(this.form.name);
      const data = {
        name: this.form.name,
        pid: this.form.pid[0],
      };
      if (this.form.name) {
        addCategory(data).then((res) => {
          if(res.status===201) return this.$message.success('添加成功')
          console.log(res);
        });
      } else {
        this.$message.error("请输入分类昵称");
      }
    },

    handleChange() {
      console.log(this.form.pid[0]);
      // console.log(this.addForm.category_id);
    },
  },
};
</script>

<style lang="scss" scoped>
.categoryForm {
  width: 300px;
}
</style>
