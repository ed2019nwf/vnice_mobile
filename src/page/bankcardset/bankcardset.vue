<template>
    <div class="wrap">
         <Head title="我的银行卡" type="backhd"></Head>
         <div v-if="bankcardlist.length==0" class="nocard">
             <img src="../../../static/img/bank_card.png" alt="">
         </div>
         <ul class="cardlist">
             <li v-for="item in bankcardlist">
                 <div>
                     <p>{{item.bank_title}}</p>
                     <p>{{item.cardnumber}}</p>
                 </div>
                 <x-icon type="ios-close" class="cell-x-icon" size="20" @click="unbind(item)"></x-icon>
             </li>
         </ul>
         <div class="h40"></div>
         <div class="pay-go">
             <span><router-link to="/addbank">添加银行卡</router-link></span>
         </div>
    </div>
</template>

<script>
    import Head from '@/components/Head'
    export default {
        data(){
            return {
                bankcardlist:[]
            }
        },
        mounted() {
            this.showBankList();
        },
        methods:{
            // 银行卡列表
            showBankList(){
                this.$http.post('/cash/user_bank_list.do').then(e=>{
                     this.bankcardlist = e.data.Data.bank_list;
                })
            },
            // 解绑银行卡
            unbind(obj){
                this.$http.post('/cash/unbundled_bank.do',{bank_id:obj.id}).then(e=>{
                     if(e.data.Status==200){
                         this.$vux.toast.text(e.data.Msg);
                         this.bankcardlist = this.bankcardlist.filter(val=>{
                             return val.id !==obj.id;
                         })
                     }else{
                         this.$vux.toast.text(e.data.Msg);
                     }
                })
            }
        },
        components:{
            Head
        }
    }
</script>

<style scoped>
   .wrap{
       height:100%;
       background:#f2f2f2;
   }
   .nocard{
       padding: 6px 0;
       text-align:center;
       margin: 0.4rem 0;
   }
   .nocard img{
       display: inline-block;
       width:60%;
   }
   .cardlist{
       padding: 0 0.2rem;
   }
   .cardlist li{
       padding: 0.25rem;
       background:linear-gradient(to right, rgba(254,125,143,1) 0%, rgba(232,90,112,1) 100%);
       margin-top:0.2rem;
       display:flex;
       justify-content: space-between;
       align-items: center;
       border-radius:6px;
       -webkit-border-radius:6px;
   }
    .cardlist li p{
        font-size: 14px;
        color:#fff;
    }
    .cardlist li p:first-child{
        margin-bottom: 0.3rem;
    }
   .cell-x-icon{
       fill:#fff;
   }
</style>