import config from "./config";

export const init = () => {
  config.regist("theme", {
    blue: {
      primary: "#007fff",
      highlight: "#00a6ff",
    },
    red: {
      primary: "#A83733",
      highlight: "rgb(195, 75, 73)",
    },
  });
};
