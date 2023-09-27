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
instance.interceptors.response.use(
  // 处理成功的响应
  // 响应状态码在2xx范围内时进入该流程
  // 后端进行对应响应状态码返回的配置（例如resp.status(200).send({errno : 0, data : {}})）
  res => {
    const response: Response = res.data || {};
    const { errno, data, msg } = response;
    if (errno === 0) {
      // 返回成功响应中的数据，然后在useRequest()中通过onSuccess()对响应后的数据进行处理，弹出注册成功消息等
      return Promise.resolve(data) as any;
    }
  },
  // 处理失败的响应
  // 响应状态码在2xx范围外时进入该流程
  // 后端进行对应响应状态码返回的配置（例如resp.status(501).send({errno : 1, msg : '用户已注册'})）
  err => {
    const { errno, msg } = err.response.data;
    message.error(msg);
    if (errno === 4) {
      setTimeout(() => {
        // 跳转到登录页面
        window.location.href = LOGIN_URL;
      }, 1000);
    }
    // 返回失败响应的错误信息，然后例如弹出注册失败的消息或者在useRequest()中通过onError()对错误信息进行处理
    return Promise.reject(err.response.data);
  }
);

export default instance;
