import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//Permet d'appeler addUser et removeUser dans tout le code
export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    addUser(state, payload) {
      state.user = payload;
    },
    removeUser(state) {
      state.user = null;
    },
  },
  actions: {},
});
