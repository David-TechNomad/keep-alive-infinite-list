import { fetchItems } from "./api/api";

export const LIST_TYPE = {
  TOP: "top",
  HOT: "hot",
  NEW: "new",
};

export const store = {
  namespaced: true,
  state: {
    activeType: LIST_TYPE.TOP,
    top: {
      items: [],
      pageInfo: {},
    },
    hot: {
      items: [],
      pageInfo: {},
    },
    new: {
      items: [],
      pageInfo: {},
    },
  },
  mutations: {
    SET_ACTIVE_TYPE: (state, { type }) => {
      state.activeType = type;
    },
    SET_LIST: (state, { items, pageInfo }) => {
      state[state.activeType].pageInfo = pageInfo;

      items.forEach((item) => {
        item && state[state.activeType].items.push(item);
      });
    },
  },
  actions: {
    FETCH_LIST_DATA: ({ commit, state }, { type }) => {
      const prev = state.activeType;
      commit("SET_ACTIVE_TYPE", { type });

      if (type !== prev && state[type].items.length) {
        return;
      }

      const after = state[type].pageInfo.endCursor || "";

      return fetchItems({
        type,
        after,
      }).then((data) => commit("SET_LIST", data));
    },
  },
};
