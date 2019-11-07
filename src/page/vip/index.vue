<!-- vip -->
<template>
    <div class="vip">

        <Head title="等级规则" v-if="show==true" type="backhd"></Head>
        <div class="vip-banner"><img src="./img/vip-bg.jpg" /></div>
        <ul class="vip-list">
            <li>
                <img src="./img/shenfen.png" alt="">
                <p>超级VIP尊贵身份</p>
            </li>
            <li>
                <img src="./img/tequan.png" alt="">
                <p>VIP等级特权</p>
            </li>
            <li>
                <img src="./img/kefu.png" alt="">
                <p>专属客服经理服务</p>
            </li>
            <li>
                <img src="./img/shancyn.png" alt="">
                <p>闪电存取款</p>
            </li>
            <li>
                <img src="./img/fanli.png" alt="">
                <p>优惠永久返利</p>
            </li>
            <li>
                <img src="./img/fanshui.png" alt="">
                <p>更高的时时返水</p>
            </li>
        </ul>
        <div class="vip-container">
            <h2>会员特权列表</h2>
            <ul class="vip-level">
                <li v-for="(item, index) in vipData" :key="index" @click="vipBtn =index">
                    <p :class="{'on':vipBtn===index}">{{item.title}}</p>
                </li>
            </ul>
            <ul class="vip-table">
                <li v-for="(item, index) in tableTitle" :key="index">
                    <h2>{{item}}</h2>
                    <p>{{vipSingleData[index]}}</p>
                </li>
            </ul>
        </div>
        <div class="vip-que">
            <h2>常见问题解答</h2>
            <h3>如何查询账号等级？</h3>
            <p>您登陆您的会员账号，进入会员中心页面，即可查询您的账号等级。</p>
            <p>(您的会员等级每周一会进行更新一次)</p>
            <p>举例: 会员每一笔电子游戏投注累计达到100万有效投注额即可获得等级一礼金200元，无周礼金，每月可获得80元月礼金；当累计到200万有效投注，即可再次获得升级礼金500元，每周可获得10元周礼金，每月可获得100元月礼金！
            </p>
            <h3 style="margin-top:.5rem">如何申请账号升级和返利礼金？</h3>
            <p>无需申请, 专员将在每个星期一23:59:59前派送完成, 因会员众多, 并非每个 会员都会及时到账, 若未及时到账请您耐心等待，彩金无需打码，可直接提款。
            </p>
            <p>举例：会员直接从等级2升级到到等级5，跨越3个等级，即可获得升级礼金 ：200（等级3）+500（等级4）+800（等级5）=1500元!
            </p>
        </div>
    </div>
</template>

<script>
var vipData = require("./vip.json");
export default {
    data() {
        return {
            show:true,
            vipData: vipData,
            vipBtn: 0,
            tableTitle: [
                "晋升等级",
                "累积投注",
                "等级礼金",
                "周返利",
                "月返利",
                "时时反水",
                "存取款加速",
                "客户经理"
            ]
        };
    },

    components: {
        Head: relove => {
            require(["@/components/Head"], relove);
        }
    },
    computed: {
        vipSingleData() {
            let arr = [];
            for (var item in this.vipData[this.vipBtn]) {
                arr.push(this.vipData[this.vipBtn][item]);
            }
            arr.shift();
            return arr;
        }
    },

    mounted() {
        this.$route.query.sessionid ? this.show=false : this.show=true;
    },

    methods: {}
};
</script>
<style scoped>
@import url(./index.css);
</style>