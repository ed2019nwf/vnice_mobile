<template>
    <div class="delegate">
        <Head :title="title" v-if="show==true" type="backhd"></Head>
        <div class = "container">
             <tab :line-width=2 active-color='@tab-bar-active-color' v-model="a" class="normal">
                <tab-item>合作计划</tab-item>
                <tab-item>常见问题</tab-item>
            </tab>

            <div class="p-20" v-if="a===0">
                <div class="segment">
                    <h4>注册申请</h4>
                    <p>1.请点击<span>代理注册</span>线上提出申请，填写正确的各项资料，邮箱，手机，名字。必须填写真实的，方便以后给您支付佣金。</p>
                    <p>2.澳门威尼斯人娱乐场所会评估审核联盟申请信息，于1个工作日内由专员与您联系开通，并协助您注册推广链接。</p>
                </div>
                <div class="segment">
                    <h4>佣金计划</h4>
                    <table>
                        <tr class='t_head'>
                            <th>代理等级</th>
                            <th>纯利润</th>
                            <th>活跃玩家</th>
                            <th>佣金比例</th>
                        </tr>
                        <tr class='t_row'>
                            <td>1级</td>
                            <td>1万元以上</td>
                            <td>5人或以上</td>
                            <td>30%</td>
                        </tr>
                        <tr class='t_row'>
                            <td>2级</td>
                            <td>10万元以上</td>
                            <td>20人或以上</td>
                            <td>40%</td>
                        </tr>
                        <tr class='t_row'>
                            <td>3级</td>
                            <td>50万元以上</td>
                            <td>50人或以上</td>
                            <td>50%</td>
                        </tr>
                        <tr class='t_row'>
                            <td>4级</td>
                            <td>150万元以上</td>
                            <td>100人或以上</td>
                            <td>60%</td>
                        </tr>
                    </table>
                </div>
                <div class="segment">
                    <p><span>佣金计算方法：</span></p>
                    <p>代理佣金 = 纯利润X当月佣金比例</p>
                    <p>纯利润 = 平台输赢-下线会员总红利-平台费</p>
                    <p>平台费 = （平台输赢-下线会员总红利）X 10%</p>
                    <p>(•平台费主要用于博彩税收，银行交易费用，奖金以及促销活动所产生费用•)</p>
                    <p>佣金提现标准：当月活跃玩家达到5个活跃玩家，佣金大于300元，即可申请佣金提现。 当月有效代理的纯利润为负盈利，当月佣金为0，该笔负盈利将累计至下月的纯盈利中扣除。（负数佣金是否累积至下月，可根据代理实际推广情况而定。） 当月佣金为正数，但不足300元，佣金将累积至达到提现标准之后方可申请全部提出。 </p>
                    <p>代理下线产生的利润，有超过60%来自同一个玩家，此时佣金在派发时将减半。代理若想要发展下级代理，需要提前与代理部专员联系，并且代理自身需要达到佣金提现的最低标准。</p>
                    <p>代理专员开通下级代理渠道之后，方可发展下级代理。上级代理发展下级代理，可额外获得直属下级代理佣金的10%。而下级代理拿到的佣金，与官网佣金比例维持不变。（例：代理A，联系代理部专员申请发展下级代理，且澳门威尼斯人审核通过。</p>
                    <p>代理A邀请代理B从代理A的代理链接注册代理账号，则代理B成功绑定成为代理A的下级代理。 若代理B当月达到5个活跃玩家，佣金为5000元，则代理A将获得5000 X 10%=500元的分级佣金。） 若代理在发展下级之前并未联系代理部专员，澳门威尼斯人代理部将视为一般代理进行处理，不予发放分级佣金。</p>
                </div>
                <div class="segment">
                    <h4>佣金支付</h4>
                    <p>"1.当月只需达到5个或以上的活跃会员，即可获取下线会员的纯盈利乘以对应的佣金比例。</p>
                    <p>2.活跃玩家定义：在澳门威尼斯人，当月成功存款达到200元以上，即为活跃会员。</p>
                    <p>3.合作伙伴下线会员未达到有效活跃玩家人数条件（5人），佣金当月不发放。纯盈利将累计至下月。</p>
                    <p>4.澳门威尼斯人合作伙伴佣金结算周期为：每月第一个星期一中午12点至下个月的第一个星期一中午12点。佣金结算为5个工作日，经审核无误，澳门威尼斯人代理部门将与合作伙伴确定佣金及银行信息后即时发放佣金。"</p>
                </div>
                <div class="segment" style="padding-bottom:0.4rem">
                    <h4>代理条款</h4>
                    <p>"1.任何使用不诚实方法骗取佣金的合作伙伴将会被永久冻结账户，所有佣金一概不予发放。</p>
                    <p>2.若代理下线玩家当月活跃人数不足5人，佣金按照纯利润的10%累积在代理账号中，暂不发放，待达到5个活跃玩家之后，即可全部申请提现。</p>
                    <p>3.合作伙伴自身不能成为自身的下线会员。</p>
                    <p>4.同一姓名/同一收款账号/同一联系方式的会员只能是一个代理商的下线。</p>
                    <p>5.同一姓名/同一收款账号/同一联系方式/同一IP/同一邮箱的会员只能算作一个活跃下线。</p>
                    <p>6.凡代理商本人没有正确引导会员注册在其所属链接网址下而使其会员注册在澳门威尼斯人官网，我们概不负责。</p>
                    <p>7.澳门威尼斯人保留对以上条款的最终解释权和决定权。"</p>
                </div>
            </div>
            <div class="p-20" v-else>
                <div class="segment">
                    <h4>什么是代理联盟？</h4>
                    <p>"我们采用最为多元、 先进、公正的系统，在众多博彩网站中，我们自豪能为会员提供最优惠的回馈、为代理商创造强劲的营利优势! 澳门威尼斯人娱乐场秉持商业联营、资源整合、利益共享的理念，与合作伙伴携手打造利多的荣景。 无论您拥有的是网络资源，或是丰富的人脉，都欢迎您来加入我们的行列，不须负担任何费用， 就可以开拓无上限的营收。澳门威尼斯人娱乐场娱乐绝对是您最聪明的选择!"</p>
                </div>
                <div class="segment">
                    <h4>合作伙伴如何运作？</h4>
                    <p>成为澳门威尼斯人的合作伙伴后，提供专属的推广连接，多元化的图片供选择，为合作伙伴提供推广建议，达到双赢的效果。</p>
                </div>
                <div class="segment">
                    <h4>如何计算佣金？</h4>
                    <p>佣金按合作伙伴的下线会员所产生的纯利盈乘以当月佣金比例。</p>
                </div>
                <div class="segment">
                    <h4>如何查询下线会员的输赢情况？</h4>
                    <p>登入代理账号点击财务报表即可查询。</p>
                </div>
                <div class="segment">
                    <h4>如何收取佣金？</h4>
                    <p>月初佣金派发之后，代理自行核对佣金金额。核对无误，即可申请佣金提现。澳门威尼斯人娱乐场将在您提交佣金提现申请之后，两个工作日内为您支付佣金。</p>
                </div>
                <div class="segment" style="padding-bottom:0.4rem">
                    <h4>如果我忘记密码怎么办？</h4>
                    <p>请联系您的代理专员核对您的信息无误后立即为您修改。</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import Head from '@/components/Head.vue';

