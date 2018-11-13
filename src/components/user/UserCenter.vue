<template>
  <section id="user-center">
      <section class="info">
        <section class="avatar">
          <Avatar shape="circle" icon="ios-person" size="large" />
        </section>
        <section class="name">{{ this.user.membername }}</section>
        <section class="intro">{{ this.user.memberinfo }}</section>
      </section>
      <section 0>、

      </section>
  </section>
</template>

<script>
export default {
  name: "UserCenter",
  props: ["mid"],
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="less" scoped>
#user-center {
  width: 1000px;
  margin: 0 auto;
  .info {
    width: 250px;
    height: 250px;
    box-shadow: 3px 5px 30px gray;
    text-align: center;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    .name {
      font-size: 20px;
      font-weight: bold;
      margin-top: 10px;
    }
    .intro {
      font-size: 12px;
    }
  }
}
.ivu-avatar-large {
  width: 80px;
  height: 80px;
  line-height: 40px;
  border-radius: 40px;
  padding-top: 10px;
}
.ivu-avatar-large.ivu-avatar-icon {
  font-size: 80px;
}
</style>
