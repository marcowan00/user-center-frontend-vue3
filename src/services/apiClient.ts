import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  withCredentials: true,
});

// 请求拦截器
apiClient.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    // 对响应数据的操作。2xx 范围内的状态码都会触发该函数。
    console.log("response: ", response);
    // const { data } = response;
    // console.log("response.data: ", data);

    if (response.data.code === 40100) {
      if (
        !response.request.responseURL.includes("user/current") &&
        !window.location.pathname.includes("/user/login")
      ) {
        window.location.href = `/user/login?redirect=${window.location.href}`;
      }
    }

    return response;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default apiClient;
