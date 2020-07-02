import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'; // vuex 状态持久化
import auth from './modules/auth';
import user from './modules/user';
import menu from './modules/menu';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, user, menu },
  plugins: [createPersistedState()]
});
