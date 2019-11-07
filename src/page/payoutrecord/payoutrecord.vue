<template>
    <div class="wrap">
         <Head :title="title"></Head>
         <div class="my-datatime">
             <group>
                <datetime v-model="startTime" title="开始时间："></datetime>
            </group>
            <group>
                <datetime v-model="endTime" title="结束时间："></datetime>
            </group>
            <group>
                <popup-radio title="状态" :options="statelist" v-model="checkstate">
                    <p slot="popup-header" class="vux-1px-b demo3-slot">请选择</p>
                </popup-radio>
            </group>
            <div class="h40"></div>
            <div class="pay-go" @click="search">
                <span>查询</span>
            </div>
         </div>
    </div>
</template>

<script>
    import Head from '@/components/Head'
    export default {
        data(){
            return {
                title:'存取记录',
                startTime: "",
                endTime:'',
                checkstate:'',
                statelist: [{key:'',value:'全部'},{key:1,value:'处理中'},{key:2,value:'审核'},{key:3,value:'完成'},{key:9,value:'拒绝'}],
            }
        },
        mounted() {
            
        },
        methods:{
           search(){
               this.$router.push({
                   path:'payoutrecordtable',
                   query:{
                       s_date:this.startTime,
                       e_date:this.endTime,
                       status:this.checkstate
                   }
               })
           }
        },
        components:{
            Head
        }
    }
</script>

<style>
.demo3-slot {
  text-align: center;
  padding: 8px 0;
  color: #888;
}
.my-datatime .weui-cell{
  padding:8px 10px;
}
.my-datatime .weui-cells{
  font-size:0.42rem;
  margin-top:0.2rem;
}
</style>