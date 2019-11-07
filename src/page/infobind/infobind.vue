<template>
    <div class="wrap">
         <Head :title="title" type="backhd"></Head>
         <ul>
             <li><x-input :title="infoname" :placeholder="'请输入要绑定的'+infoname" v-model="infoval"></x-input></li>
             <li v-if="tt=='email'">
                 <x-input title="验证码" v-model="emailcode">
                     <span v-show="btntype" class="getcode" slot="right" @click="getCode">获取</span>
                     <span v-show="!btntype" class="getcode" slot="right">{{count}}s</span>
                 </x-input>
             </li>
             <li v-if="tt=='phone'">
                 <x-input title="验证码" v-model="phonecode">
                     <span v-show="btntype" class="getcode" slot="right" @click="getCode">获取</span>
                     <span v-show="!btntype" class="getcode" slot="right">{{count}}s</span>
                 </x-input>
             </li>
         </ul>
         <div class="h40"></div>
         <div class="pay-go" @click="bindGo">
             <span>提交</span>
         </div>
    </div>
</template>

<script>
import Head from "@/components/Head.vue";
export default {
  data() {
    return {
      title: "信息绑定",
      infoval: "",
      infoname: "",
      tt: "",
      btntype: true,
      code: "",
      count: "",
      timer: null,
      phonecode:'',
      emailcode:''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      let t = this.$route.query.type;
      this.tt = t;
      switch (t) {
        case "email":
          this.infoname = "邮箱";
          break;
        case "qq":
          this.infoname = "QQ";
          break;
        case "wechat":
          this.infoname = "微信";
          break;
        case "name":
          this.infoname = "真实姓名";
          break;
        case "phone":
          this.infoname = "手机";
          break;
      }
    },
    // 绑定提交
    bindGo() {
      let url;
      let params = {};
      if (this.infoval == "") {
        this.$vux.toast.text("还没输入呢");
        return;
      }
      if (this.$route.query.type == "email") {
        url = "/user/email_verify.do";
        params.email_code = this.emailcode;
      } else if (this.$route.query.type == "qq") {
        url = "/user/bind_tencent.do";
        params.tencent_qq = this.infoval;
      } else if (this.$route.query.type == "name") {
        url = "/user/real_name.do";
        params.real = this.infoval;
      } else if (this.$route.query.type == "phone") {
        url = "/user/phone_verify.do";
        params.phone_code = this.phonecode;
      } else {
        url = "/user/bind_wechat.do";
        params.wechat = this.infoval;
      }
      this.$http.post(url, params).then(e => {
        if (e.data.Status == 200) {
          this.$vux.toast.text(e.data.Msg);
          var obj = JSON.parse(sessionStorage.vns_info);
          if (this.tt == "email") {
            obj.email = this.infoval;
          } else if (this.tt == "qq") {
            obj.qq = this.infoval;
          } else if (this.tt == "wechat") {
            obj.wechat = this.infoval;
          } else if (this.tt == "name") {
            obj.true_name = this.infoval;
          } else if (this.tt == "phone") {
            obj.telephone = this.infoval;
          }
          sessionStorage.vns_info = JSON.stringify(obj);
          this.$router.push("personinfo");
        } else {
          this.$vux.toast.text(e.data.Msg);
        }
      });
    },
    // 获取验证码
    getCode(code) {
      if (this.$route.query.type == "email") {
        if (this.infoval == "") {
          this.$vux.toast.text("请输入要绑定的邮箱");
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
          this.requestCode();
        }
      } else {
        if (this.infoval == "") {
          this.$vux.toast.text("请输入要绑定的手机");
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
          this.requestCodePhone();
        }
      }
    },
    // 绑定邮箱验证码接口
    requestCode() {
      this.$http.post("/user/email.do", { email: this.infoval }).then(e => {
        if (e.data.Status == 200) {
          this.$vux.toast.text(e.data.Msg);
        } else {
          this.$vux.toast.text(e.data.Msg);
        }
      });
    },
    // 绑定邮箱验证码接口
    requestCodePhone() {
      this.$http.post("/user/phone.do", { phone: this.infoval }).then(e => {
        if (e.data.Status == 200) {
          this.$vux.toast.text(e.data.Msg);
        } else {
          this.$vux.toast.text(e.data.Msg);
        }
      });
    }
  },
  components: {
    Head
  }
};
</script>

<style scoped lang="less">
.wrap {
  height: 100%;
  background: #f2f2f2;
}
.wrap ul li {
  background: #fff;
  margin-top: 0.2rem;
}
.getcode {
  padding: 5px 10px;
  background: @code-bg;
  color: #fff;
  border-radius: 4px;
}
</style>`