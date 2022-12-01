<template>
  <header>
    <div class="l-content">
      <el-button type="primary" plain icon="el-icon-menu" size="mini" class="left-button" @click="asideMenu"> </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.lable }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link"> <img class="user" :src="userImg" /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-bicycle">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex"
export default {
  computed: {
    ...mapState({
      current: (state) => state.tab.currentMenu,
      asideStatus: (state) => state.asideStatus,
      count: (state) => state.count,
    }),
  },
  data() {
    return {
      userImg: require("../assets/images/user.png"),
    }
  },
  methods: {
    ...mapMutations({
      changeasideStatus: "changeAsideStatus",
    }),
    asideMenu() {
      this.changeasideStatus()
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}
.r-content {
  .user {
    width: 54px;
    height: 54px;
    border-radius: 27px;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .left-button {
    margin-right: 15px;
  }
}
</style>
<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #fff;
    font-weight: normal;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #f4f4f4;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
