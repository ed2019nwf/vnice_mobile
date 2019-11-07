<!-- 关于我们 -->
<template>
    <div class="about">
        <Head title="关于我们" type="backhd"></Head>
        <div class="about-logo"><img src="../../../static/img/logo.png" /></div>
        <div class="about-item">
            <div class="about-left email">Email：</div>
            <div class="about-right">
                <p>{{email}}</p>
            </div>
            <a v-clipboard:copy="email" v-clipboard:success="onCopy" v-clipboard:error="onCopyError">复制</a>
        </div>
        <div class="about-item">
            <div class="about-left qq">QQ：</div>
            <div class="about-right">
                <p>{{qq}}</p>
            </div>
            <a v-clipboard:copy="qq" v-clipboard:success="onCopy" v-clipboard:error="onCopyError">复制</a>
        </div>
        <div class="about-item">
            <div class="about-left wechat">微信：</div>
            <div class="about-right">
                <p>{{wechat}}</p>
            </div>
            <a v-clipboard:copy="qq" v-clipboard:success="onCopy" v-clipboard:error="onCopyError">复制</a>
        </div>
        <div class="about-item kefu">
            <div class="about-left kf">客服：</div>
            <a href="https://kf1.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=995953&configID=75016&jid=3866497063&s=1">在线客服(7×24小时)</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "SunCity@gmail.com",
            qq: "88888888",
            wechat:'wx888888'
        };
    },

    components: {
        Head: relove => {
            require(["@/components/Head"], relove);
        }
    },

    computed: {},

    mounted() {},

    methods: {
        onCopy() {
            this.$vux.toast.text("复制成功");
        },
        onCopyError() {
            this.$vux.toast.text("复制失败");
        }
    }
};
</script>
<style>
@import url(./index.css);
</style>