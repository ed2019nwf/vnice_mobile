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
                title:'额度记录',
                startTime: "",
                endTime:''
            }
        },
        mounted() {
            
        },
        methods:{
           search(){
               this.$router.push({
                   path:'limitrecordtable',
                   query:{
                       s_date:this.startTime,
                       e_date:this.endTime
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