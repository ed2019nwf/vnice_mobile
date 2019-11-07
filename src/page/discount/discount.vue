<template>
    <div class="countwrap">
        <Head type="backhd" title="优惠活动"></Head>
        <!-- Tab -->
        <div class="count-tab">
          <tab :line-width=2 active-color='@tab-bar-active-color' v-model="tabIndex">
              <tab-item class="vux-center" @on-item-click="changeActiveList(tabIndex)">全部</tab-item>
              <tab-item class="vux-center" @on-item-click="changeActiveList(index)"  v-for="(item, index) in activehead" :key="index">{{item.title}}</tab-item>
          </tab>
        </div>
        <div class="tab-swiper">
            <ul class="dis-img">
                <li v-for="(item2,index2) in endlist" :key="index2" @click="goDiscountDetail(item2)">
                    <img :src="item2.img3" alt="">
                    <div class="dis-tit">{{item2.title}}<span>更多详情<x-icon class="icon-right" type="ios-arrow-right" size="20"></x-icon></span></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Head from "@/components/Head";
const list = () => ["精选", "美食", "电影", "酒店", "外卖"];
export default {
  data() {
    return {
      list: list(),
      title: "优惠活动",
      activehead: [],
      activelist: [],
      endlist: [],
      tabIndex: 0
    };
  },
  mounted() {
    this.getActiveHead();
    this.getActiveList();
  },
  methods: {
    // 获取优惠头部标题
    getActiveHead() {
      this.$http.post("/public/active_head.do").then(e => {
        if (e.data.Status == 200) {
          this.activehead = e.data.Data.class_list;
          window.sessionStorage.vns_activehead = JSON.stringify(
            this.activehead
          );
        }
      });
    },
    // 获取优惠列表
    getActiveList() {
      this.$http
        .post("/public/active_list.do", { is_list: "1", is_info: "1" })
        .then(e => {
          if (e.data.Status == 200) {
            this.activelist = e.data.Data.active_list;
            this.endlist = this.activelist;
            this.checkUrl();
            window.activelist = e.data.Data.active_list;
          }
        });
    },
    // 点击头部切换列表
    changeActiveList(key) {
      if (this.tabIndex === 0) {
        // 如果是全部
        this.endlist = this.activelist;
        return false;
      }
      let vns_activehead = JSON.parse(sessionStorage.vns_activehead);
      this.endlist = this.activelist.filter(val=> {
        return val.class_id == vns_activehead[key].id;
      });
    },
    // 判断是否banner图进来
    checkUrl() {
      if (this.$route.query.bannerid) {
        var key = 0,
          arr = [];
        for (var i in this.activehead) {
          if (this.activehead[i].id === this.$route.query.bannerid) {
            this.tabIndex = key + 1;
          }
          key++;
        }
        this.activelist.map(val => {
          if (val.class_id === this.$route.query.bannerid) {
            arr.push(val);
          }
        });
        this.endlist = arr;
      }
    },
    // 进入优惠详情
    goDiscountDetail(obj) {
      this.$router.push({
        path: "/discountDetail",
        query: {
          id: obj.id
        }
      });
    }
  },
  components: {
    Head
  }
};
</script>
<style lang="less">
.count-tab .scrollable.vux-tab{
  background: #fff;
}
</style>

<style lang="less" scoped>
.countwrap {
  background: #f0e9df;
  padding-top:1.8rem;
}
.dis-img li {
  margin-bottom: 0.24rem;
}
.dis-tit {
  height: 1.02rem;
  line-height: 1.02rem;
  background: #fff;
  font-size: 0.38rem;
  color: #343434;
  padding: 0 0.4rem;
  position: relative;
}
.dis-tit span {
  float: right;
  font-size: 0.32rem;
  color: @count-more-color;
  margin-right: 0.2rem;
}
.countwrap .icon-right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.vux-x-icon {
  fill: @count-icon-color;
}
.my-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
}
</style>