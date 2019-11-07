<template>
    <div class="diswrap">
         <Head title="优惠详情" v-if="!$route.query.sessionid" type="backhd"></Head>
         <div class="content" v-for="(item,key) in list" :key="key" v-if="$route.query.id === item.id" v-html="item.content"></div>
    </div>
</template>

<script>
import Head from "@/components/Head";
export default {
  data() {
    return {
      list: ""
    };
  },
  mounted() {
    this.showContent();
  },
  methods: {
    showContent() {
      if (window.activelist) {
        this.list = window.activelist;
      } else {
        this.$http
          .post("/public/active_list.do", { is_list: "1", is_info: "1" })
          .then(e => {
              if(e.data.Status == 200){
                  this.list = e.data.Data.active_list;
              }
          });
      }
    }
  },
  components: {
    Head
  }
};
</script>

<style scoped>
.diswrap{
  padding-top:1.8rem;
}
.content {
  padding: 10px 10px 60px 10px;
}
.my-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
}
</style>