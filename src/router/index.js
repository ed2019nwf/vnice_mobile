import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: relove => {
                return require(['@/page/index'], relove)
            },
            meta: {
                index: 1
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: relove => {
                return require(['@/page/register/register'], relove)
            },
            meta: {
                index: 3
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: relove => {
                return require(['@/page/login/login'], relove)
            },
            meta: {
                index: 2
            }
        },
        {
            path: '/service',
            name: 'Service',
            component: relove => {
                return require(['@/page/service/service'], relove)
            },
            meta: {
                index: 2
            }
        },
        {
            path: '/ptElc',
            component: relove => {
                return require(['@/page/ptElc/ptElc'], relove)
            },
            meta: {
                role: true,
                index: 2
            }
        },
        {
            path: '/discount',
            component: relove => {
                return require(['@/page/discount/discount'], relove)
            },
            meta: {
                index: 2
            }
        },
        {
            path: '/discountDetail',
            component: relove => {
                return require(['@/page/discount/discountDetail'], relove)
            },
            meta: {
                index: 3
            }
        },
        {
            path: '/center',
            component: relove => {
                return require(['@/page/center/center'], relove)
            },
            meta: {
                role: true,
                index: 1
            }
        },
        {
            path: '/blanceinfo',
            component: relove => {
                return require(['@/page/blanceinfo/blanceinfo'], relove)
            },
            meta: {
                index: 2
            }
        },
        {
            path: '/pay',
            component: relove => {
                return require(['@/page/pay/pay'], relove)
            },
            meta: {
                role: true,
                index: 2
            }
        },
        {
            path: '/bankcardset',
            component: relove => {
                return require(['@/page/bankcardset/bankcardset'], relove)
            },
            meta: {
                index: 2
            }
        },
        {
            path: '/addbank',
            component: relove => {
                return require(['@/page/takeout/addbank'], relove)
            },
            meta: {
                index: 3
            }
        },
        {
            path: '/takeout',
            component: relove => {
                return require(['@/page/takeout/takeout'], relove)
            },
            meta: {
                role: true,
                index: 2
            }
        },
        {
            path: '/transrecord',
            component: relove => {
                return require(['@/page/transrecord/transrecord'], relove)
            },
            meta: {
                index: 2
            }
        },
        {
            path: '/payoutrecordtable',
            component: relove => {
                return require(['@/page/payoutrecord/payoutrecordtable'], relove)
            },
            meta: {
                index: 3
            }
        },
        {
            path: '/limitrecordtable',
            component: relove => {
                return require(['@/page/limitrecord/limitrecordtable'], relove)
            },
            meta: {
                index: 3
            }
        },
        {
            path: '/discountrecordtable',
            component: relove => {
                return require(['@/page/discountrecord/discountrecordtable'], relove)
            },
            meta: {
                index: 3
            }
        },
        {
            path: '/message',
            component: relove => {
                return require(['@/page/message/message'], relove)
            },
            meta: {
                role: true,
                index: 2
            }
        },
        {
            path: '/personinfo',
            component: relove => {
                return require(['@/page/personinfo/personinfo'], relove)
            },
            meta: {
                index: 2
            }
        },
        {
            path: '/infobind',
            component: relove => {
                return require(['@/page/infobind/infobind'], relove)
            },
            meta: {
                index: 3
            }
        },
        {
            path: '/changepwd',
            component: relove => {
                return require(['@/page/changepwd/changepwd'], relove)
            },
            meta: {
                index: 3
            }
        },
        {
            path: '/vip',
            component: relove => {
                return require(['@/page/vip'], relove)
            },
            meta: {
                index: 2
            }
        },
        {
            path: '/forgetpwd',
            component: relove => {
                return require(['@/page/forgetpwd/forgetpwd'], relove)
            },
            meta: {
                index: 3
            }
        },
        {
            path: '/resetpwd',
            component: relove => {
                return require(['@/page/forgetpwd/resetpwd'], relove)
            },
            meta: {
                index: 2
            }
        },
        {
            path: '/notice',
            component: relove => {
                return require(['@/page/notice/notice'], relove)
            },
            meta: {
                index: 2
            }
        },
        {
            path: '/delegate',
            component: relove => {
                return require(['@/page/delegate/delegate'], relove)
            },
            meta: {
                index: 2
            }
        },
        {
            path: '/about',
            component: relove => {
                return require(['@/page/about'], relove)
            },
            meta: {
                index: 2
            }
        },
        {
            path: '/friend_recommendation',
            component: relove => {
                return require(['@/page/friend_recommendation'], relove)
            },
            meta: {
                role: true,
                index: 2
            }
        },
        {
            path: '/friend_recommendation_table',
            component: relove => {
                return require(['@/page/friend_recommendation/table'], relove)
            },
            meta: {
                role: true,
                index: 3
            }
        },
        {
            path: '/remit',
            component: relove => {
                return require(['@/page/remit/remit'], relove)
            },
            meta: {
                role: true,
                index: 2
            }
        }
    ],
    mode: 'history'
})