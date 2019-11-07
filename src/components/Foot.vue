<template>
      <tabbar class="my-footer tabbar" slot="bottom">
          <tabbar-item :selected="url==='/'" link="/">
            <img slot="icon" src="../assets/image/sy.png">
            <img slot="icon-active" src="../assets/image/sy2.png">
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item :selected="url==='/pay'" link="/pay">
            <img slot="icon" src="../assets/image/jc.png">
            <img slot="icon-active" src="../assets/image/jc2.png">
            <span slot="label">快充</span>
          </tabbar-item>
          <tabbar-item :selected="url==='/remit'" link="/remit">
            <img slot="icon" src="../assets/image/jc.png">
            <img slot="icon-active" src="../assets/image/jc2.png">
            <span slot="label">转账</span>
          </tabbar-item>
          <tabbar-item :selected="url==='/service'" link="/service">
            <img slot="icon" src="../assets/image/kf.png">
            <img slot="icon-active" src="../assets/image/kf2.png">
            <span slot="label">客服</span>
          </tabbar-item>
          <tabbar-item :selected="url==='/center'" link="/center">
            <img slot="icon" src="../assets/image/wd.png">
            <img slot="icon-active" src="../assets/image/wd2.png">
            <span slot="label">我的</span>
          </tabbar-item>
      </tabbar>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      url:this.$route.path
    }
  },
  watch:{
    $route(val){
      console.log(val);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.my-footer.tabbar{
    position: fixed;
    background: @footer-bg;
    height:@footer-h;
    align-items: center;
    padding:0.1rem 0;
}
.my-footer.tabbar .weui-tabbar__icon{
  width:1rem;
  height:1rem;
}
.my-footer.tabbar span{
  color:@footer-color;
  font-size: 14px;
}
.my-footer .weui-tabbar__item.weui-bar__item_on span{
  color:@footer-on-color;
}
.my-footer .weui-tabbar__item{
  padding:0;
}
.my-footer .weui-tabbar__label{
  line-height: 1;
  margin-top:3px;
}
</style>
