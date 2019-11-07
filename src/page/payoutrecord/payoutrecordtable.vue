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
        <!-- 查到数据的情况 -->
        <x-table :cell-bordered="false" style="background:#ffffff;" v-else>
            <thead>
                <tr style="background-color:#f0e9df;">
                    <th style="width:25%">日期</th>
                    <th style="width:20%">现金类型</th>
                    <th style="width:20%">金额</th>
                    <th style="width:20%">状态</th>
                    <th style="width:15%">备注</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in recordlist">
                    <td>{{item.date}}</td>
                    <td>{{item.in_out}}</td>
                    <td>{{item.amout}}</td>
                    <td>{{item.status | allstatus}}</td>
                    <td>{{item.other}}</td>
                </tr>
            </tbody>
         </x-table>
    </div>
</template>

<script>
import Head from '@/components/Head'
    export default {
        data(){
            return {
                title:'存取记录',
                recordlist:[]
            }
        },
        mounted(){
            this.showRecord();
        },
        methods:{
            showRecord(){
                this.$http.post('/ext/in_and_out_record.do',{
                    s_date: this.$route.query.s_date ? this.$route.query.s_date : '',
                    e_date: this.$route.query.e_date ? this.$route.query.e_date : '',
                    status: this.$route.query.status ? this.$route.query.status : '',
                    page: 1,
                    row: 50
                }).then(e=>{
                    if(e.data.Status==200){
                        this.recordlist = e.data.Data.cash_list;
                    }
                })
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
        }
    },
        components:{
            Head
        }
    }
</script>

<style scoped>
.recordtable-wrap{
    padding-top:1.7rem;
}
.my-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
}
</style>