<template>
    <div>
        <Head title="交易记录" type="backhd"></Head>
        <tab :line-width=2 active-color='@color' v-model="index">
            <tab-item class="vux-center" v-for="(item, key) in paylist" :key="key">{{item.title}}</tab-item>
        </tab>
        <swiper v-model="index" height="470px" :show-dots="false" class="pay-tab-content">
            <swiper-item v-for="(item, key) in paylist" :key="key">
                <div class="tab-swiper vux-center">
                    <div class="my-datatime">
                        <group>
                            <datetime v-model="startTime" title="开始时间："></datetime>
                        </group>
                        <group>
                            <datetime v-model="endTime" title="结束时间："></datetime>
                        </group>
                        <div class="h40"></div>
                        <div class="pay-go" @click="search">
                            <span>查询</span>
                        </div>
                    </div>
                </div>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      paylist: [
        {
          title: "存取记录"
        },
        {
          title: "额度记录"
        },
        {
          title: "优惠记录"
        }
      ],
      startTime: "",
      endTime: ""
    };
  },
  mounted() {},
  methods: {
    search() {
      if (this.index == 0) {
        this.$router.push({
          path: "payoutrecordtable",
          query: {
            s_date: this.startTime,
            e_date: this.endTime
          }
        });
      } else if (this.index == 1) {
        this.$router.push({
          path: "limitrecordtable",
          query: {
            s_date: this.startTime,
            e_date: this.endTime
          }
        });
      } else {
        this.$router.push({
          path: "discountrecordtable",
          query: {
            s_date: this.startTime,
            e_date: this.endTime
          }
        });
      }
    }
  },
  components: {
    Head: resolve => {
      require(["@/components/Head"], resolve);
    }
  }
};
</script>

<style scoped>
</style>