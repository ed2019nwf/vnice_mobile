<template>
   <div class="wrap">
        <Head v-on:side="showSide" type="home"></Head>
        <!-- Swiper -->
        <swiper :aspect-ratio="1/2" class="my-swiper" :auto="true" dots-position="center">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerlist" :key="index" @click.native="openBannerUrl(index)">
                <img :src="item.img4">
            </swiper-item>
        </swiper>
        <!-- 公告 -->
        <div class="notice">
            <img src="./img/laba.png" alt="" srcset="">
            <marquee :item-height=30>
                <marquee-item v-for="(item,index) in noticelist" @click.native="$router.push('/notice')" :key="index">{{item.content}}</marquee-item>
            </marquee>
        </div>
        <!-- 游戏平台 -->
        <div class="gamePlat">
            <tab :line-width=0 active-color='#dc700c' v-model="tabIndex" class="my-tab">
                <tab-item active-class="on"  class="vux-center" :selected="demo2 === key" @click="demo2 = key"  v-for="(item, key) in gamelist" :key="key" :class="item.plattype">
                  <h2>{{item.title}}</h2>
                </tab-item>
            </tab>
            <swiper v-model="tabIndex" :show-dots="false" height="8rem">
                <swiper-item v-for="(item, key) in gamelist" :key="key">
                    <div class="tab-swiper vux-center">
                        <ul class="game-img">
                            <li v-for="(item2,index2) in item.list" :key="index2" @click="getGameUrl(item2)">
                                <img :src="item2.slideimg" alt="">
                                <span>{{item2.title}}</span>
                            </li>
                        </ul>
                    </div>
                </swiper-item>
            </swiper>
         </div>
        <Foot></Foot>
        <!-- 侧边栏 -->
        <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
           <Side v-if="isshow==true" v-on:ishide="hideSide" v-on:isexit="exit"></Side>
        </transition>
        <div class="mask" v-show="isshow"></div>
   </div>
</template>

<script>
import Head from "@/components/Head";
import Foot from "@/components/Foot";
import Side from "@/components/Sidebar";
import {mapState} from "vuex";
export default {
  name: "Index",
  data() {
    return {
      isshow: false,
      bannerlist: [],
      noticelist: [],
      gamelist: [],
      bannerid: "",
      list2: [],
      demo2: 0,
      tabIndex: 0,
      gamelist: [
        {
          list: []
        }
      ],
      imglist: []
    };
  },
  components: {
    Head,
    Foot,
    Side
  },
  mounted() {
    this.getBanner();
    this.getNotice();
    this.getGamePlatform();
    this.$islogin();
  },
  computed: {
    ...mapState(["user_info"])
  },
  methods: {
    // 显示侧边栏
    showSide() {
      this.isshow = true;
    },
    // 隐藏侧边栏
    hideSide() {
      this.isshow = false;
    },
    // 退出
    exit() {
      this.$store.dispatch('exitGo').then(res=>{
           this.hideSide();
      });
    },
    //获取banner
    getBanner() {
      this.$http
        .post("/public/active_list.do", { is_banner: "1", is_info: "1" })
        .then(e => {
          if (e.data.Status == 200) {
            this.bannerlist = e.data.Data.active_list;
          }
        });
    },
    // 获取公告
    getNotice() {
      this.$http.post("/public/notice.do").then(e => {
        if (e.data.Status == 200) {
          this.noticelist = e.data.Data.notice;
        }
      });
    },
    // 获取平台游戏
    getGamePlatform() {
      this.$http
        .post("/public/get_platform_list.do", { sys_type: "app" })
        .then(e => {
          if (e.data.Status == 200) {
            this.gamelist = e.data.Data.list;
          }
        });
    },
    // 获取banner链接
    openBannerUrl(key) {
      this.bannerid = this.bannerlist[key].class_id;
      this.$router.push({
        path: "discount",
        query: {
          bannerid: this.bannerid
        }
      });
    },
    // 点击到对号入座
    platformGo(obj) {
      this.$router.push({
        path: "game",
        query: { plat_type: obj.plattype }
      });
    },
    // 获取游戏链接
    getGameUrl(obj) {
      var data = {
        plat: obj.game_plat,
        gametype: obj.game_type
      };

      if (obj.game_type === "egame" || obj.game_type === "poker") {
        if (obj.is_list == 1) {
          this.$router.push({
            path: "/ptElc",
            query: {
              gameplat: obj.game_plat,
              gametype: obj.game_type
            }
          });
          return;
        }
        data.gameid = obj.game_id;
        data.gamekind = obj.game_kind;
        data.gamename = obj.game_name;
      }
      this.$http.post("/game/login.do", data).then(e => {
        this.$vux.loading.hide();
        if (e.data.Status === 200) {
          window.location.href = e.data.Data.login_url;
        }else {
          this.$vux.toast.text(e.data.Msg);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" coped>
@import "./index.less";
</style>
<style lang="less">
.gamePlat .scrollable.vux-tab {
    background-color: @color;
}
</style>
