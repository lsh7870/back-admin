<template>
  <div class="upLoadIamge">
       <el-breadcrumb style="margin-bottom:30px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加轮播图</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-care>
      <el-alert title="添加轮播图" type="info" center :closable="false">
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        :space="200"
        :active="activeIndex"
        finish-status="success"
        align-center
      >
        
        <el-step title="选择图片"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

   
    </el-care>
  
    <br>


    <input
  type="file"
  name="上传图片"
  id="collocationfiles"
  @change="uploadImage($event)"
  accept="image/*"
/>
  </div>
</template>


<script>

import alios from "./OssClient";
import { addImg, getOssToken } from "../../nenwo/carousel";

export default {
  name: 'upLoadIamge',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      file:''
    }
  },
  created() {
    
  },
  methods: {

  },
 setup() {
    // 上传图片
    let activeIndex =1
    const uploadPublic = alios ()
    const uploadImage = (event,) => {
      console.log(event)
      console.log(event.target.files[0]);
      
      // var files = document.getElementById('files').files;
      //这里做图片大小限制   
      // const isLt2M = files[0].size / 1024 / 1024 < 20 
      uploadPublic.uploadAlioss(event).then((res) => {
        // 上传成功
        console.log(res,)
        const data ={
          title:'商城',
          img:res
        }
        // addImg(data).then(res=>{

        // })
        activeIndex=2

      });
    };
    return {
        uploadImage ,
        activeIndex
    }
},
  mounted () {

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// .el-steps {
//   margin: 10px 0;
// }
.el-tabs {
  margin: 20px 0 !important;
}
</style>
<style>
.el-step__title > .el-step__title,
.el-step__title {
  font-size: 12px !important;
}
</style>