<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../../assets/user.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button></el-header
    >
    <!-- 侧边栏 -->
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition='false'
          router
          
        >
          <!-- 一级 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template #title>
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="subItem.id + ''"
              v-for="subItem in item.children"
              :kry="subItem.id"
              
            >
            <!-- @click="saveNavState(subItem.id+'')" -->
              <template #title>
                <i class="el-icon-menu"></i>
                <span>{{ subItem.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getmenus } from "../../nenwo/menus";
export default {
  name: "Home",
  data() {
    return {
      menulist: [],
      iconsObj:{
        24:'iconfont icon-users',
        26:'iconfont icon-tijikongjian',
        29:'iconfont icon-shangpin',
        32:'iconfont icon-users',
        34:'iconfont icon-users',
        36:'iconfont icon-users',
        39:'iconfont icon-users'
      },
      // 是否折叠
      isCollapse:false,
      // 激活的连接地址
      activePath:''
    };
  },
  created() {
    getmenus().then((res) => {
      // console.log(res);
      if (res[0] !== 200) return this.$message.error("失败");
      this.menulist = res[1];
    });
    window.sessionStorage.removeItem('activePath')
  },
  updated() {
    this.activePath=window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出按钮
    logout() {
      window.localStorage.removeItem("token");
      this.$router.push("/login");
    },
    // 切换菜单折叠
    toggleCollapse(){
      this.isCollapse=!this.isCollapse
    },
    // 二级菜单事件
    saveNavState(activePath){
      // window.sessionStorage.setItem('activePath',activePath)
      // this.activePath = activePath
    }
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  // align-content: center;
  align-items: center;
  color: #fff;
  div {
    display: flex;
    align-items: center;
  }

  img {
    width: 60px;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button{
  background-color: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
