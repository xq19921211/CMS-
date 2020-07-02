import types from '../mutations-type';
import { GetterTree, Getter, ActionTree, Action, Commit } from 'vuex';
import { getRouteMenu } from '@/api/middleSystem';

interface RouteMenuItem {
  method: string;
  url: string;
}

interface State {
  list: RouteMenuItem[];
}

const routeMenuState: State = {
  list: []
};

// getters
const menuList: Getter<State, any> = (state: State) => {
  return state.list;
};

const getterTree: GetterTree<State, any> = {
  menuList
};

// mutations
const mutations = {
  [types.SET_ROUTE_MENU](state: State, value: RouteMenuItem[]) {
    state.list = value;
  }
};

// actions
const setRouteMenu: Action<State, any> = (context: { commit: Commit }) => {
  return new Promise((resolve, reject) => {
    getRouteMenu()
      .then((res: any) => {
        context.commit(types.SET_ROUTE_MENU, res);
        resolve();
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

const actionTree: ActionTree<State, any> = {
  setRouteMenu
};

export default {
  state: routeMenuState,
  mutations,
  getters: getterTree,
  actions: actionTree
};
