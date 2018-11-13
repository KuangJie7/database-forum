<template>
  <section id="threadlist">
    <section class="thread" @click="handleThread(thread)" v-for="thread in threadlistInfo" :key="thread.threadid">
      <span class="title">{{ thread.title }}</span>
      <span class="author">{{ thread.membername }}</span>
      <span class="time">{{thread.time}}</span>
      <section class="summary">{{ thread.summary }}</section>
    </section>
  </section>
</template>

<script>
import { getThread } from "@/api/section";

export default {
  name: "Threadlist",
  props: ["sid"],
  data() {
    return {
      threadlistInfo: []
    };
  },
  beforeMount() {
    getThread({ name: "sectionid", id: this.sid }).then(res => {
      this.threadlistInfo = res.data;
    });
  },
  methods: {
    handleThread(thread) {
      this.$store.commit("updateBread", {
        obj: {
          name: thread.title,
          path: `/section/${this.sid}/${thread.threadid}`
        },
        oparator: "forward"
      });
      this.$router.push(`/section/${this.sid}/${thread.threadid}`);
    }
  }
};
</script>

<style lang="less" scoped>
#threadlist {
  margin-top: 30px;
  box-shadow: 3px 5px 25px gray;
  .thread {
    height: 80px;
    position: relative;
    padding-top: 20px;
    padding-left: 20px;
    transition: all 0.3s ease;
    &:hover {
      background-color: darkgrey;
      cursor: pointer;
    }
    &:hover::after {
      content: "查看帖子";
      font-size: 14px;
      position: absolute;
      color: #ffffff;
      right: 150px;
      top: 30px;
    }
    .title {
      display: inline-block;
      margin-right: 20px;
      font-size: 18px;
      font-weight: bold;
    }
    .summary {
      font-size: 14px;
    }
    .author {
      display: inline-block;
      margin-right: 20px;
    }
  }
}
</style>
