<template>
    <div class="wrap">
         <Head :title="title" type="backhd"></Head>
         <ul>
             <li><x-input title="原始密码" type="password" placeholder="请输入旧密码" v-model="pwd0" required></x-input></li>
             <li><x-input title="新的密码" type="password" placeholder="请输入新密码" v-model="pwd1" :min="8" :max="16" required></x-input></li>
             <li><x-input title="确认密码" type="password" placeholder="确认新密码" v-model="pwd2" required></x-input></li>
         </ul>
         <div class="h40"></div>
         <div class="pay-go" @click="updatePwd">
             <span>完成</span>
         </div>
    </div>
</template>

<script>
    import Head from '@/components/Head.vue';
    export default {
        data(){
            return {
                title:'修改密码',
                pwd0:'',
                pwd1:'',
                pwd2:''
            }
        },
        mounted() {
            
        },
        methods:{
           updatePwd(){
               if(this.pwd1==''||this.pwd2==''||this.pwd0==''){
                  this.$vux.toast.text('还没输入哦');
                  return;
               }
               if(this.pwd2!=this.pwd1){
                  this.$vux.toast.text('两次密码输入不一致');
                  return;
               }
               let param = {
                    code_type:'',
                    code_value:'',
                    old_pwd:this.pwd0,
                    pwd_new:this.pwd1,
                    pwd_sure:this.pwd2
               }
               this.$http.post('/user/update_pwd_update.do',param).then(e=>{
                    if(e.data.Status==200){
                        this.$vux.toast.text('修改成功');
                        this.$router.push('login'); 
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
    .wrap ul li{
        background:#fff;
        margin-top:0.2rem;
    }
    
</style>