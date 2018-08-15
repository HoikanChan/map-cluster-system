import Vue from "vue";
import Router from "vue-router";
import store from "../store/store";
Vue.use(Router);
export default new Router({
  // mode: "history",
  mode: "history",
  // base: process.env.BASE_URL,
  base: "/mapproxyView",
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
          meta: { activeName: "nodes" },
          component: () => import("@/views/serviceNodes/ServiceNodes.vue"),
          beforeEnter: (to, from, next) => {
            if (store.state.user) {
              next();
            } else {
              next({ name: "login" });
            }
          }
        },
        {
          path: "logs",
          name: "logs",
          meta: { activeName: "logs" },
          component: () => import("@/views/runLogs/RunLogs.vue"),
          beforeEnter: (to, from, next) => {
            if (store.state.user) {
              next();
            } else {
              next({ name: "login" });
            }
          }
        },
        {
          path: "configs",
          name: "configs",
          meta: { activeName: "configs" },
          component: {
            render(h) {
              return <router-view />;
            }
          },
          beforeEnter: (to, from, next) => {
            if (store.state.user) {
              next();
            } else {
              next({ name: "login" });
            }
          },
          children: [
            {
              path: "",
              name: "configs",
              meta: { activeName: "configs" },
              component: () => import("@/views/configFiles/ConfigFiles.vue")
            }
          ]
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
