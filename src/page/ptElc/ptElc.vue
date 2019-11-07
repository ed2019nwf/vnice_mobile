<template>
    <div class="ptelcwrap">
        <Head :title="title" type="backhd"></Head>
        <ul class="pt-ul">
          <li v-for="item in gameList" @click="openGame(item)">
            <div class="imgbox"><img :src="url+item.img_url" alt=""></div>
            <h3>{{item.game_title}}</h3>
          </li>
        </ul>
    </div>
</template>
<script>
import Head from "@/components/Head";
export default {
  name: "",
  components: {
    Head
  },
  data() {
    return {
      title: "",
      typeList: [
        {
          list: {
            game_plat: ""
          }
        }
      ],
      gameList: [],
      index: 0,
      url: ""
    };
  },
  mounted() {
    this.changeTitle();
    this.$vux.loading.show();
    this.getGameList();
    if (window.WEB_API) {
      this.url = "http://new.mobile.com";
    }
  },
  methods: {
    changeTitle(){
        let gameplat = this.$route.query.gameplat;
        switch(gameplat){
          case 'DPT':
               this.title = 'PT电子';
               break;
          case 'MG':
               this.title = 'MG电子';
               break;
          case 'PTS':
               this.title = 'SW电子';
               break;
          case 'TTG':
               this.title = 'TTG电子';
               break;
          case 'PP':
               this.title = 'PP电子';
               break;
          case 'TGP':
               this.title = '申博电子';
               break;
        }
    },
    // 获取电子平台游戏列表
    getGameList() {
      this.gameList = [];
      this.$http
        .post("/game/get_list.do", {
          platfrom: this.$route.query.gameplat,
          gametype: this.$route.query.gametype,
          plattype: "mobile",
          rows: 1000
        })
        .then(data => {
          this.$vux.loading.hide();
          if (data.data.Status === 200) {
            this.gameList = data.data.Data.data;
          } else if (data.data.Status === 600) {
            this.$vux.toast.text("未登录");
            window.sessionStorage.clear();
            this.$router.push("/login");
          }
        });
    },
    // 打开游戏
    openGame(obj) {
      this.$vux.loading.show();
      this.$http
        .post("/game/login.do", {
          plat: obj.plat_form ? obj.plat_form : obj.game_plat,
          gametype: obj.game_type,
          gamekind: obj.game_kind,
          gamename: obj.game_name,
          gameid: obj.game_id
        })
        .then(data => {
          this.$vux.loading.hide();
          if (data.data.Status === 200) {
            window.location.href = data.data.Data.login_url;
          } else if (data.data.Status === 600) {
            this.$vux.toast.text("登录失效");
            window.sessionStorage.clear();
            this.$router.push("/login");
          } else {
            this.$vux.toast.text(data.data.Msg);
          }
        });
    }
  }
};
</script>
<style scoped>
.ptelcwrap {
  background: #fff;
  padding-top: 53px;
}
.pt-ul {
  padding: 0.2rem;
  display: flex;
  flex-wrap: wrap;
}
.pt-ul li {
  margin-right:0.2rem;
  margin-bottom: 0.2rem;
  font-size: 0.38rem;
  color: #333;
}
.pt-ul li:nth-child(4n){
  margin-right:0;
}
.imgbox {
  width: 2.44rem;
  height: 2.44rem;
  background: #f2f2f2;
  overflow: hidden;
  position: relative;
}
.imgbox img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.pt-ul li h3 {
  width: 2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 5px;
  font-size: 0.32rem;
  color: #333;
  overflow: hidden;
  font-weight: normal;
  text-align: center;
  margin: 0.1rem 0;
}
.pt-ul li span {
  display: block;
  width: 100%;
  height: 0.66rem;
  line-height: 0.66rem;
  background: #da6c0a;
  font-size: 0.4rem;
  color: #fff;
  text-align: center;
}
.my-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
}
</style>