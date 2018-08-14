import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/store";
import "iview/dist/styles/iview.css";
import iView from "iview";

Vue.config.productionTip = false;
Vue.use(iView);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
