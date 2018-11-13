<template>
  <section id="thread">
    <header class="head">标题：{{ this.title }}</header>
    <section class="thread" v-for="reply in threadInfo.reply" :key="reply.replyid">
      <section class="author-box">
        <section class="avatar">
          <Avatar shape="square" icon="ios-person" size="large" />
        </section>
        <p class="author">{{ reply.ownerinfo.ownername }}</p>
        <span class="time">{{reply.time}}</span>
      </section>
      <span class="content">{{ reply.content }}</span>
      <span class="floor">{{ reply.floor + 1 }}L</span>
    </section>
    <section class="reply-text">
      <Form ref="reply" :model="formItem" :label-width="80">
        <FormItem prop="reply">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入您的回复" />
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('reply')">回复</Button>
        </FormItem>
      </Form>
    </section>
  </section>
</template>

<script>
import { getThread, addReply } from "@/api/section";
import { Avatar, Form, FormItem, Message } from "iview";
import Vue from "vue";
Vue.prototype.$Message = Message;

export default {
  name: "Thread",
  props: ["sid", "tid"],
  components: {
    Avatar,
    Form,
    FormItem
  },
  data() {
    return {
      threadInfo: {
        threadinfo: {
          title: ""
        }
      },
      formItem: {
        textarea: ""
      }
    };
  },
  computed:{
    title(){
      return this.threadInfo.threadinfo.title || '';
    }
  },
  beforeMount() {
    getThread({ name: "threadid", id: this.tid }).then(res => {
      this.threadInfo = res.data;
    });
  },
  methods: {
    handleSubmit(name) {
      if (this.formItem.textarea) {
        const data = {};
        data.sectionid = this.sid;
        data.threadid = this.tid;
        data.memberid = this.$store.state.user.memberid;
        data.content = this.formItem.textarea;
        console.log("handle");
        addReply(data).then(ares => {
          console.log("addReply");
          if (ares.status === 200) {
            getThread({ name: "threadid", id: this.tid }).then(res => {
              console.log("getThread", res);
              this.$Message.success("回复成功");
              this.threadInfo = res.data;
              this.formItem.textarea = "";
            });
          } else {
            this.$Message.error("回复失败");
          }
        });
      }else{
        this.$Message.error("回复不能为空")
      }
    }
  }
};
</script>

<style lang="less" scoped>
#thread {
  margin-top: 30px;
  box-shadow: 3px 5px 25px gray;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 50px;
  .head {
    font-size: 20px;
    font-weight: bold;
  }
  .thread {
    margin-top: 20px;
    padding-left: 20px;
    height: 150px;
    position: relative;
    display: flex;
    align-items: center;
    .content {
      display: inline-block;
      font-size: 16px;
    }
    .author-box {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 200px;
      .author {
        margin-top: 20px;
      }
    }
    .floor {
      font-size: 16px;
      position: absolute;
      left: 220px;
      bottom: 100px;
    }
  }
  .reply-text {
    width: 800px;
    margin-top: 50px;
    text-align: center;
  }
}
</style>
