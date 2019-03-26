<template>
  <div>
    <Layout class="container">
      <Header class="header">
        <title style="color:white">地图集群服务系统</title>
        <Dropdown @on-click="logout">
          <a href="javascript:void(0)" style="color:#fff">
            <Icon type="ios-contact" />
            <span>{{username}}</span>
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>
              登出
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Header>
      <Layout class="main">
        <Navbar/>
        <Layout style=" padding: 48px 64px;">
          <router-view/>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import AuthenticationService from "../services/AuthenticationService.js";
import Navbar from "./Navbar.vue";
export default {
  name: "app",
  components: {
    Navbar
  },
  computed: {
    username: function() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      console.log("logout");
      // AuthenticationService.logout();
      window.location = "http://192.168.15.158:8099/mapproxy/sooLogin/logout";
      this.$router.push({ name: "index" });
      this.$store.dispatch("setUser", null);
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 100vh;
  .header {
    display: flex;
    justify-content: space-between;
    title {
      display: block;
      color: white;
      font-size: 1.3rem;
      font-weight: bold;
      text-align: left;
    }
    div {
      color: white;
      font-size: 1rem;
      font-weight: bold;
    }
  }
  .main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
  }
}
</style>
