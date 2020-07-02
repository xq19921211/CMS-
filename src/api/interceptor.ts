import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import router from '@/router';
import store from '@/store';
import types from '@/store/mutations-type';
import parseImageUrl from '@/utils/parseImageUrl';

// 不报错白名单(以error.response.data.message为参照)
const errWhite = [
  "未知错误!",
  "服务异常，没有找到服务的接口信息！",
  "权限不足,用户未登录!"
];

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_PATH,
  timeout: 60000 // request timeout
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 如果store存有token,则为每次请求附上token
    if (store.getters.token) {
      config.headers.Token = store.getters.token;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 返回拦截
service.interceptors.response.use(
  (response) => {

    // 转换返回值中的图片路径
    parseImageUrl(response.data);

    return response.data;
  },
  (error) => {
    if (error.response.status === 402) {
      if (router.currentRoute.path === "/" || router.currentRoute.path === '/login') {
        store.commit(types.SET_TOKEN, '');
        location.reload();
      } else {
        MessageBox.confirm(
          '您的身份已过期，请选择重新登录，或留在此页。',
          '提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.commit(types.SET_TOKEN, '');
          location.reload();
        });
      }
    }
    // 如果报错信息在报错白名单里则不报错
    if (!errWhite.includes(error.response.data.message)) {
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 5000
      });
    }

    return Promise.reject(error);
  }
);

export default service;
