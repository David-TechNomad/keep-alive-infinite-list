import Vue from "vue";
import VueRouter from "vue-router";
import { routes as topic } from "./module/topic/router";
import { PERMISSION_MAP, getPermissionByRole } from "./config/permission";
import store from "./store";
import { compose } from "./util/compose";

Vue.use(VueRouter);

const getRole = () => store.state.user.role;
const getPermission = (permission) =>
  compose((obj) => obj[permission], getPermissionByRole, getRole)();

export default new VueRouter({
  routes: [
    ...topic,
    {
      name: "about",
      path: "/about",
      component: () => import("./views/UAbout.vue"),
      beforeEnter(to, from, next) {
        getPermission(PERMISSION_MAP.ABOUT_PAGE) ? next() : next("403");
      },
    },
    {
      name: "403",
      path: "/403",
      component: () => import("./views/403.vue"),
    },
    {
      path: "/",
      redirect: "/hot",
    },
  ],
});
