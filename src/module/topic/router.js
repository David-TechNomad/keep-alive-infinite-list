import { LIST_TYPE } from "./store";

export const routes = [
  {
    name: LIST_TYPE.TOP,
    path: `/${LIST_TYPE.TOP}`,
    component: () => import("./views/UTopic.vue"),
    props: { type: LIST_TYPE.TOP },
  },
  {
    name: LIST_TYPE.NEW,
    path: `/${LIST_TYPE.NEW}`,
    component: () => import("./views/UTopic.vue"),
    props: { type: LIST_TYPE.NEW },
  },
  {
    name: LIST_TYPE.HOT,
    path: `/${LIST_TYPE.HOT}`,
    component: () => import("./views/UTopic.vue"),
    props: { type: LIST_TYPE.HOT },
  },
];
