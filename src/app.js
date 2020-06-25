import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import intersect from "./directive/intersect";

import { init as themeInit } from "./config/theme";
import { init as permissionInit } from "./config/permission";

Vue.directive("intersect", intersect);

themeInit();
permissionInit();

const app = new Vue({
  store,
  router,
  render: (h) => h(App),
});

app.$mount("#app");
