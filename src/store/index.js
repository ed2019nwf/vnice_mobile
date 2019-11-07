import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        msg_obj: [],
        brance: '',
        user_info: window.sessionStorage.vns_info ? JSON.parse(window.sessionStorage.vns_info) : null,
        loginWaitStatus: false
    },
    getters: {
        // 新消息条目
        mesNo: state => {
            return state.msg_obj.filter(val => val.u_status == 1).length;
        },
        // 获取用户名
        userId: state => {
            if (state.user_info) {
                return state.user_info.username.substring(2);
            }
        }
    },
    mutations: {
        'SHOW_ALL_MESSAGE' (state, list) {
            state.msg_obj = list;
        },
        'SET_USERINFO' (state, user) {
            state.user_info = user;
            window.sessionStorage.vns_info = JSON.stringify(user);
            state.loginWaitStatus = true;
        },
        'DEL_USERINFO' (state) {
            state.user_info = null;
            window.sessionStorage.clear();
            state.loginWaitStatus = false;
        },
        'GET_BRANCE' (state, money) {
            state.brance = money;
        }
    },
    actions: {
        // 登录
        loginGo({ commit, dispatch }, form) {
            var parms = {
                username: form.username,
                password: form.password,
                iscaptcha: "1"
            }
            Vue.axios.post("/public/login.do", parms).then(e => {
                if (e.data.Status === 200) {
                    dispatch('getUserInfo');
                }
            });
        },
        // 获取用户信息
        getUserInfo({ commit }) {
            Vue.axios.post("/user/info.do").then(e => {
                if (e.data.Status === 200) {
                    commit('SET_USERINFO', e.data.Data.user_info);

                }
            });
        },
        // 站内信
        showAllMessageGo({ commit }) {
            Vue.axios.post("/cms/msg_user_list.do", { page: 1, rows: 100 }).then(e => {
                if (e.data.Status == 200) {
                    commit('SHOW_ALL_MESSAGE', e.data.Data.msg_list);
                }
            });
        },
        // 退出
        exitGo({ commit }) {
            Vue.axios.post("/user/logout.do").then(e => {
                if (e.data.Status == 200) {
                    commit('DEL_USERINFO');

                }
            })
        },
        // 获取余额
        showBrance({ commit }) {
            Vue.axios.post("/user/show_cash_fast.do").then(e => {
                if (e.data.Status == 200) {
                    commit('GET_BRANCE', e.data.Data.cash)
                }
            });
        }
    }
})