import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import http from "./utills/http";

Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
