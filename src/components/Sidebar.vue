<template>

    <!-- 登录前侧边栏 -->
    <div class="sidebar" @click="hideSide" v-if="!user_info">
         <div class="sidebar-box" @click.stop>
              <div class="sidetop befor">
                  <router-link to="/login" class="login">登录</router-link>
                  <router-link to="/register" class="reg">注册</router-link>
              </div>
              <div class="sidebom">
                   <div class="wrap">
                        <router-link to="/" class="home">
                            <img src="../../static/img/home.png">
                            <span>主页</span>
                        </router-link>
                        <router-link to="/discount" class="promo">
                            <img src="../../static/img/promo.png">
                            <span>优惠活动</span>
                        </router-link>
                        <router-link to="/friend_recommendation" class="favourite">
                            <img src="../../static/img/favourite.png">
                            <span>好友推荐</span>
                        </router-link>
                        <router-link to="/about" class="agent_info">
                            <img src="../../static/img/information.png">
                            <span>关于我们</span>
                        </router-link>
                        <router-link to="/delegate" class="fish">
                            <img src="../../static/img/fish.png">
                            <span>代理</span>
                        </router-link>
                    </div>
              </div>
         </div>
    </div>
    <!-- 登录后侧边栏 -->
    <div class="sidebar" @click="hideSide" v-else>
         <div class="sidebar-box" @click.stop>
              <div class="sidetop">
                   <div class="sidetopL">
                       <img src="../../static/img/default_pic.png" alt="" srcset="">
                   </div>
                   <div class="sidetopR">
                       <p>欢迎，{{userId}}</p>
                       <p>账户余额：{{brance}}</p>
                   </div>
              </div>
              <div class="sidebom">
                   <div class="wrap">
                        <router-link to="/" class="home">
                            <img src="../../static/img/home.png">
                            <span>主页</span>
                        </router-link>
                        <router-link to="/discount" class="promo">
                            <img src="../../static/img/promo.png">
                            <span>优惠活动</span>
                        </router-link>
                        <router-link to="/friend_recommendation" class="favourite">
                            <img src="../../static/img/favourite.png">
                            <span>好友推荐</span>
                        </router-link>
                        <router-link to="/about" class="agent_info">
                            <img src="../../static/img/information.png">
                            <span>关于我们</span>
                        </router-link>
                        <router-link to="/delegate" class="fish">
                            <img src="../../static/img/fish.png">
                            <span>代理</span>
                        </router-link>
                        <a class="exit" @click="exitGo">
                            <img src="../../static/img/logout.png">
                            <span>退出</span>
                        </a>
                    </div>
              </div>
         </div>
    </div>

</template>

<script>
import { mapState,mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    hideSide() {
      this.$emit("ishide");
    },
    exitGo() {
      this.$emit("isexit");
    }
  },
  computed: {
    ...mapState(["user_info","brance"]),
    ...mapGetters(["userId"])

  }
};
</script>

<style scoped lang="less">
.sidebar {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
}
.sidebar-box {
  width: 65%;
  height: 100%;
  background: #fff;
}
.sidetop {
  height: 95px;
  background: @color;
  display: flex;
  padding-left: 10px;
  align-items: center;
}
.sidetop.befor {
  justify-content: center;
}
.sidetop a {
  width: 30%;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #fff;
  font-size: 16px;
  color: #fff;
}
.sidetop a.reg {
  background: #fff;
  color: @color;
  margin-left: 10px;
}
.sidebom a {
  display: block;
  padding: 10px 0 10px 20px;
}
.sidetopL {
  margin-right: 10px;
}
.sidetopL img {
  width: 50px;
}
.sidetopR {
  color: #fff;
}

.wrap a img {
  width: 30px;
  border-radius: 10px;
  display: inline-block;
  vertical-align: middle;
}
.wrap a span {
  display: inline-block;
  margin-left: 8px;
  font-size: 14px;
  color: #000;
}
.wrap .home img {
  background-color: #127f5f;
}
.wrap .promo img {
  background-color: #8943af;
}
.wrap .favourite img {
  background-color: #ffbc00;
}
.wrap .history img {
  background-color: #ba4369;
}
.wrap .agsignup img {
  background-color: #1e88a2;
}
.wrap .fish img {
  background-color: #00c6ff;
}
.wrap .exit img {
  background-color: #999;
}
</style>