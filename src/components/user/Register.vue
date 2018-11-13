<template>
    <section id="login">
        <section class="login-form">
            <section class="title">
                <h1>注册</h1>
            </section>
            <section class="form">
                <Form ref="register" :model="registerForm" :rules="loginRules">
                    <FormItem prop="userName">
                        <Input class="username" v-model="registerForm.userName" type="text" placeholder="user">
                          <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input v-model="registerForm.password" type="password" placeholder="password">
                          <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Form>
                <Button class="login-btn" type="primary" @click="handleRegister('register')">
                        注册
                </Button>
                <Button type="default" @click="handleLogin">
                        返回登录
                </Button>
            </section>
        </section>
    </section>
</template>
<script>
import { Form, FormItem, Input, Button, Message } from "iview";
import { register, getUserInfo } from "@/api/user";
import Vue from "vue";

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
      registerForm: {
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
    handleRegister(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 注册验证成功
          register({
            userName: this.registerForm.userName,
            password: this.registerForm.password
          }).then(res => {
            if (res.status === 200) {
              this.$Message.success("注册成功，已自动登录");
              getUserInfo(res.data.memberid).then(rres => {
                if (rres.status === 200) {
                  const user = Object.assign(rres.data, {
                    memberid: res.data.memberid
                  });
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
    handleLogin() {
      this.$router.push("/login");
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
