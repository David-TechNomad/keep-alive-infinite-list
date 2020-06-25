import config from "./config";

export const PERMISSION_MAP = {
  ABOUT_PAGE: Symbol("ABOUT_PAGE"),
};

export const init = () => {
  config.regist("permission", {
    CEO: {
      [PERMISSION_MAP.ABOUT_PAGE]: true,
    },
    COO: {
      [PERMISSION_MAP.ABOUT_PAGE]: false,
    },
  });
};

export const getPermissionByRole = (role) => config.get("permission")[role];
