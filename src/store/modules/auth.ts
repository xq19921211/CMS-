import types from '../mutations-type';
import { GetterTree, Getter, ActionTree, Action, Commit } from 'vuex';
import { getToken } from '@/api/middleSystem';

interface State {
    token: string;
}

// state
const authState: State = {
    token: ''
};

// getters
const token: Getter<State, any> = (state: State) => {
    return state.token;
};

const getterTree: GetterTree<State, any> = {
    token
};

// mutations
const mutations = {
    [types.SET_TOKEN](state: State, value: string) {
        state.token = value;
    }
};

// actions
const setToken: Action<State, any> = (context: { commit: Commit }) => {
    return new Promise((resolve, reject) => {
        getToken().then((res: any) => {
            context.commit(types.SET_TOKEN, res);
            resolve();
        }).catch((err: any) => {
            reject(err);
        });
    });
};

const actionTree: ActionTree<State, any> = {
    setToken
};

export default {
    state: authState,
    mutations,
    getters: getterTree,
    actions: actionTree
};
