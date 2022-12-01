<template>
  <el-menu
    :collapse="asideStatus"
    collapse-transition
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item :index="item.path" v-for="item in noChild" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.lable }}</span>
    </el-menu-item>
    <el-submenu index="index" v-for="(item, index) in hasChild" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.lable }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">{{
          subItem.lable
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    noChild() {
      return this.asideMenu.filter((item) => !item.children)
    },
    hasChild() {
      return this.asideMenu.filter((item) => item.children)
    },
    ...mapState({
      asideStatus: (state) => state.asideStatus,
    }),
  },
  methods: {
    clickMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit("tab/getMenu", item)
    },
  },
  data() {
    return {
      asideMenu: [
        {
          path: "/",
          name: "home",
          lable: "首页",
          icon: "s-home",
        },
        {
          path: "/video",
          name: "video",
          lable: "视频管理",
          icon: "video-play",
        },
        {
          path: "/user",
          name: "user",
          lable: "用户管理",
          icon: "user",
        },
        {
          lable: "其他",
          icon: "more",
          children: [
            {
              path: "/other1",
              name: "page1",
              lable: "其他页面1",
              icon: "setting",
            },
            {
              path: "/other2",
              name: "page2",
              lable: "其他页面2",
              icon: "setting",
            },
          ],
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
}
</style>
