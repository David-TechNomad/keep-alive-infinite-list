import axios from "axios";

const instance = axios.create({
  baseURL: "https://web-api.juejin.im",
  timeout: 1000,
  headers: { "X-Agent": "Juejin/Web" },
});

instance.interceptors.response.use(
  function ({ status, statusText, data }) {
    if (status !== 200) {
      return Promise.reject();
    }
    return data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const DATA_TYPE = {
  new: "NEWEST",
  hot: "POPULAR",
  top: "THREE_DAYS_HOTTEST",
};

export const fetchItems = ({ type, after }) => {
  return instance
    .post("/query", {
      operationName: "",
      query: "",
      variables: { first: 20, after, order: DATA_TYPE[type] },
      extensions: { query: { id: "21207e9ddb1de777adeaca7a2fb38030" } },
    })
    .then(({ data }) => {
      const { edges, pageInfo } = data.articleFeed.items;
      const items = edges.map(({ node }) => node);
      return { items, pageInfo };
    });
};
