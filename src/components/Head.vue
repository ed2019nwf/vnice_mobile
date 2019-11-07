<template>
   <div class="my-header">
       <!-- 登录前首页头部 -->
        <div class="sun-header" v-if="type=='home'&& !user_info">
             <img src="../../static/img/hamburger.png" class="sun-left-btn" @click="showSide">
             <img src="../../static/img/logo.png" alt="" srcset="" class="logo">
             <div class="sun-right-btn">
                 <router-link to="/login" class="sun-login">登录</router-link>
                 <router-link to="/register" class="sun-reg">注册</router-link>
             </div>
        </div>
       <!-- 登录后首页头部 -->
       <div class="sun-header" v-if="type=='home'&& user_info">
             <img src="../../static/img/hamburger.png" class="sun-left-btn" @click="showSide">
             <img src="../../static/img/logo.png" alt="" srcset="" class="logo">
             <div class="sun-right-btn">
                 <div style="position:absolute;right:0;top:-13px;">
                      <badge :text="this.$store.getters.mesNo"></badge>
                 </div>
                 <router-link to="/message"><img src="../../static/img/message.png" alt=""></router-link>
             </div>
        </div>
        <!-- 带侧边栏的普通头部 -->
       <div class="sun-header" v-if="type=='sidehd'&& user_info">
             <img src="../../static/img/hamburger.png" class="sun-left-btn" @click="showSide">
             <span class="text">{{title}}</span>
             <div class="sun-right-btn">
                 <div style="position:absolute;right:0;top:-13px;">
                      <badge :text="this.$store.getters.mesNo"></badge>
                 </div>
                 
                 <router-link to="/message"><img src="../../static/img/message.png" alt=""></router-link>
             </div>
        </div>
       <!-- 只有返回按钮的普通头部 -->
       <div class="sun-header sun-normal" v-if="type=='backhd'">
             <img src="../../static/img/back.png" class="sun-left-btn" @click="$router.go(-1)">
             <span class="title">{{title}}</span>
        </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["type", "title"],
  data() {
    return {};
  },
  methods: {
    showSide() {
      this.$emit("side");
    }
  },
  computed: {
    ...mapState(["user_info"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less">
.sun-header {
  height: @h-header;
  background: @bg-header;
  position: relative;
  box-shadow: #fff 0px 0px 1px 0px;
  -webkit-box-shadow: #fff 0px 0px 1px 0px;
}
.sun-left-btn {
  width: 23px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
}
.sun-header .logo {
  height: 35px;
  width: auto;
  position: absolute;
  top: 50%;
  left: 60px;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
}
.sun-right-btn {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
}
.sun-right-btn a {
  display: inline-block;
  width: 40px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
}
.sun-right-btn a.sun-login {
  border: 1px solid #fff;
  color: #fff;
  margin-right: 4px;
}
.sun-right-btn a.sun-reg {
  background: #fff;
  color: @color;
  height: 22px;
  line-height: 22px;
}
.sun-normal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sun-header .title {
  font-size: 18px;
  color: #fff;
}
.sun-right-btn img {
  width: 28px;
  height: auto;
}
.sun-header .text {
  font-size: 18px;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
</style>
