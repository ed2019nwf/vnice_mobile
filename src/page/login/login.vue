<template>
   <div class="login-wrap">
        <div class="one">
             <span class="close" @click="$router.go(-1)"></span>
             <img class="img" src="../../../static/img/logo.png">
        </div>
        <div class="two">
             <div class="input-group">
                  <input class="line" type="text" placeholder="输入用户名" v-model="form.username">
                  <img class="icon" src="../../../static/img/username.png" alt="">
             </div>
             <div class="input-group">
                  <input class="line" type="password" placeholder="输入密码" v-model="form.password">
                  <img class="icon" src="../../../static/img/password.png" alt="">
             </div>
             <div class="input-group rempwd">
                 <input type="checkbox" id="rempwd" v-model="remenber">
                 <label for="rempwd">记住密码</label>
             </div>
             <div class="pay-go" @click="goLogin"><span>登录</span></div>
             <div class="login-link">
                 <a href="javascript:;" @click="show=true">忘记密码</a>
                 <router-link to="/register">注册账号</router-link>
                 <router-link to="/service">联系客服</router-link>
             </div>
        </div>
        <actionsheet class="y" v-model="show" :menus="bytype" show-cancel @on-click-menu="getval"></actionsheet>
   </div>
</template>

<script>
import { Actionsheet } from "vux";
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    Actionsheet
  },
  computed: {
    ...mapState(["loginWaitStatus"])
  },
  data() {
    return {
      show: false,
      bytype: {
        1: "邮箱找回",
        2: "手机找回"
      },
      form: {
        username: "",
        password: ""
      },
      remenber: ""
    };
  },
  watch: {
    loginWaitStatus(val) {
      if (val) {
        this.$vux.toast.text("登录成功");
        if (this.$route.query.redirect) {
          this.$router.push({ path: this.$route.query.redirect });
        } else {
          this.$router.push("/");
        }
      }
    }
  },
  mounted() {
    this.form.username = window.localStorage.userid;
    this.form.password = window.localStorage.pwd;
    if (window.localStorage.ischeck) {
      this.remenber = true;
    } else {
      this.remenber = false;
    }
    // 登录状态下永远返回到上一页面
    if(this.loginWaitStatus){
      this.$router.go(-1)
    }
  },
  methods: {
    // 登录
    goLogin() {
      if (!this.form.username) {
        this.$vux.toast.text("用户名不能为空", "middle");
        return false;
      }
      if (!this.form.password) {
        this.$vux.toast.text("密码不能为空", "middle");
        return false;
      }
      // 记住密码
      if (this.remenber == true) {
        window.localStorage.userid = this.form.username;
        window.localStorage.pwd = this.form.password;
        window.localStorage.ischeck = true;
      } else {
        window.localStorage.clear();
      }
      this.$store.dispatch('loginGo',this.form);
    },
    // 忘记密码
    getval(key, item) {
      this.$router.push({
        path: "forgetpwd",
        query: { way: key }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./login.less";
</style>
<style>
.y .weui-actionsheet__cell {
  font-size: 14px;
}
</style>

