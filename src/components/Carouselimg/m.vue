<template>
  <div>
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
        <el-step title="基本信息" id="el-step__title"></el-step>
        <el-step title="图片"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form
        ref="addformRef"
        :model="Addform"
        :rusles="addFormRules"
        label-width="80px"
      >
        <el-tabs
          :tab-position="'left'"
          style="height: 200px;"
          v-model="activeIndex"
        >
          <el-tab-pane label="基本信息" name="1">基本信息</el-tab-pane>
          <el-tab-pane label="上传图片" name="2">上传图片</el-tab-pane>
          <el-tab-pane label="完成" name="3">完成</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-care>

        <el-upload
                class=""
                action=""
                :show-file-list="false"
                :http-request="fnUploadRequest"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
  </div>
</template>

<script>
import { addImg, getOssToken } from "../../nenwo/carousel";
import { client } from './kk';

export default {
  name: "AddCarouselimg",
  data() {
    return {
      activeIndex: "1",
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: "",
    };
  },
  created() {
    let axios = require("axios");
    // axios.get('https://api.shop.eduwork.cn/api/index').then(res=>{
    //   console.log(res);
    // })
    // console.log(axios);
    // axios.post( 'https://laravel-book-shop.oss-cn-beijing.aliyuncs.com/');
    getOssToken().then((res) => {
      console.log(res[1]);
      // https://laravel-book-shop.oss-cn-beijing.aliyuncs.com/
      // res[1]
      this.url = res[1].host;
    });
  },
  methods:{
          //图片上传成功回调
         handleAvatarSuccess(res) {
             if (res) this.imageUrl = res.url
         },
         beforeAvatarUpload(file) { 
             const isJPG = file.type === 'image/png';
             const isLt2M = file.size / 1024 / 1024 < 2;
 
             if (!isJPG) {
                 this.$message.error('上传头像图片只能是 JPG 格式!');
             }
             if (!isLt2M) {
                 this.$message.error('上传头像图片大小不能超过 2MB!');
             }
             return isJPG && isLt2M;
         },
 
         async fnUploadRequest(options) {
             try {
                 let file = options.file; // 拿到 file
                 let fileName = file.name.substr(0,file.name.lastIndexOf('.'))
                 let date = new Date().getTime()
                 let fileNames = `${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名
                 // 上传文件,这里是上传到OSS的 uploads文件夹下
                 client.post("uploads/"+fileNames, file).then(res=>{
                     if (res.res.statusCode === 200) {
                         options.onSuccess(res)
                     }else {
                         options.onError("上传失败")
                    }
                 })
             }catch (e) {
                 options.onError("上传失败")
             }
         }
     }
 

};
</script>

<style lang="scss" scoped>
.el-steps {
  margin: 10px 0;
}
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
