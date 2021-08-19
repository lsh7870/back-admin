<template>
  <div>
    <el-breadcrumb style="margin-bottom:30px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="goodsList" style="width: 80%" stripe border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="title" label="书名" width="180" align="center">
      </el-table-column>
      <el-table-column prop="name" label="图片" width="180">
        <template v-slot="scope">
          <!-- {{ scope.row }} -->
          <img class="img" :src="scope.row.cover_url" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column prop="stock" label="库存"> </el-table-column>
      <el-table-column prop="is_on" label="上架" >
        <template v-slot="scope">
          <!-- {{ scope.row.status }} -->
          <el-switch
            v-model="scope.row.is_on"
            @change="change(scope.row)"
           
          >
          </el-switch>
        </template>
      </el-table-column>
      
    </el-table>
  </div>
</template>

<script>
import { goodsList,goodsGrounding } from "../../nenwo/goods";
export default {
  name: "GoodsList",
  data() {
    return {
      goodsList: [],
    };
  },
  created() {
    this.GoodsList();
  },
  methods: {
    // 数据
    GoodsList() {
      goodsList().then((res) => {
        res[1].data.map((s) => {
          if (s.is_on) s.is_on = true;
        });
        this.goodsList = res[1].data;
        console.log(res[1].data);
      });
    },

    change(scope) {
      console.log(scope.id);
      let id =scope.id
      goodsGrounding(id).then(res=>{
        console.log(res);
      })
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.img {
  height: 80px;
}
</style>
<style>
.el-switch__label {
  /* color: #fff; */
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
