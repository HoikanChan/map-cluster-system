<template>
  <div class="container" @keyup.enter="submitForm('loginForm')">
    <Row class="row-bg" type="flex" justify="center" align="middle">
      <Form :model="loginForm" :rules="rules" ref="loginForm" class="ruleForm">
        <Row type="flex" justify="center">
          <h3>遥感云系统</h3>
        </Row>
        <Row>
          <FormItem prop="username">
            <Input v-model="loginForm.username" placeholder="用户名" size="large">
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem prop="password">
            <Input type="password" v-model="loginForm.password" placeholder="密码" size="large">
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem>
            <Input v-model="loginForm.domain" placeholder="域" size="large">
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem>
            <Button type="success" @click.prevent="submitForm('loginForm')" long style="font-weight:1.2" :loading="loading">
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
        username: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [
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
          const loginResult = await AuthenticationService.login(this.loginForm);
          if (loginResult.code === 1) {
            this.$router.push({ path: "/" });
          } else {
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
