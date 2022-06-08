import axios from "axios";

const env = process.env.NODE_ENV;

const url = {
  development: {
    baseURL: "https://elm.cangdu.org",
  },
  production: {
    baseURL: "https://elm.cangdu.org",
  },
};

export const elm_request = axios.create({
  baseURL: url[env].baseURL,
});
