import router from '@/router';
import store from '@/store';
import types from '@/store/mutations-type';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false, speed: 380 });

const whiteList = ['/login']; // 免登录可访问白名单

router.beforeEach(async (to, from, next) => {
  // 进度条开始
  NProgress.start();
  // 判断token
  if (store.getters.token) {
    // 判断是否存在用户信息和权限路由表 && store.getters.menuList.length > 0
    if (store.getters.userInfo.account) {
      // 登录页重定向至首页
      if (/\/login\/?$/.test(to.path)) {
        next('/');
      } else {
        next();
      }
    } else {
      try {
        // 存储用户信息
        await store.dispatch('setUserInfo');
        // 存储权限路由表
        await store.dispatch('setRouteMenu');
        next();
      } catch (error) {
        // 失败则清空token跳转至登录页
        store.commit(types.SET_TOKEN, '');
        next('/login');
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`);
    }
  }
  // 进度条结束
  NProgress.done();
});
