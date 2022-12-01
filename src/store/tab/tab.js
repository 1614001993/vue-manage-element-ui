export default {
  namespaced: true,
  state: {
    isCollapse: false,
    menu: [],
    currentMenu: null,
    tabList: [
      {
        path: "/",
        name: "home",
        lable: "首页",
        icon: "home",
      },
    ],
  },
  mutations: {
    getMenu(state, val) {
      if (val.name !== "home") {
        state.currentMenu = val
        let result = state.tabList.findIndex((item) => item.name === val.name)
        result === -1 ? state.tabList.push(val) : ""
      } else {
        state.currentMenu = null
      }
    },
    closeTab(state, val) {
      let result = state.tabList.findIndex((item) => item.name === val.name)
      state.tabList.splice(result, 1)
    },
  },
  actions: {},
}
