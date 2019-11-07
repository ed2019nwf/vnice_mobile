<template>
    <div class="noticewrap">
        <Head :title="title" type="backhd"></Head>
        <ul>
            <li v-for="item in noticelist">
                <h3>{{item.title}}</h3>
                <p>{{item.content}}</p>
                <span>{{item.c_date}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import Head from "@/components/Head";
export default {
  data() {
    return {
      title: "公告",
      noticelist:[]
    };
  },
  mounted() {
      this.getNotice();
  },
  methods: {
    //   获取公告
    getNotice(){
        this.$http.post('/public/notice.do').then(e=>{
            if(e.data.Status==200){
              this.noticelist = e.data.Data.notice;
            }
        })
    }
  },
  components: {
    Head
  }
}
</script>

<style scoped lang="less">
.noticewrap {
  background: #f0e9df;
  padding-top:53px;
}
.noticewrap ul {
    padding: 0.4rem 0.25rem;
}
.noticewrap ul li{
    background: #fff;
    padding:0.4rem;
    margin-bottom:0.2rem;
    border-radius:6px;
    font-size: 0.36rem;
    color:#333;
}
.noticewrap ul li h3{
    font-size: 0.48rem;
    color:@notic-color;
    font-weight: normal;
    margin-bottom:0.2rem;
}
.noticewrap ul li span{
    display: block;
    font-size: 0.32rem;
    color:#999;
    margin-top:0.4rem;
}
.my-header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
}
</style>