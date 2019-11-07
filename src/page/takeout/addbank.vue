<template>
    <div class="wrap">
         <Head :title="title" type="backhd"></Head>
         <div class="bankbox">
             <ul>
                 <li><x-input title="持卡人" :placeholder="this.username" :disabled="true"></x-input></li>
                 <li><x-input title="卡号" :is-type="checkCard" placeholder="请输入银行卡号" v-model="bankinfo.card" :required="true"></x-input></li>
                 <li class="bankslide" @click="bankPop = true">
                     <span>请选择银行<em style="margin-left:15px;">{{bankname}}</em></span>
                     <x-icon type="ios-arrow-right" size="15"></x-icon>
                 </li>
                 <li><x-input title="开户行" placeholder="请输入开户网点" v-model="bankinfo.bankplace" :required="true"></x-input></li>
             </ul>
             <div class="h40"></div>
             <div class="pay-go">
                 <span @click="addCard">提交绑定</span>
             </div>
         </div>
         <!-- 银行卡的弹框 -->
        <div v-transfer-dom>
            <popup v-model="bankPop">
                <popup-header
                :title="banktit"
                :show-bottom-border="false">
                </popup-header>
                <group gutter="0">
                    <radio class="my-radio" :options="banklist" v-model="bankinfo.bankcode" @on-change="getCurBank"></radio>
                </group>
            </popup>
        </div>
    </div>
</template>

<script>
import Head from "@/components/Head.vue";
export default {
  data() {
    return {
      title: "添加绑定银行卡",
      banktit: "请选择银行卡",
      username: "",
      bankinfo: {
        card: "",
        bankcode: "",
        bankplace: ""
      },
      banklist: [],
      bankname: "",
      bankPop: false,
      checkCard:function(value){
            return {
                valid:/\d{15}|\d{19}/.test(value),
                msg:'银行卡号格式有误'
            }
      }
    };
  },
  mounted() {
    this.getBankList();
  },
  methods: {
    // 获取银行卡列表
    getBankList() {
      this.username = JSON.parse(sessionStorage.vns_info).true_name;
      if(this.username==""){
         this.$vux.toast.text('请先绑定真实姓名');
      }
      this.$http.post("/cash/bank_list.do").then(e => {
        this.banklist = e.data.Data.bank_list.map(function(val) {
          return {
            key: val.code,
            value: val.title
          };
        });
      });
    },
    // label => 银行卡名字  value => 银行卡id
    getCurBank(value, label) {
      this.bankname = label;
      this.bankPop = false;
    },
    // 添加银行卡提交
    addCard() {
      if (this.bankinfo.card == "") {
        this.$vux.toast.text('请输入卡号');
        return;
      }
      if (this.bankinfo.bankcode == ""||this.bankinfo.bankcode==null) {
        this.$vux.toast.text('请选择银行');
        return;
      }
      if (this.bankinfo.bankplace == "") {
        this.$vux.toast.text('请输入开户网点');
        return;
      }
      let param = {
        yhkh: this.bankinfo.card,
        bank_code: this.bankinfo.bankcode,
        khhzh: this.bankinfo.bankplace
      };
      this.$http.post("/cash/bank_add.do", param).then(e => {
        if (e.data.Status == 200) {
          this.$vux.toast.text("添加成功");
          this.$router.go(-1);
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

<style scoped>
@import url(./addbank.css);
</style>