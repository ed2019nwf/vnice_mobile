<template>
    <div class="wrap">
        <Head :title="title" type="backhd"></Head>
        <div class="switchgroup">
            <x-switch title="自动转账模式" v-model="value" @on-change="remitChange(value)"></x-switch>
        </div>
        <div v-if="value==false">
            <div class="takeout-one">
                <div class="takeout-one-box">
                        <div class="takeout-total">
                            <div class="takeout-one-icon">
                                <img src="../../../static/img/wallet.png" alt="">
                            </div>
                            <div class="takeout-one-text">
                                <p>中心钱包</p>
                                <p>￥<b>{{platform.balance}}</b></p>
                            </div>
                        </div>
                        <div class="takeout-refurbish" @click="refrash">
                            <img src="../../../static/img/refresh.png" alt="" srcset="">
                        </div>
                </div>
            </div>
            <div class="takeout-two">
                <ul>
                    <li v-for="item in platform.list">
                        <label>{{item.title}}</label>
                        <span>{{item.balance}}</span>
                    </li>
                </ul>
            </div>
            <div class="h20"></div>
            <div class="pay-base-item" @click="platformPop=true">
                <span><i>转出</i><em style="margin-left:15px;">{{formplatformname}}</em></span>
                <x-icon type="ios-arrow-right" size="15"></x-icon>
            </div>
            <div class="h20"></div>
            <div class="pay-base-item" @click="platformPop2=true">
                <span><i>转入</i><em style="margin-left:15px;">{{toplatformname}}</em></span>
                <x-icon type="ios-arrow-right" size="15"></x-icon>
            </div>
            <div class="h20"></div>
            <div class="pay-hand-two">
                <x-input ref="paymoney" v-model="moneyval" title="金额（元）" :required="true" placeholder="请输入金额"></x-input>
            </div>
            <div class="h40"></div>
            <div class="pay-go"><span @click="remitSure">提交</span></div>
        </div>
        <div class="pay-auto" v-else>
            <p>温馨提示：切换为自动转账模式，钱包余额会自动转入游戏平台</p>
        </div>
        <!-- 平台弹框1 -->
        <div v-transfer-dom>
            <popup v-model="platformPop">
                <popup-header
                :title="platformtit"
                :show-bottom-border="false">
                </popup-header>
                <group gutter="0">
                    <radio class="my-radio" :options="platformlist" v-model="platformcode" @on-change="checkCur"></radio>
                </group>
            </popup>
        </div>
        <!-- 平台弹框2 -->
        <div v-transfer-dom>
            <popup v-model="platformPop2">
                <popup-header
                :title="platformtit"
                :show-bottom-border="false">
                </popup-header>
                <group gutter="0">
                    <radio class="my-radio" :options="platformlist" v-model="platformcode2" @on-change="checkCurs"></radio>
                </group>
            </popup>
        </div>
    </div>
</template>

<script>
    import Head from '@/components/Head.vue';
    export default {
        data(){
            return {
                title:'转账',
                platform:[],
                moneyval:0,
                isok:'',
                platformPop:false,
                platformPop2:false,
                platformtit:'请选择平台',
                platformlist:[],
                platformcode:'',
                platformcode2:'',
                formplatformname:'请选择平台',
                toplatformname:'请选择平台',
                value: false
            }
        },
        mounted() {
            this.getPlatform();
        },
        methods:{
            // 各个平台信息
            getPlatform(){
                let _username = JSON.parse(sessionStorage.vns_info).username;
                this.$http.post('/admin/plat_balance.do',{account: _username}).then(e=>{
                        if(e.data.Status==200){
                            this.platform = e.data.Data;
                            this.bindPlatform(e.data.Data.list)
                        }
                })
            },
            // 刷新金额
            refrash(){
                this.getPlatform();
            },
            // 绑定平台
            bindPlatform(obj){
                this.platformlist = obj.map(function(val) {
                    return {
                        key:val.plat,
                        value:val.title
                    }
                })
                this.platformlist.unshift({key:'website',value:'中心钱包'});
            },
            // 选择当前
            checkCur(value,label){
               this.formplatformname = label;
               this.platformPop = false;
            },
            // 选择当前
            checkCurs(value,label){
               this.toplatformname = label;
               this.platformPop2 = false;
            },
            // 转账提交
            remitSure(){
                let param = {
                    fromPlat:this.platformcode,
                    toPlat:this.platformcode2,
                    amount:this.moneyval
                }
                this.$http.post('/cash/transferPlattoPlat.do',param).then(e=>{
                    if(e.data.Status==200){
                        this.$vux.toast.text(e.data.Msg);
                    }else{
                        this.$vux.toast.text(e.data.Msg);
                    }
                })
            },
            // 转账方式切换
            remitChange(currentValue){
                let comstatus;
                if(currentValue){
                    comstatus = 1;
                }else{
                    comstatus = 2;
                }
                this.$http.post('/user/ChangeCommonstate.do',{commonState:comstatus}).then(e=>{
                    if(e.data.Status == 200){
                        this.$vux.toast.text('切换成功')
                    }
                })
            }
        },
        components:{
            Head
        }
    }
</script>

<style scoped lang="less">
@import url(./remit.less);
</style>