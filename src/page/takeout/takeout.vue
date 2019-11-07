<template>
    <div class="wrap">
        <Head :title="title" type="backhd"></Head>
        <div class="takebox">
            <!-- 未绑定银行的模块 -->
            <div v-if = "unbindcard==true">
                <div class="nocard">
                <img src="../../../static/img/bank_card.png" alt="">
                </div>
                <div class="h40"></div>
                <div class="pay-go" style="padding:0;">
                    <span><router-link to="/addbank">添加银行卡</router-link></span>
                </div>
            </div>
            <!-- 已绑定银行的模块 -->
            <div v-if = "bindcard==true">
                <div class="takelist">
                    <label class="">选择提款银行卡</label>
                    <div class="pay-base-item" @click="showBank">
                        <span>请选择<em style="margin-left:15px;">{{banklabel}}</em></span>
                        <x-icon type="ios-arrow-right" size="15"></x-icon>
                    </div>
                </div>
                <div class="takelist pay-hand-two">
                    <label class="">输入提款金额</label>
                    <x-input ref="paymoney" v-model="moneyval" title="￥" :required="true" placeholder="请输入取款金额"></x-input>
                </div>
                <div class="pay-go"><span @click="outGo">确认并提交</span></div>
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
                    <radio class="my-radio" :options="banklist" v-model="bankid" @on-change="getCurBank"></radio>
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
      title: "提款",
      platform:'',
      moneyval:'',
      moneylist: [50, 100, 500, 1000, 1500],
      isok:'',
      bankPop:false,
      banktit:"选择银行卡",
      banklist:[],
      bankid:'',
      banklabel:'',
      unbindcard:false,
      bindcard:false
    };
  },
  mounted() {
     this.getPlatform();
     this.getBankList();
  },
  methods: {
    // 获取钱包以及各平台余额
    getPlatform(){
       let _username = JSON.parse(sessionStorage.vns_info).username;
       this.$http.post('/admin/plat_balance.do',{account: _username}).then(e=>{
            if(e.data.Status==200){
                this.platform = e.data.Data;
            }
       })
    },
    // 获取银行卡列表
    getBankList() {
        //this.bankPop = true;
        this.$http.post('/cash/user_bank_list.do').then(e=>{
            if(e.data.Status==200){
                if(e.data.Data.bank_list.length==0){
                    this.unbindcard = true;
                    return;
                }
                this.bindcard = true;
                this.banklist = e.data.Data.bank_list.map(function(val){
                     return {
                         key:val.id,
                         value:val.bank_title
                     }
                });
            }
        })
    },
    // 选择银行卡
    showBank() {
      this.bankPop = true;
    },
    // label => 银行卡名字  value => 银行卡id
    getCurBank(value,label){
        this.banklabel = label;
        this.bankPop = false;
    },
    // 获取充值金额
    getMoney(obj, key) {
      this.isok = key;
      this.moneyval = obj;
    },
    // 刷新金额
    refrash(){
        window.location.reload();
    },
    firstbind(){
        this.$router.push('addbank');
    },
    // 取款提交
    outGo(){
        if (this.bankid == "" || this.bankid==null) {
            this.$vux.toast.text('请选择银行卡');
            return;
        }
        if(this.moneyval=='' || this.moneyval==0){
            this.$vux.toast.text('请输入取款金额');
            return;
        }
        if(this.moneyval > this.platform.balance){
            this.$vux.toast.text('余额不够哦');
            return;
        }
        let param = {
            bank_id: this.bankid,
            amount: this.moneyval
        }
        this.$http.post('/cash/withdrawals.do',param).then(e=>{
             if(e.data.Status==200){
                this.$vux.toast.text('订单创建成功');
                this.$router.push('payoutrecordtable');
             }else{
                this.$vux.toast.text(e.data.Msg);
             }
        })
    }
  },
  components: {
    Head
  }
};
</script>

<style scoped>
@import url(./takeout.css);
</style>