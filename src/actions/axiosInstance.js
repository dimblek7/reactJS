import axios from "axios";
import get from "lodash/get";
import { store } from "../store";
import Configs from "../constants/Configs";
import fe_config from "../constants/Configs";
import { getUTCDate } from "utils/dates";
import TokenManager from "utils/TokenManager";
const https = require('https');

const BASE_URL = Configs.API_URL;
const GLOBAL_TOKEN =
  "eyJhbGciOiJIUzUxMiIsImlhdCI6MTU3MzkwMjI0MCwiZXhwIjoxNTczOTAyODQwfQ.eyJpZCI6MX0.OHHQTsLuK7Cy9dsklnp-JumDoJVdBrCUh6j21gr0YWgz3uLkhpmamAKS6vntIh9MTraXcYlItqA_NUFcc4nXMw";

// At request level
export const agent = new https.Agent({
  rejectUnauthorized: false,
});

  const transformURL = (url) =>
  url
    .split("&")
    .filter((x) => x)
    .map((x) => x.split("="))
    .map((param) => (["from_date", "to_date"].includes(param[1]) ? [param[0], getUTCDate(param[1])] : param))
    .map((x) => x.join("="))
    .join("&");

export const setAuthorizationToken = () => {
  const _store = store.getState();
  const { auth } = _store;
  return get(auth, "token", "") || GLOBAL_TOKEN;
};

const ConvertHeadersForBackend = (headers) => {
  headers.Authorization = setAuthorizationToken();
  headers["Content-Type"] = "application/json";
  return headers;
};

export const instance = axios.create({
  baseURL: BASE_URL,
  transformRequest: [
    (data, headers) => {
      headers = ConvertHeadersForBackend(headers);
      return JSON.stringify(data);
    },
  ],
});

// declare a request interceptor
instance.interceptors.request.use(
  (config) => {
    config.url = transformURL(config.url);
    if (!get(config, "auth", "")) {
      config.auth = {
        username: TokenManager.get(),
        password: Math.random().toString(20),
      };
    }
    return config;
  },
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
    // const {
    //   config,
    // } = error;
    // const originalRequest = config;
    // try {
    //   if (fe_config.MODE === "DEV") {
    //     console.log("instance error", error);
    //   }
    // } catch (e) {
    //   console.log("instance catch err", e);
    // }
    // if (status === 200) {
    //   return new Promise((resolve, reject) => {
    //     resolve(instanceWithRetry(originalRequest));
    //   });
    // } else {
    // return Promise.reject(error);
    // }
  }
);

export const instanceWithRetry = axios.create({
  baseURL: BASE_URL,
  transformRequest: [
    (data, headers) => {
      headers = ConvertHeadersForBackend(headers);
      return JSON.stringify(data);
    },
  ],
});

// declare a request interceptor
instanceWithRetry.interceptors.request.use(
  (config) => {
    config.url = transformURL(config.url);
    if (!get(config, "auth", "")) {
      config.auth = {
        username: TokenManager.get(),
        password: Math.random().toString(20),
      };
    }
    return config;
  },
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);

let API_IN_PROGRESS = "";
const retryRequest = (originalRequest) => {
  if (API_IN_PROGRESS === originalRequest.url) {
    return null;
  }
  API_IN_PROGRESS = originalRequest.url;
  return new Promise((resolve, reject) => {
    resolve(instanceWithRetry(originalRequest));
  });
};

instanceWithRetry.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      config,
      // response: { status }
    } = error;
    const originalRequest = config;
    try {
      fe_config.MODE === "DEV" && console.log("instanceWithRetry request", JSON.stringify(originalRequest));
    } catch (e) {
      console.log("instanceWithRetry err", e);
    }
    if (!get(error, "response.status", "")) {
      return retryRequest(originalRequest);
    } else {
      return Promise.reject(error);
    }
  }
);

// const sleepRequest = (milliseconds, originalRequest) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(instanceWithRetry(originalRequest)), milliseconds);
//   });
// };

// export const instanceWithRetry = axios.interceptors.response.use(null, (error) => {
//   if (error.config && error.response && error.response.status === 401) {
//     return updateToken().then((token) => {
//       error.config.headers.xxxx <= set the token
//       return axios.request(config);
//     });
//   }
//   return Promise.reject(error);
// });

export const instanceMultipart = axios.create({
  baseURL: BASE_URL,
  httpsAgent: agent,
  transformRequest: [
    (data, headers) => {
      headers.Authorization = setAuthorizationToken();
      headers["Content-Type"] = "multipart/form-data";
      headers['httpsAgent'] = agent;
      return data;
    },
  ],
});

export const downloadFile = (url, name) => {
  let urlExt = url.split("/");
  urlExt = urlExt[urlExt.length - 1];
  instance
    .post("url", { url }, { responseType: "blob" })
    .then((result) => {
      const newurl = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement("a");
      link.href = newurl;
      link.setAttribute("download", name || urlExt);
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      console.log(error);
    });
};

// declare a request interceptor
instanceMultipart.interceptors.request.use(
  (config) => {
    config.url = transformURL(config.url);
    if (!get(config, "auth", "")) {
      config.auth = {
        username: TokenManager.get(),
        password: Math.random().toString(20),
      };
    }
    config['httpsAgent'] = agent;
    console.log('config: ', config);
    return config;
  },
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);
