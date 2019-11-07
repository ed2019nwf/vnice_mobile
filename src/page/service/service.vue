<template>
    <div class="serwrap">
        <Head title="客服" type="backhd"></Head>
        <div class="service">
            <iframe src="https://kf1.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=995953&configID=75016&jid=3866497063&s=1"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        };
    },

    components: {
        Head: relove => {
            return require(["@/components/Head"], relove);
        }
    },

    computed: {},

    mounted() {},

    methods: {}
};
</script>
<style scoped>
.serwrap{
}
.service{
    background: #ffffff;
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: -1rem;
}
.service iframe{
    width: 100%;
    height: 100%;
    border: 0;
}
</style>