<template>
  <div class="tabs">
    <el-tag
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      :key="tag.name"
      @click="changeMenu(tag)"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag.lable }}
    </el-tag>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex"
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: "",
    }
  },
  methods: {
    ...mapMutations({
      close: "tab/closeTab",
    }),
    handleClose(tag) {
      this.close(tag)
    },
    changeMenu(tag) {
      this.$router.push({ name: tag.name })
      this.$store.commit("tab/getMenu", tag)
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
