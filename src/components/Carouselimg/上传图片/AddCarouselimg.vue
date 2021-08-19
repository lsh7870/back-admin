<template>
  <div class="upLoadIamge">
      <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :http-request="myLoad"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
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
      dialogVisible: false
    }
  },
  created() {
    
  },
 setup() {
    // 上传图片
    const uploadPublic = alios ()
    const uploadImage = (event,) => {
      console.log(event)
      // var files = document.getElementById('files').files;
      //这里做图片大小限制   
      // const isLt2M = files[0].size / 1024 / 1024 < 20 
      uploadPublic.uploadAlioss(event).then((res) => {
        // 上传成功
        console.log(res,)
      });
    };
    return {
        uploadImage 
    }
},
  mounted () {

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>