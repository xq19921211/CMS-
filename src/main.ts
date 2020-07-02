import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import Element from 'element-ui';
import '@/permission'; // 路由守卫跳转鉴权
import '@/registerServiceWorker';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss';
import '@/icons'; // svg-icon

import alInput from '@/components/input/index.vue';

// import VueUeditorWrap from 'vue-ueditor-wrap'
// import '../public/UEditor/ueditor.config'
// import '../public/UEditor/ueditor'
// import '../public/UEditor/themes/default/css/umeditor.css'
// import '../public/UEditor/third-party/jquery.min'

import { formatNull } from '@/utils/filters'; // image路径替换

Vue.use(Element);

// 为空过滤器
Vue.filter('formatNull', formatNull);

// 全局组件
Vue.component('alInput', alInput);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
