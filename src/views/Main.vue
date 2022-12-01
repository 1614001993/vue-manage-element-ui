<template>
  <el-container style="height: 100%">
    <el-aside width="auto"> <common-aside></common-aside> </el-aside>
    <el-container>
      <el-header><common-header></common-header></el-header>
      <common-tab></common-tab>
      <el-main><router-view /> </el-main>
      <el-footer><common-footer></common-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "../components/CommonHeader.vue"
import CommonAside from "../components/CommonAside.vue"
import CommonTab from "../components/CommonTab.vue"
import CommonFooter from "../components/CommonFooter.vue"

export default {
  components: {
    CommonAside,
    CommonHeader,
    CommonTab,
    CommonFooter,
  },
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #545c64;
}
.el-main {
  padding-top: 0;
}
</style>
