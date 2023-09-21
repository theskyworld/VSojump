import { message } from "antd";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { promiseHooks } from "v8";
import { LOGIN_URL } from "../assets/ts/constants";
import { getToken } from "../assets/utils/userToken";

export interface Response {
  errno: number;
  data?: ResponseData;
  msg?: string;
}
export interface ResponseData {
  [key: string]: any;
}

const instance = axios.create({
  timeout: 10 * 1000,
});

// request拦截器，每次请求前携带token
instance.interceptors.request.use(
  config => {
    config.headers["Authorization"] = `${getToken()}`; // JWT格式
    return config;
  },
  error => Promise.reject(error)
);

// response拦截器，统一处理errno和msg
instance.interceptors.response.use(res => {
  const response: Response = res.data || {};
  const { errno, data, msg } = response;
  if (errno !== 0) {
    // 存在错误，进行错误提示
    if (msg) {
      message.error(msg);
    }
    if (errno === 4) {
      setTimeout(() => {
        // 跳转到登录页面
        window.location.href = LOGIN_URL;
      }, 1000)
    }
  }

  return data as any;
});

export default instance;
