<template>
    <div class="messagewrap">
         <Head :title="title" type="backhd"></Head>
         <!-- Tab -->
         <div class="nothing" v-if="msglist.length==0">
              <span>什么都木有哦</span>
              <span>=￣ω￣=</span>
         </div>
         <div v-else>
            <tab :line-width=2 active-color='@tab-bar-active-color' v-model="index">
                <tab-item class="vux-center" v-for="(item, index) in tabtit" @on-item-click="demo = index" :key="index">{{item}}</tab-item>
            </tab>
            <div class="my-tab-main">
                <!-- 全部信件 -->
                <div class="tab-swiper vux-center" v-if="demo == 0">
                    <ul class="my-tab-ul">
                        <li v-for="item in msglist" @click="openMsg(item)">
                            <span>{{item.title}}</span>
                            <div>
                                <span class="my-tab-time">{{item.s_date}}</span>
                                <x-icon type="ios-arrow-right" size="15" class="my-tab-icon"></x-icon>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 未读信件 -->
                <div class="tab-swiper vux-center" v-if="demo == 1">
                    <ul class="my-tab-ul">
                        <li v-for="item in noRead" @click="openMsg(item)">
                            <span><badge style="margin-right:5px;" badge-bg-color="#000"></badge>{{item.title}}</span>
                            <div>
                                <span class="my-tab-time">{{item.s_date}}</span>
                                <x-icon type="ios-arrow-right" size="15" class="my-tab-icon"></x-icon>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 已读信件 -->
                <div class="tab-swiper vux-center" v-if="demo == 2">
                    <ul class="my-tab-ul">
                        <li v-for="item in yesRead" @click="openMsg(item)">
                            <span>{{item.title}}</span>
                            <div>
                                <span class="my-tab-time">{{item.s_date}}</span>
                                <x-icon type="ios-arrow-right" size="15" class="my-tab-icon"></x-icon>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 内容详情框 -->
                <div v-transfer-dom>
                    <x-dialog v-model="show" class="dialog-demo" style="padding:0.4rem;">
                        <div class="my-dialog">
                            <div class="img-box">
                                {{msg.content}}
                            </div>
                            <div class="my-btn-group">
                                <div class="my-btn btn-warn" @click="delMsg()">删除</div>
                                <div @click="show = false" class="my-btn btn-primary">确定</div>
                            </div>
                        </div>
                    </x-dialog>
                </div>
            </div>
         </div>
    </div>
</template>

<script>
import Head from "@/components/Head";
const list = () => ["全部", "未读", "已读"];
export default {
  data() {
    return {
      title: "站内信",
      tabtit: list(),
      demo: 0,
      index: 0,
      msglist: [],
      show: false,
      msg: "",
      content: ""
    };
  },
  mounted() {
    this.showAllMessage(1, 100);
  },
  components: {
    Head
  },
  computed: {
    // 未读信息
    noRead() {
      var arr = [];
      this.msglist.map(data => {
        if (data.u_status === "1") {
          arr.push(data);
        }
      });
      return arr;
    },
    // 已读信息
    yesRead() {
      var arr = [];
      this.msglist.map(data => {
        if (data.u_status === "2") {
          arr.push(data);
        }
      });
      return arr;
    }
  },
  methods: {
    // 显示全部站内信
    showAllMessage(page, rows, status) {
      var data = { page: page, rows: rows, status: status };
      this.$http.post("/cms/msg_user_list.do", data).then(e => {
        if (e.data.Status == 200) {
          this.msglist = e.data.Data.msg_list;
        }
      });
    },
    // 显示详情,如果是未读，改变状态为已读
    openMsg(msg) {
      this.show = true;
      this.msg = msg;
      if (msg.u_status === "2") {
        return false;
      }
      this.$http
        .post("/cms/msg_user_edit.do", {
          msg_edit: msg.u_id + "_2"
        })
        .then(data => {
          if (data.data.Status === 200) {
            this.msglist.map(data => {
              if (data.u_id === msg.u_id) {
                data.u_status = "2";
              }
            });
          }
        });
    },
    delMsg(){
        this.$http
                .post("/cms/msg_user_edit.do", {
                    msg_edit: this.msg.u_id + "_3"
                })
                .then(data => {
                    if (data.data.Status === 200) {
                        this.$vux.toast.text("删除成功");
                        this.msglist = this.msglist.filter(data => {
                            return data.u_id != this.msg.u_id;
                        });
                        this.msg = '';
                        this.show = false;
                    } else {
                        this.$vux.toast.text(data.data.Msg);
                    }
                });
    }
  }
};
</script>

<style scoped>
@import url(./message.css);
</style>