<template>
  <div class="login_containter">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 表单 -->
      <el-form ref='loginForm' :model="form" :rules="rules" label-width="0px" class="login-form">
        <el-form-item prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type='primary' @click="login">登录</el-button>
          <el-button type='info' @click="resetloginF">重置</el-button>
        </el-form-item>
        
      </el-form>
    </div>
  </div>
</template>

<script>
import {getlogin} from '../nenwo/login'
export default {
  name: "Login",
  data() {
    return {
      form:{
        email:'super@a.com',
        password:'123123'
      },
      rules:{
        email: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
             { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    resetloginF(){
      this.$refs.loginForm.resetFields()
      // console.log(this.)
    },
    login(){
      this.$refs.loginForm.validate((valid)=>{
        if(!valid) return
        console.log('object :>> ', this.form);
        const data = {
          email:this.form.email,
          password:this.form.password
        }
        getlogin(data).then(res=>{
          if(res[0]==200){
            // console.log(res);
          window.localStorage.setItem('token',res[1].access_token);
          this.$router.push('/home')
          }
          
        })
      })
    }
  },

};
</script>

<style lang='scss' scoped>
.login_containter {
  background-color: #2b5b6b;
  width: 100%;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns{
  display: flex;
  justify-content:flex-end;
 
}
.login-form{
  position: absolute;
  bottom: 0;
   width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>