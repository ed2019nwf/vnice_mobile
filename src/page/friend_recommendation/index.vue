<!-- 推荐好友 -->
<template>
  <div>
    <Head title="推荐好友" type="backhd"></Head>
    <div class="f-serch">
      <group class="f-tjcode">推荐码：
        <span class="f-codenum">{{code}}</span>
        <sub></sub>
      </group>
      <group title="(请您在或有注册时协助好友填写推荐码)" class="f-input">
        <datetime v-model="startTime" title="开始时间："></datetime>
      </group>
      <group class="f-input">
        <datetime v-model="endTime" title="结束时间："></datetime>
      </group>
      <group class="f-input">
        <x-input title="用户名：" v-model="username"></x-input>
      </group>
      <div class="h40"></div>
      <div class="pay-go">
          <span @click="search">搜索</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            code: "",
            startTime: "",
            endTime:'',
            username:''
        };
    },

    components: {
        Head: relove => {
            require(["@/components/Head"], relove);
        }
    },

    computed: {},

    mounted() {
        this.getFriendCode();
    },

    methods: {
        getFriendCode() {
            this.$http
                .post("/ext/tj_code.do", { tj_code: true })
                .then(data => {
                    if (data.data.Status === 200) {
                        this.code = data.data.Data.tj_code;
                    }
                });
        },
        search() {
            this.$router.push({
                path: "/friend_recommendation_table",
                query: {
                    startTime: this.startTime,
                    endTime:this.endTime,
                    userName:this.username
                }
            });
        }
    }
};
</script>
<style lang="less">
@import url(./index.less);
</style>