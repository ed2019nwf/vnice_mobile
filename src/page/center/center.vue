<template>
    <div class="centerbox">
        <Head v-on:side="showSide" type="sidehd" title="我的"></Head>
        <div class="center-one">
            <router-link to="/personinfo">
            <div class="center-img">
                <img src="../../../static/img/default_pic.png" alt="" srcset="">
            </div>
            <div class="center-name">{{name}}</div>
            </router-link>
            <div class="center-brance">
                <div class="brance-l">
                    <p>游戏平台余额</p>
                    <p>{{money}}</p>
                </div>
                <div class="brance-r">
                    <span><router-link to="/blanceinfo">查看全部</router-link></span>
                    <span @click="refrush">刷新</span>
                </div>
            </div>
        </div>
        <div class="center-two">
            <ul>
                <li>
                    <router-link to="/pay">
                        <img src="./img/deposit.png" alt="" style=" background: #01b0e9;">
                        <span>充值</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/takeout">
                        <img src="./img/withdraw.png" alt="" style=" background: #07c0c3;">
                        <span>提款</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/remit">
                        <img src="./img/transfer.png" alt="" style=" background: #70db2b;">
                        <span>转账</span>
                    </router-link>
                </li>
            </ul>
            <div class="h60"></div>
            <ul>
                <li>
                    <router-link to="/bankcardset">
                        <img src="./img/bankcard.png" alt="" style=" background: #01ac80;">
                        <span>银行卡</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/transrecord">
                        <img src="./img/report.png" alt="" style=" background: #2c368d;">
                        <span>交易记录</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/discount">
                        <img src="./img/promo.png" alt="" style=" background: #f00547;">
                        <span>优惠活动</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- <div class="center-three">
             <ul>
                 <li>
                     <router-link to="/bankcardset">
                         <div class="three-l">
                         <img src="./img/bankcard.png" alt="" style="background:#70db2b;">
                         <span>我的银行卡</span>
                     </div>
                     <div class="three-r">
                         <img src="./img/arrow.png" alt="">
                     </div>
                     </router-link>
                 </li>
                 <li>
                     <router-link to="transrecord">
                        <div class="three-l">
                            <img src="./img/bankcard.png" alt="" style="background:#f00547;">
                            <span>交易记录</span>
                        </div>
                        <div class="three-r">
                            <img src="./img/arrow.png" alt="">
                        </div>
                     </router-link>
                 </li>
                 <li>
                     <router-link to="/discount">
                        <div class="three-l">
                            <img src="./img/bankcard.png" alt="" style="background:#006837;">
                            <span>优惠活动</span>
                        </div>
                        <div class="three-r">
                            <img src="./img/arrow.png" alt="">
                        </div>
                     </router-link>
                 </li>
             </ul>
        </div> -->
        <Foot></Foot>
        <!-- 登录前侧边栏 -->
        <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
           <Side v-if="isshow==true" v-on:ishide="hideSide" v-on:isexit="exit"></Side>
        </transition>
        <div class="mask" v-show="isshow"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isshow: false
    };
  },
  mounted() {
    this.$islogin();
  },
  computed:{
    name:function(){
        return this.$store.getters.userId;
    },
    money:function(){
        return this.$store.state.brance;
    }
  },
  components: {
    Head: resolve => {
      require(["@/components/Head"], resolve);
    },
    Foot: resolve => {
      require(["@/components/Foot"], resolve);
    },
    Side: resolve => {
      require(["@/components/Sidebar"], resolve);
    }
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
      this.$store.state.user_info = null;
      this.$store.dispatch('exitGo').then(res=>{
          this.$router.push('/')
      });
    },
    // 刷新
    refrush(){
        this.$store.dispatch('showBrance');
    }
  }
};
</script>

<style scoped lang="less">
@import url(./center.less);
</style>