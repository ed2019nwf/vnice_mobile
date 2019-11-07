<template>
    <div class="wrap">
         <Head :title = "title" type="backhd"></Head>
         <div class="personinfo">
            <ul>
                <li>
                    <div class="perin">
                        <label>游戏账号</label>
                        <div class="mid"><span>{{user_name}}</span></div>
                    </div>
                    <!-- <div class="perin">
                        <label>会员等级</label>
                        <div class="mid"><span class="info-lev">{{owninfo.level}}级</span><router-link to = "/vip">（查看等级规则）</router-link></div>
                        <x-icon type="ios-arrow-right" size="15"></x-icon>
                    </div> -->
                </li>
                <li>
                    <div class="perin perintop">
                        <label>真实姓名</label>
                        <div class="mid"><router-link :to = "truenamepath" style="width: 100%;"><span>{{truename}}</span><span>{{gotruename}}</span></router-link></div>
                        <x-icon type="ios-arrow-right" size="15"></x-icon>
                    </div>
                    <div class="perin">
                        <label>银行卡</label>
                        <div class="mid"><router-link to = "addbank" style="width: 100%;"><span>请绑定您的银行卡</span><span>去绑定</span></router-link></div>
                        <x-icon type="ios-arrow-right" size="15"></x-icon>
                    </div>
                </li>
                <li>
                    <div class="perin perintop">
                        <label>手机</label>
                        <div class="mid"><router-link :to = "phonepath" style="width:100%"><span>{{owninfo.telephone}}</span><span>{{gophone}}</span></router-link></div>
                        <x-icon type="ios-arrow-right" size="15"></x-icon>
                    </div>
                    <div class="perin">
                        <label>邮箱</label>
                        <div class="mid"><router-link :to = "emailpath" style="width: 100%;"><span>{{owninfo.email}}</span><span>{{goemail}}</span></router-link></div>
                        <x-icon type="ios-arrow-right" size="15"></x-icon>
                    </div>
                </li>
                <li>
                     <div class="perin perintop">
                        <label>QQ</label>
                        <div class="mid"><router-link :to = "qqpath" style="width: 100%;"><span>{{qq}}</span><span>{{goqq}}</span></router-link></div>
                        <x-icon type="ios-arrow-right" size="15"></x-icon>
                     </div>
                     <div class="perin">
                        <label>微信</label>
                        <div class="mid"><router-link :to = "wxpath" style="width: 100%;"><span>{{wechat}}</span><span>{{gowechat}}</span></router-link></div>
                        <x-icon type="ios-arrow-right" size="15"></x-icon>
                     </div>
                </li>
                <li>
                    <div class="perin">
                        <label>密码</label>
                        <div class="mid"><router-link to = "changepwd" style="width: 100%;"><span>修改密码</span><img class="editpwd" src="../../../static/img/edit.png" alt=""></router-link></div>
                    </div>
                </li>
            </ul>
         </div>
    </div>
</template>

<script>
    import Head from '@/components/Head'
    export default {
        data(){
            return {
                title: '个人信息',
                owninfo:[],
                truename:'',
                qq:'',
                goqq:'',
                wechat:'',
                gowechat:'',
                path:'',
                qqpath:'',
                wxpath:'',
                truenamepath:'',
                gotruename:'',
                gophone:'',
                goemail:'',
                phone:'',
                email:'',
                phonepath:'',
                emailpath:'',
                user_name:''
            }
        },
        mounted() {
            this.bindInfo();
        },
        methods:{
            bindInfo(){
                this.owninfo = JSON.parse(sessionStorage.vns_info);
                this.user_name = this.owninfo.username.substring(2);
                // 真实姓名
                if(this.owninfo.true_name){
                    this.truename = this.owninfo.true_name;
                    this.gotruename = '已绑定';
                    this.truenamepath = "";
                }else{
                    this.truename = '请绑定您的真实姓名';
                    this.gotruename = '去绑定';
                    this.truenamepath = {path:'infobind',query:{type:'name'}};
                }
                // QQ
                if(this.owninfo.qq){
                    this.qq = this.owninfo.qq;
                    this.goqq = '已绑定';
                    this.qqpath = "";
                }else{
                    this.qq = '请绑定您的QQ';
                    this.goqq = '去绑定';
                    this.qqpath = {path:'infobind',query:{type:'qq'}};
                }
                // 微信
                if(this.owninfo.wechat){
                    this.wechat = this.owninfo.wechat;
                    this.gowechat = '已绑定';
                    this.wxpath = "";
                }else{
                    this.wechat = '请绑定您的微信';
                    this.gowechat = '去绑定';
                    this.wxpath = {path:'infobind',query:{type:'wechat'}}
                }
                // 手机
                if(this.owninfo.bind_tel==1){
                    this.phone = this.owninfo.telephone;
                    this.gophone = '已绑定';
                    this.phonepath = "";
                }else{
                    this.phone = "请绑定您的手机";
                    this.gophone = '去绑定';
                    this.phonepath = {path:'infobind',query:{type:'phone'}}
                }
                // 邮箱
                if(this.owninfo.bind_mail==1){
                    this.email = this.owninfo.email;
                    this.goemail = '已绑定';
                    this.emailpath = "";
                }else{
                    this.email = "请绑定您的邮箱";
                    this.goemail = '去绑定';
                    this.emailpath = {path:'infobind',query:{type:'email'}}
                }
            }
        },
        components:{
            Head
        }
    }
</script>

<style scoped lang="less">
    @import './personinfo.less';
</style>