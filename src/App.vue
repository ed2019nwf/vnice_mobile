<template>
  <div id="app">
    <transition :name="transitionName">
        <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
     return{
       transitionName:''
     }
  },
  watch: {
  '$route' (to, from) {
    const toIndex = to.meta.index
    const fromIndex = from.meta.index
    this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
  }
}
}
</script>

<style lang="less">
.pay-go span{
      background: @color;
}
.mask{
      width:100%;
      height:100%;
      background: rgba(0,0,0,.7);
      position: fixed;
      top:0;
      left:0;
      bottom: 0;
      z-index: 501;
  }
</style>

<style lang="less" scoped>
@import '~vux/src/styles/close.less';
// 页面切换过渡效果
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  width:100%;
  left:0;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
