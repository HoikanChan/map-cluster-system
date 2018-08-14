<template>
  <div>
    <Layout class="container">
      <Header>
        <title style="color:white">地图集群服务系统</title>
      </Header>
      <Layout class="main">
        <Navbar/>
        <Layout>
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
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 100vh;
  title {
    display: block;
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    text-align: left;
  }
  .main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
  }
}
</style>
