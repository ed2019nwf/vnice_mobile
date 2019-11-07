// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/assets/js/flex'
import '@/assets/css/common.css'
import Qs from 'qs'
import axios from 'axios'
import VueAxios from 'vue-axios';
import VueClipboard from 'vue-clipboard2'
import animate from 'animate.css'
import {
    XButton,
    XHeader,
    Tabbar,
    TabbarItem,
    Toast,
    ToastPlugin,
    Swiper,
    SwiperItem,
    Tab,
    TabItem,
    Loading,
    LoadingPlugin,
    AjaxPlugin,
    Flexbox,
    FlexboxItem,
    Badge,
    XInput,
    XDialog,
    TransferDom,
    Popup,
    PopupHeader,
    Group,
    Radio,
    XTable,
    Datetime,
    PopupPicker,
    PopupRadio,
    Marquee,
    MarqueeItem,
    Cell,
    XSwitch
} from 'vux'
Vue.component('x-button', XButton)
Vue.component('x-table', XTable)
Vue.component('x-input', XInput)
Vue.component('badge', Badge)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('x-header', XHeader)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('toast', Toast)
Vue.component('swiper', Swiper)
Vue.component('swiper-item', SwiperItem)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('loading', Loading)
Vue.component('x-dialog', XDialog)
Vue.component('popup-header', PopupHeader)
Vue.component('popup', Popup)
Vue.component('group', Group)
Vue.component('radio', Radio)
Vue.component('popup-picker', PopupPicker)
Vue.component('popup-radio', PopupRadio)
Vue.directive('transfer-dom', TransferDom)
Vue.component('marquee', Marquee)
Vue.component('marquee-item', MarqueeItem)
Vue.component('cell', Cell)
Vue.component('x-switch', XSwitch)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.component('datetime', Datetime)
Vue.component('x-table', XTable)

// Vue.use(AjaxPlugin)

Vue.use(VueClipboard);

Vue.config.productionTip = false
    // 接口配置
window.WEB_API = process.env.NODE_ENV === 'production' ? '' : '/api';
var axios_instance = axios.create({
        baseURL: WEB_API || '',
        transformRequest: [function(data) {
            data = Qs.stringify(data);
            return data;
        }],
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    // 接口数据请求前
axios_instance.interceptors.request.use(request => {
        Vue.$vux.loading.show();
        return request;
    })
    // 接口数据返回后
axios_instance.interceptors.response.use(response => {
    Vue.$vux.loading.hide();
    if (response.data.Status === 600) {
        store.commit('DEL_USERINFO');
        Vue.$vux.toast.text("登录超时", "middle");
        router.push('/');
    }
    return response;
})
Vue.use(VueAxios, axios_instance)
    // 全局钩子，登录拦截
router.beforeEach((to, from, next) => {
    if (!sessionStorage.getItem('vns_info') && to.meta.role) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
})

// 全局自定义公用方法
Vue.prototype.$islogin = function() {
    if (this.$store.state.user_info) {
        this.$store.dispatch('showAllMessageGo');
        this.$store.dispatch('showBrance');
    }
}

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})