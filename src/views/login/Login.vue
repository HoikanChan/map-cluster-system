<template>
  <div class="container" @keyup.enter="submitForm('loginForm')">
    <Row type="flex" justify="center" class="banner">
      <div>
        <h3>地图集群服务系统</h3>
      </div>
    </Row>
    <Row class="row-bg" type="flex" justify="center" align="middle">
      <Form :model="loginForm" :rules="rules" ref="loginForm" class="ruleForm" :label-width="80">
        <Row>
          <FormItem prop="userName" label="用户名">
            <Input v-model="loginForm.userName" placeholder="用户名" size="large">
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem prop="password" label="密码">
            <Input type="password" v-model="loginForm.password" placeholder="密码" size="large">
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem>
            <Button type="primary" @click.prevent="submitForm('loginForm')" long style="font-weight:1.2" :loading="loading">
              <span v-if="!loading">登录</span>
              <span v-else>登陆中...</span>
            </Button>
          </FormItem>
        </Row>
      </Form>
    </Row>
  </div>
</template>
<script>
import AuthenticationService from "../../services/AuthenticationService.js";
export default {
  name: "",
  data() {
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      loading: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.loading = true;
      const form = { ...this.loginForm };
      form.domain = "/" + this.loginForm.domain;
      //表单验证
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const loginResult = (await AuthenticationService.login(
            this.loginForm
          )).data;
          this.$store;
          if (loginResult.code === "1") {
            this.$router.push({ name: "nodes" });
            this.$store.dispatch("setUser", this.loginForm.userName);
          } else if (loginResult.code === "0") {
            this.$Notice.error({
              title: "错误",
              desc: `登录失败${loginResult.code}`,
              duration: 5
            });
          }
          this.loading = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.ruleForm {
  width: 340px;
  margin-top: 80px;
}
.banner {
  height: 320px;
  background-image: url("../../assets/login_bg.png");
  width: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 2.5rem;
    color: white;
    font-weight: bold;
    text-shadow: #333 0.1em 0.1em 0.2em;
    letter-spacing: 2px;
  }
}
</style>
