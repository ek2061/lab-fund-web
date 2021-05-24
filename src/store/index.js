import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: "SET_USER",
};

const state = {
  isAuthenticated: false,
  user: {}, //token解析後把使用者資訊存到這裡
};

const getters = {
  // 獲取狀態資訊
  isAuthenticated: (state) => state.isAuthenticated,
  user: (state) => state.user,
};

const mutations = {
  // 更改狀態資訊
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    // 設置是否已授權
    if (isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },

  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {};
  },
};

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
  clearCurrentState: ({ commit }) => {
    //登出時清除使用者資料
    commit(types.SET_AUTHENTICATED, false);
    commit(types.SET_USER, null);
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
