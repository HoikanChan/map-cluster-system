import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/index.vue"),
      redirect: { name: "nodes" },
      children: [
        {
          path: "nodes",
          name: "nodes",
          component: () => import("@/views/serviceNodes/ServiceNodes.vue")
        },
        {
          path: "logs",
          name: "logs",
          component: () => import("@/views/runLogs/RunLogs.vue")
        },
        {
          path: "configs",
          name: "configs",
          component: () => import("@/views/configFiles/ConfigFiles.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/Login")
    }
  ]
});
