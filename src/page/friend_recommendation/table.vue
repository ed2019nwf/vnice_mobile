<!--  -->
<template>
  <div class="f-table">
      <Head title="推荐好友" type="backhd"></Head>
      <div class="nothing" v-if="data.length<1">
          <span>什么都木有哦</span>
          <span>=￣ω￣=</span>
      </div>
      <x-table :cell-bordered="false" style="background:#ffffff;" v-else>
          <thead>
              <tr style="background-color:#f0e9df;">
                  <th style="width:33%">会员账号</th>
                  <th style="width:33%">一周内存款总额</th>
                  <th style="width:33%">状态</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item, index) in data" :key="index">
                  <td>{{item.username}}</td>
                  <td>{{item.cash7day}}</td>
                  <td>{{item.status == 1 ? '正常':'锁定'}}</td>
              </tr>
          </tbody>
      </x-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
        page:1,
        data:[]
    };
  },

  components: {
      Head:relove=>{
          require(['@/components/Head'],relove)
      }
  },

  computed: {},

  mounted(){
      this.getData();
  },

  methods: {
      getData(){
          this.$http.post("/ext/tj_user.do",{
              s_date:this.$route.query.startTime,
              e_date:this.$route.query.endTime,
              account:this.$route.query.userName,
              page:this.page,
              row:100
          }).then(data=>{
              if(data.data.Status === 200){
                  this.data = data.data.Data.user_to;
              }else {
                   that.$vux.toast.text(data.data.Msg);
              }
          })
      }
  }
}

</script>
<style scoped>
@import url(./index.less);
</style>