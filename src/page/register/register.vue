<template>
   <div class="regwrap">
        <Head type="backhd" title="用户注册"></Head>
        <div class="reg-form">
             <ul>
                 <li>
                     <x-input class="x" title="推荐码" label-width="2.2rem" placeholder="没有可不填" v-model="form.tjcode"></x-input>
                 </li>
                 <li>
                     <x-input class="x" ref="username" title="账号" label-width="2.2rem" :required="true" placeholder="6-10字符，字母开头" :is-type="username" v-model="form.username" @on-blur="blurUser"></x-input>
                 </li>
                 <li>
                     <x-input class="x" ref="pwd" title="密码" label-width="2.2rem" type="password" :required="true" placeholder="请输入密码" :is-type="pwd" v-model="form.pwd"></x-input>
                 </li>
                 <li>
                     <x-input class="x" ref="pwd1" title="确认密码" label-width="2.2rem" type="password" :required="true" placeholder="请确认密码" :is-type="pwd1" v-model="form.pwd1"></x-input>
                 </li>
                 <li>
                     <x-input class="x" ref="email" title="邮箱" label-width="2.2rem" :required="true" placeholder="请输入您的邮箱" :is-type="email" v-model="form.email"></x-input>
                 </li>
                 <li>
                     <x-input class="x" ref="phone" title="手机号码" label-width="2.2rem" :required="true" placeholder="请输入您的手机号码" :is-type="phone" v-model="form.phone"></x-input>
                 </li>
                 <li>
                     <x-input class="x" ref="code" title="验证码" label-width="2.2rem" :show-clear="false" placeholder="请输入验证码" :is-type="code" v-model="form.code">
                         <img slot="right" :src="api" @click="changeCode">
                     </x-input>
                 </li>
                 <li>
                     <div class="reg-rule" v-model="rule" :class="{on:rule}" @click="changerule"><em></em>我已满合法年龄，且同意各项开户条约。</div>
                 </li>
                 <li @click="goReg">
                     <div class="pay-go">
                         <span>确认送出</span>
                     </div>
                 </li>
             </ul>
        </div>
   </div>
</template>

<script>
import Head from '@/components/Head'
export default {
  name: '',
  data () {
    return {
        form:{
            tjcode: "",
            username:'',
            pwd: "",
            pwd1: "",
            email: "",
            phone: "",
            qq: "",
            code: ""
        },
        api:'',
        rule: true,
        username:function(value){
           return {
                    valid: /^[A-Z-a-z]{1}[A-Za-z0-9]{5,9}$/.test(value),
                    msg: "用户名格式错误"
                };
        },
        pwd: function(value) {
                return {
                    valid: /^[A-Za-z0-9]{8,15}$/.test(value),
                    msg: "密码格式错误"
                };
        },
        pwd1: function(value) {
            return {
                valid: /^[A-Za-z0-9]{8,15}$/.test(value),
                msg: "两次密码输入不一致"
            };
        },
        phone: function(value) {
            return {
                valid: /^0?1\d{10}$/.test(value),
                msg: "手机格式错误"
            };
        },
        email: function(value) {
            return {
                valid: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
                    value
                ),
                msg: "邮箱格式错误"
            };
        },
        code: function(value) {
            return {
                valid: value !== "",
                msg: "请输入验证码"
            };
        }
    }
  },
  mounted() {
        this.api = "/public/captcha.do?" + Math.random();
  },
  components:{
      Head
  },
  methods: {
    // 返回
    goBack() {
            this.$router.go(-1);
    },
    // 改变验证码
    changeCode() {
            this.api = "/public/captcha.do?" + Math.random();
    },
    // 切换用户协议
    changerule(){
            return this.rule=!this.rule;
    },
    // 用户名是否已注册
    blurUser(val){
       this.$http.post('/public/is_exist_name.do',{name:val}).then(e=>{
           if(e.data.Status!=200){
               this.$vux.toast.text(e.data.Msg);
               return;
           }
       })
    },
    // 邮箱是否已注册
    blurEmail(val){
        this.$http.post('/public/is_exist_email.do',{email:val}).then(e=>{
           if(e.data.Status!=200){
               this.$vux.toast.text(e.data.Msg);
               return;
           }
        })
    },
    // 手机号是否已注册
    blurPhone(val){
        this.$http.post('/public/is_exist_phone.do',{phone:val}).then(e=>{
           if(e.data.Status!=200){
               this.$vux.toast.text(e.data.Msg);
               return;
           }
        })
    },
    // 注册提交
    goReg() {
            if (!this.$refs.username.valid) {
                this.$vux.toast.text("用户名格式错误");
                return false;
            }
            if (!this.$refs.pwd.valid) {
                this.$vux.toast.text("密码格式错误");
                return false;
            }
            if (!this.$refs.pwd1.valid) {
                this.$vux.toast.text("密码格式错误");
                return false;
            }
            if (!this.$refs.phone.valid) {
                this.$vux.toast.text("手机号输入错误");
                return false;
            }
            if (!this.$refs.email.valid) {
                this.$vux.toast.text("邮箱格式错误");
                return false;
            }
            if (!this.$refs.code.valid) {
                this.$vux.toast.text("验证码输入错误");
                return false;
            }
            if (this.form.pwd !== this.form.pwd1) {
                this.$vux.toast.text("两次密码输入不一致");
                return false;
            }
            if (!this.rule) {
                this.$vux.toast.text("请阅读游戏协议条款");
                return false;
            }

            var that = this;
            this.$http
                .post("/public/register.do", {
                    username: this.form.username,
                    password: this.form.pwd,
                    confirmpassword: this.form.pwd1,
                    telephone: this.form.phone,
                    email: this.form.email,
                    qq: this.form.qq,
                    tjcode: this.form.tjcode,
                    captcha: this.form.code
                })
                .then(function(data) {
                    if (data.data.Status === 200) {
                        window.sessionStorage.vns_status = 200;
                        that.$vux.toast.text("注册成功");
                        that.getUserInfo();
                    } else {
                        that.$vux.toast.text(data.data.Msg);
                    }
                });
        },
        getUserInfo() {
            var that = this;
            this.$http.post("/user/info.do").then(function(data) {
                if (data.data.Status === 200) {
                    var info = data.data.Data.user_info;
                    window.sessionStorage.vns_info = JSON.stringify(info);
                    that.$router.push("/");
                }
            });
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   @import './register.css';
</style>

