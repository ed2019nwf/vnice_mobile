<template>
    <section class="g-flexview">
        <!-- 头部导航 -->
        <Head type="backhd" title="平台余额"></Head>
        <div class="blance-hd">
            <div class="blance-hd-box">
                <div class="takeout-total">
                    <div class="takeout-one-icon">
                        <img src="../../../static/img/wallet.png" alt="">
                    </div>
                    <div class="takeout-one-text">
                        <p>中心钱包</p>
                        <p>￥<b>{{allmoney}}</b></p>
                    </div>
                </div>
                <div class="takeout-refurbish" @click="refrash">
                    <img src="../../../static/img/refresh.png" alt="" srcset="">
                </div>
            </div>
        </div>
        <div class="blance-bd">
            <ul>
                <li v-for="item in list">
                    <a href="javascript:;">
                        <div class="colort">{{item.title}}</div>
                        <div class="colorb">{{item.balance}}元</div>
                    </a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      allmoney: "",
      list: [],
      showlist: ""
    };
  },
  mounted() {
    this.getAllMoney();
  },
  methods: {
    getAllMoney() {
      this.$vux.loading.show();
      var _username = JSON.parse(sessionStorage.vns_info).username;
      this.$http.post("/admin/plat_balance.do", { account: _username }).then(res=>{
        this.$vux.loading.hide();
        if (res.data.Status == 200) {
          this.allmoney = res.data.Data.total;
          this.list = res.data.Data.list;
        }
      });
    },
    refrash(){
      this.getAllMoney();
    }
  },
  components: {
    Head: resolve => {
      require(["@/components/Head"], resolve);
    }
  }
};
</script>

<style scoped lang="less">
.blance-hd {
  padding:0 0.48rem;
  margin: 0.3rem 0;
}
.blance-hd-box{
    background: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0.4rem 0.4rem;
    border-radius:6px;
}

.takeout-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.takeout-one-icon {
    padding: 0.2rem;
    background: @money-icon-color;
    border-radius: 50%;
    margin-right: 0.2rem;
}

.takeout-one-icon img {
    width: 0.4rem;
}

.takeout-one-text b {
    font-weight: normal;
    color: @money-text-color;
}

.takeout-refurbish {
    width: 20px;
}

.blance-bd ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.48rem;
}

.blance-bd ul li {
  display: flex;
  width: 3.12rem;
  padding:0.6rem 0;
  margin-bottom: 0.24rem;
  margin-right: 0.24rem;
  background: #ddd;
  border-radius:6px;
}

.blance-bd ul li:nth-child(3n) {
  margin-right: 0;
}

.blance-bd ul li a {
  display: block;
  width: 100%;
  
}

.colort {
  display: flex;
  width: 100%;
  font-size: 0.28rem;
  color: #1c1714;
  font-weight: bold;
  align-items: center;
  justify-content: center;
}

.colorb {
  display: flex;
  width: 100%;
  font-size: 0.24rem;
  color: #333;
  align-items: center;
  justify-content: center;
}
</style>