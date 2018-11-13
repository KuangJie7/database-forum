<template>
    <section id="login">
        <section class="login-form">
            <h1>登录</h1>
            <section class="form">
                <Form ref="login" :model="loginForm" :rules="loginRules">
                    <FormItem prop="userName">
                        <Input v-model="loginForm.userName" type="text" placeholder="user">
                          <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input v-model="loginForm.password" type="password" placeholder="password">
                          <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Form>
                <Button class="login-btn" type="primary" @click="handleLogin('login')">
                        登录
                </Button>
                <Button type="default" @click="handleRegister">
                        注册
                </Button>
            </section>
        </section>
    </section>
</template>
<script>
import { Form, FormItem, Input, Button, Message } from "iview";
import Vue from "vue";
import { login, getUserInfo } from "@/api/user";

Vue.prototype.$Message = Message;

export default {
  name: "Login",
  components: {
    Form,
    FormItem,
    Input,
    Button
  },
  data() {
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      loginRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleLogin(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 登录验证成功
          login({
            userName: this.loginForm.userName,
            password: this.loginForm.password
          }).then(res => {
            if (res.status === 200) {
              this.$Message.success("登录成功");
              getUserInfo(res.data.memberid).then(ires => {
                if (ires.status === 200) {
                  const user = Object.assign(ires.data, {memberid: res.data.memberid});
                  this.$store.commit("updateUser", user);
                  localStorage.setItem(
                    "forum_user",
                    JSON.stringify({ id: res.data.memberid })
                  );
                  this.$router.push("/section");
                }
              });
            }
          });
        }
      });
    },
    handleRegister() {
      this.$router.push("/register");
    }
  }
};
</script>
<style lang="less" scoped>
#login {
  .login-form {
    width: 350px;
    margin: 0 auto;
    text-align: center;
    .form {
      margin-top: 30px;
      width: 100%;
    }
  }
  .login-btn {
    margin-right: 20px;
  }
}
</style>
