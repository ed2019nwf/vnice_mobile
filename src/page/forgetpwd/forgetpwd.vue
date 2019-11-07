<template>
    <div class="forgetwrap">
         <Head :title="title" type="backhd"></Head>
         <ul>
             <li><x-input title="用户名" placeholder="请输入用户名" v-model="forgetuser"></x-input></li>
             <li>
                 <x-input title="验证码" v-model="code">
                     <span v-show="btntype" class="getcode" slot="right" @click="requestCode">获取</span>
                     <span v-show="!btntype" class="getcode" slot="right">{{count}}s</span>
                 </x-input>
             </li>
         </ul>
         <div class="h40"></div>
         <div class="pay-go" @click="nextStep">
             <span>下一步</span>
         </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      title:'',
      forgetuser: "",
      code: "",
      btntype: true,
      count: "",
      timer: null
    };
  },
  mounted() {
    if(this.$route.query.way==1){
      this.title='邮箱找回';
    }else{
      this.title='手机找回';
    }
  },
  methods: {
    // 获取验证码
    sendCode(code) {
      if (this.forgetuser == "") {
        this.$vux.toast.text("请输入用户名");
        return;
      }
      const time_count = 45;
      if (!this.timer) {
        this.count = time_count;
        this.btntype = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= time_count) {
            this.count--;
          } else {
            this.btntype = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    // 下一步
    nextStep(){
       if(this.forgetuser==''||this.code==''){
         this.$vux.toast.text('请输入完整信息');
         return;
       }
       this.$http.post('/public/forget_pwd_chk.do',{code_type:this.$route.query.way,code_value:this.code}).then(e=>{
         if(e.data.Status==200){
           this.$router.push({
             path:'resetpwd',
             query:{
                 username:this.forgetuser,
                 codetype:this.$route.query.way,
                 codevalue:this.code
             }
           });
         }else{
           this.$vux.toast.text(e.data.Msg);
         }
       })
    },
    requestCode(){
      this.$http.post('/public/forget_pwd_code.do',{username:this.forgetuser,code_type:this.$route.query.way}).then(e=>{
           if(e.data.Status==200){
             this.sendCode();
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
        background:@code-bg;
        color:#fff;
        border-radius:4px;
    }
    .pay-go span{
      background: @color;
    }
</style>