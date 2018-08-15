<template>
  <div>
    <Layout class="container">
      <Header class="header">
        <title style="color:white">地图集群服务系统</title>
        <div>
          <Icon type="ios-contact" />
          <span>{{username}}</span>
        </div>
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
import Navbar from "./Navbar.vue";
export default {
  components: {
    Navbar
  },
  computed: {
    username: function() {
      console.log(this.$store);
      return this.$store.state.user;
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
