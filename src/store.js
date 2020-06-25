import Vue from "vue";
import Vuex from "vuex";
import { store as topic } from "./module/topic/store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      role: "CEO",
    },
  },
  modules: {
    topic,
  },
});
