<template>
    <div class="forgetwrap">
         <Head title="忘记密码" type="backhd"></Head>
         <ul>
             <li><x-input title="新的密码" type="password" placeholder="请输入新密码" v-model="newpwd1"></x-input></li>
             <li><x-input title="确认密码" type="password" placeholder="请二次输入新密码" v-model="newpwd2"></x-input></li>
         </ul>
         <div class="h40"></div>
         <div class="pay-go" @click="okGo">
             <span>完成</span>
         </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      newpwd1: "",
      newpwd2: ""
    };
  },
  mounted() {},
  methods: {
    okGo(){
        if(this.newpwd1==''||this.newpwd2==''){
            this.$vux.toast.text('不能为空哦');
            return;
        }
        if(this.newpwd1!=this.newpwd2){
            this.$vux.toast.text('两次密码输入不一致');
            return;
        }
        let param = {
                username: this.$route.query.username,
                code_type: this.$route.query.codetype,
                code_value: this.$route.query.codevalue,
                pwd_new: this.newpwd1,
                pwd_sure: this.newpwd2
            }
        this.$http.post('/public/forget_pwd_update.do',{param}).then(e=>{
            if(e.data.Status==200){
                this.$vux.toast.text(e.data.Msg);
                this.$router.push('login');
            }else{
                this.$vux.toast.text(e.data.Msg);
            }
        })
    }
  },
  components: {
    Head: relove => {
      require(["@/components/Head"], relove);
    }
  }
};
</script>

<style scoped lang="less">
.forgetwrap{
        height:100%;
        background:#f2f2f2;
    }
    .forgetwrap ul li{
        background:#fff;
        margin-top:0.2rem;
    }
    .getcode{
        padding:5px 10px;
        background:#e6a23c;
        color:#fff;
        border-radius:4px;
    }
    .pay-go span{
      background: @color;
    }
</style>