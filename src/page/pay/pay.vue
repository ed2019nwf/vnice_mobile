<template>
    <div class="paywrap">
         <Head title="快速充值" type="backhd"></Head>
         <!-- Tab -->
        <div class="paytab">
            <tab :line-width=2 v-model="tabindex">
                <tab-item v-for="(item, index) in paylist" :selected='index == tabindex'  :key="index">{{item.title}}</tab-item>
            </tab>
            <swiper v-model="tabindex" height="470px" :show-dots="false" class="pay-tab-content">
                <swiper-item v-for="(item, key) in paylist" :key="key">
                <div class="tab-swiper vux-center">
                    <!-- hand -->
                    <div v-if="item.cash_type=='hand'">
                        <div v-if="item.class_id=='6'">
                            <div class="pay-hand-one">
                                <h3><i class="pay-bank-icon"></i>工商银行</h3>
                                <ul>
                                    <li>
                                        <label>收款人姓名：</label>
                                        <span>{{item.list[0].cardname}}</span>
                                    </li>
                                    <li>
                                        <label>银行卡号：</label>
                                        <span>{{item.list[0].cardnumber}}</span>
                                    </li>
                                    <li>
                                        <label>开户网点：</label>
                                        <span>{{item.list[0].branchbank}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="h20"></div>
                        </div>
                    </div>
                    <!-- online -->
                    <div v-if="item.cash_type=='online'">
                        <div v-if="item.class_id=='1'">
                            <div class="pay-hand-one">
                                <h3>
                                    <span :class="{'active':payway === index}" v-for="(way,index) in item.list" @click="payway = index"><i class="pay-bank-icon"></i>支付通道{{index+1}}</span>
                                </h3>
                            </div>
                            <div class="h20"></div>
                            <div class="pay-base-item" @click="choseBank">
                                <span><i class="pay-allbank-icon"></i>请选择银行<em style="margin-left:15px;">{{banklabel}}</em></span>
                                <x-icon type="ios-arrow-right" size="15"></x-icon>
                            </div>
                            <div class="h20"></div>
                        </div>
                        <div v-else>
                            <div class="pay-hand-one">
                                <h3>
                                    <span :class="{'active':payway === index}" v-for="(way,index) in item.list" @click="payway = index"><i class="pay-bank-icon"></i>支付通道{{index+1}}</span>
                                </h3>
                            </div>
                            <div class="h20"></div>
                        </div>
                    </div>
                    <!-- qrcode -->
                    <div v-if="item.cash_type=='qr_code'">
                        <div class="pay-hand-one">
                            <h3>
                                <span :class="{'active':payway === index}" v-for="(way,index) in item.list" @click="payway = index"><i class="pay-bank-icon"></i>支付通道{{index+1}}</span>
                            </h3>
                        </div>
                        <div class="h20"></div>
                        <div class="pay-wx">
                            <p>第一步：微信扫码转账 （转账时请留言备注您的<b>游戏账号</b>）:</p>
                            <div class="pay-ewm">
                                <img :src="item.list[0].img_url" alt="" srcset="" style="width:4rem;">
                            </div>
                            <p>第二步：转账成功后，在此输入充值金额:</p>
                        </div>
                        <div class="h20"></div>
                    </div>
                    <!-- 公用部分 -->
                    <div class="pay-base-item" @click="discountPop = true">
                        <span><i class="pay-discount-icon"></i>请选择优惠<em style="margin-left:15px;">{{discountlabel}}</em></span>
                        <x-icon type="ios-arrow-right" size="15"></x-icon>
                    </div>
                    <div class="h20"></div>
                    <div class="pay-hand-two">
                         <div class="pay-hand-money">请选择或填写存款金额</div>
                         <x-input ref="paymoney" v-model="moneyval" title="￥" :required="true" :placeholder="'存款限额最低'+item.list[0].min_amout+'元，最高'+item.list[0].max_amout+'元'"></x-input>
                    </div>
                    <div class="h20"></div>
                    <div class="pay-hand-three">
                        <span v-for="(item,index) in moneylist" @click="getMoney(item)">
                            <img :src="item.moneyicon" alt="">
                        </span>
                    </div>
                    <div class="h20"></div>
                    <div class="pay-go" @click="orderSubmit"><span>立即充值</span></div>
                </div>
                </swiper-item>
            </swiper>
        </div>
        <!-- 优惠申请的弹框 -->
        <div v-transfer-dom>
            <popup v-model="discountPop">
                <popup-header :title="discounttit" :show-bottom-border="false"></popup-header>
                <group gutter="0">
                    <radio class="my-radio" :options="titlelist" v-model="discountcode" @on-change="getCurDiscount"></radio>
                </group>
            </popup>
        </div>
         <!-- 银行卡的弹框 -->
        <div v-transfer-dom>
            <popup v-model="bankPop">
                <popup-header
                :title="banktit"
                :show-bottom-border="false">
                </popup-header>
                <group gutter="0">
                    <radio class="my-radio" :options="banklist" v-model="bankcode" @on-change="getCurBank"></radio>
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
      tabindex: 0,
      discountlist: [],
      discountPop: false,
      discounttit: "选择优惠",
      bankPop: false,
      banktit:"选择银行卡",
      titlelist: [],
      discountcode: "",
      paylist: [],
      moneylist: [
          {   
              moneyicon:'../../../static/img/token100.png',
              moneyvalue:100
          },{
              moneyicon:'../../../static/img/token500.png',
              moneyvalue:500
          },{
              moneyicon:'../../../static/img/token1000.png',
              moneyvalue:1000
          },{
              moneyicon:'../../../static/img/token5000.png',
              moneyvalue:5000
          },
      ],
      moneyval: "",
      isok: "",
      payway: 0,
      banklist: [],
      bankcode: "",
      discountlabel:'',
      banklabel:''
    };
  },
  mounted() {
    this.getDiscountList();
    this.getAllPay();
  },
  methods: {
    //   获取优惠
    getDiscountList() {
      this.$http.post("/cash/user_active_class.do").then(e => {
        if (e.data.Status == 200) {
          let cashbonus = e.data.Data.cash_bonus;
          for (var i in cashbonus) {
            for (var j in cashbonus[i].list) {
              this.discountlist.push(cashbonus[i].list[j]);
            }
          }
          this.titlelist = this.discountlist.map(function(val) {
            return {
              value: val.sub_title,
              key: val.cash_type_code
            };
          });
        }
      });
    },
    // 获取支付方式
    getAllPay() {
      this.$http.post("/cash/all_pay.do").then(e => {
        if (e.data.Status == 200) {
          this.paylist = e.data.Data.pay_list;
        }
      });
    },
    // 获取充值金额
    getMoney(obj) {
      this.moneyval = obj.moneyvalue;
    },
    // 选择银行卡
    choseBank() {
      this.bankPop = true;
      this.banklist = this.paylist[this.index].list[this.payway].bank_list.map(
        data => {
          return {
            key: data.bank_code,
            value: data.bank_title
          };
        }
      );
    },
    // 获取当前选择的优惠
    getCurDiscount(value,label){
        this.discountlabel = label;
        this.discountPop = false;
    },
    // 获取当前选择的银行卡
    getCurBank(value,label){
        this.banklabel = label;
        this.bankPop = false;
    },
    // 提交订单
    orderSubmit() {
      var param = {
        pay_id: this.paylist[this.index].list[this.payway].id,
        class_id: this.paylist[this.index].class_id,
        cash_type: this.paylist[this.index].cash_type,
        amount: this.moneyval,
        bonus_id: this.discountcode
      };
      if(this.moneyval==''){
          this.$vux.toast.text('还没输入金额呢');
          return;
      }
      // 如果是网银支付，把银行卡id传过去
      if (
        this.paylist[this.index].cash_type == "online" &&
        this.paylist[this.index].class_id == "1"
      ) {
        param.bank_code = this.bankcode;
      }
      this.$http.post("/cash/deposit_pay.do", param).then(e => {
        if (e.data.Status === 200) {
          this.$vux.toast.text("创建订单成功", "middle");
          if (this.paylist[this.index].cash_type == "online") {
            let url =
              e.data.Data.order_url +
              "?ordernumber" +
              "=" +
              e.data.Data.ordernumber +
              "&order_code=" +
              e.data.Data.order_code;
            window.location.href = url;
          }
        } else{
          this.$vux.toast.text(e.data.Msg, "middle");
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
@import url(./pay.less);
</style>
