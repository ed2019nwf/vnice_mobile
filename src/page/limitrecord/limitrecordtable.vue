<template>
    <div class="recordtable-wrap">
        <Head :title="title" type="backhd"></Head>
        <!-- 什么都木有查到的情况下 -->
        <div v-if="recordlist.length==0">
             <div class="recordbox">
                  <img src="../../../static/img/record_blank.png" width="120" alt="">
                  <p>什么都木有查到哦</p>
             </div>
        </div>
        <x-table :cell-bordered="false" style="background:#ffffff;" v-else>
            <thead>
                <tr style="background-color:#f0e9df;">
                    <th style="width:25%">日期</th>
                    <th style="width:20%">转出平台</th>
                    <th style="width:20%">转入平台</th>
                    <th style="width:20%">金额</th>
                    <th style="width:15%">状态</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in recordlist">
                    <td>{{item.ctime}}</td>
                    <td>{{item.plat_from}}</td>
                    <td>{{item.plat_to}}</td>
                    <td>{{item.from_before}}</td>
                    <td>{{item.status | tlogstatus}}</td>
                </tr>
            </tbody>
         </x-table>
    </div>
</template>

<script>
import Head from "@/components/Head";
export default {
  data() {
    return {
      title: "额度记录",
      recordlist: []
    };
  },
  mounted() {
    this.showRecord();
  },
  methods: {
    showRecord() {
      this.$http
        .post("/game/t_log.do", {
          startdate: this.$route.query.s_date
            ? this.$route.query.s_date + " 00:00:00"
            : this.$route.query.s_date,
          enddate: this.$route.query.e_date
            ? this.$route.query.e_date + " 23:59:59"
            : this.$route.query.e_date,
          page: 1,
          row: 50
        })
        .then(e => {
          if (e.data.Status == 200) {
            this.recordlist = e.data.Data.result;
          }
        });
    }
  },
  filters: {
    allstatus: function(value) {
      var s;
      if (value == 9) {
        s = "拒绝";
      } else if (value == 1) {
        s = "处理";
      } else if (value == 2) {
        s = "审核";
      } else if (value == 3) {
        s = "完成";
      }
      return s;
    },
    tlogtype: function(value) {
      var t;
      if (value == 3) {
        t = "转入";
      } else {
        t = "转出";
      }
      return t;
    },
    tlogstatus: function(value) {
      var s;
      if (value == 1) {
        s = "完成";
      } else if (value == 2) {
        s = "失败";
      }
      return s;
    }
  },
  components: {
    Head
  }
};
</script>

<style scoped>
</style>