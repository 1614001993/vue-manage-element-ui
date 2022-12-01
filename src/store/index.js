import Vue from "vue"
import Vuex from "vuex"
import tab from "./tab/tab"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    asideStatus: true,
  },
  mutations: {
    changeAsideStatus(state) {
      state.asideStatus = !state.asideStatus
    },
  },
  actions: {},
  modules: {
    tab,
  },
})
