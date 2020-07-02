import types from '../mutations-type';
import { GetterTree, Getter, ActionTree, Action, Commit } from 'vuex';
import { getUserInfo } from '@/api/middleSystem';

export interface UserInfo {
    account: string;
    createTime: string;
    roleId: string;
    salt: string;
    _id: string;
}
interface State {
    userInfo: UserInfo;
}

// state
const userState: State = {
    userInfo: {
        account: '',
        createTime: '',
        roleId: '',
        salt: '',
        _id: ''
    }
};

// getters
const userInfo: Getter<State, any> = (state: State) => {
    return state.userInfo;
};

const getterTree: GetterTree<State, any> = {
    userInfo
};

// mutations
const mutations = {
    [types.SET_USER_INFO](state: State, value: UserInfo) {
        state.userInfo = value;
    }
};

// actions
const setUserInfo: Action<State, any> = (context: { commit: Commit }) => {
    return new Promise((resolve, reject) => {
        getUserInfo().then((res: any) => {
            context.commit(types.SET_USER_INFO, res);
            resolve();
        }).catch((err: any) => {
            reject(err);
        });
    });
};


const actionTree: ActionTree<State, any> = {
    setUserInfo
};

export default {
    state: userState,
    mutations,
    getters: getterTree,
    actions: actionTree
};
