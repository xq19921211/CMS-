import Vue from 'vue';
import Router from './router';
import system from './system';
import cms from './cms';


Vue.use(Router);


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/site/main/contents',
      hidden: true
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('@/views/404/index.vue'),
      hidden: true
    },
    cms,
    system,
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]
});
