<template>
  <Menu theme="dark" class="menu" :open-names="['1']" :active-name="activeName">
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-settings" /> 地图集群配置
      </template>
      <MenuItem v-for="nav in navs " :key="nav.name" :name="nav.name" :to="nav.to">{{nav.title}}</MenuItem>
    </Submenu>
  </Menu>
</template>
<script>
export default {
  data() {
    return {
      activeName: "nodes",
      navs: [
        {
          name: "nodes",
          to: "/nodes",
          title: "服务节点"
        },
        {
          name: "configs",
          to: "/configs",
          title: "配置文件"
        },
        {
          name: "logs",
          to: "/logs",
          title: "运行日志"
        }
      ]
    };
  },
  watch: {
    $route: function(val) {
      this.activeName = val.name;
    }
  },
  mounted(){
      this.activeName = this.$route.name;
  }
};
</script>
<style lang="less" scoped>
.menu {
  margin: 0 auto;
}
</style>
