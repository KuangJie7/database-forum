<template>
<section id="content">
  <header class="welcome" title="进入个人中心" @click="handleUsercenter()">
      <section class="avatar">
          <Avatar shape="square" icon="ios-person" size="large" />
      </section>
      <section class="info">
        <p>{{ userInfo.membername }}</p>
        <p class="description">{{ userInfo.memberinfo }}</p>
      </section>
  </header>
  <Breadcrumb> 
    <BreadcrumbItem v-for="bread in breadArr" :to="bread.path" :key="bread.name">{{ bread.name }}</BreadcrumbItem>
  </Breadcrumb>
  <router-view></router-view>
</section>

</template>

<script>
import { getUserInfo } from "@/api/user";
import { Breadcrumb, BreadcrumbItem } from "iview";

export default {
  name: "Content",
  components: {
    Breadcrumb,
    BreadcrumbItem
  },
  computed: {
    userInfo() {
      let info = {};
      const userInfo = this.$store.state.user;
      if (Object.values(userInfo).length !== 0) {
        info = userInfo;
      } else {
        info = JSON.parse(localStorage.getItem("forum_user"));
        getUserInfo(info.id).then(res => {
          if (res.status === 200) {
            const user = Object.assign(res.data, {
              memberid: info.id
            });
            this.$store.commit("updateUser", user);
          }
        });
      }
      return info;
    },
    breadArr() {
      return this.$store.state.breadArr;
    }
  },
  watch: {
    $route() {
      const routeLen = this.$route.path.split("/").length - 1 || 1;
      const storeLen = this.$store.state.breadArr.length || 1;
      if (routeLen < storeLen) {
        this.$store.commit("updateBread", {
          obj: { length: routeLen },
          oparator: "back"
        });
      }
    }
  },
  methods:{
    handleUsercenter(){
      this.$router.push("/usercenter/"+this.$store.state.user.memberid);
    }
  }
};
</script>

<style lang="less" scoped>
#content {
  width: 1000px;
  margin: 0 auto;
  .welcome {
    width: inherit;
    height: 100px;
    box-shadow: 3px 5px 25px gray;
    display: flex;
    align-items: center;
    transition: all 0.5s ease;
    margin-bottom: 20px;
    .avatar {
      margin-left: 20px;
      margin-right: 20px;
      display: inline-block;
    }
    .info {
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      .description {
        font-size: 12px;
        font-weight: 100;
      }
    }
    &:hover {
      box-shadow: 3px 8px 30px rgb(66, 62, 62);
      cursor: pointer;
    }
  }
}
</style>