export default {
    data(){
        return{
            title:'代理',
            a:0,
            show:true
        }
    },
    mounted() {
        this.$route.query.sessionid ? this.show=false : this.show=true;
    },
    components:{
        Head,
    }
}
</script>

<style scoped lang="less">
.my-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
}
    .delegate{
        background-color: #000000;
        background-image: url('./img/daili_bg.png');
        background-size: 100%,20rem;
        padding-top:1.8rem;
    }
    .container{
        width: 100%;
    }
    .normal{
        background-color: #ffd954;
    }
    .segment{
        margin-top: 0.3rem;
    }
    h4{
        padding-left: 0.2rem;
        margin-top: 0.4rem;
        font-size: 0.5rem;
        color: @dele-color;
    }
    p{
        padding-left: 0.2rem;
        font-size: 0.32rem;
        color: #ffffff;
    }
    span{
        color: #e43434;
    }
    table{
        width: 96%;
        margin-left: 2%;
        border: '0';
        border-collapse: collapse;
    }
    td{
        color: #070e14;
    }
    .t_head{
        background-color: #e6a23c;
        font-size: 0.38rem;
        height: 1.2rem;
        text-align: center;
    }
    .t_row{
        background-color: #ffffff;
        font-size: 0.38rem;
        height: 1.2rem;
        text-align: center;
    }
    .p-20{
        padding:0 0.2rem 0.2rem 0.2rem;
    }
</style>
