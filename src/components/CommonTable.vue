<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe border v-loading="config.loading">
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page - 1) * 10 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip strip v-for="item in tableLable" :key="item.prop" :label="item.lable">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLable: Array,
    config: Object,
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page)
    },
    handleDelete(data) {
      this.$emit("dele", data)
    },
    handleEdit(data) {
      this.$emit("edit", data)
      console.log(123)
    },
  },
}
</script>

<style lang="scss" scoped>
.common-table {
  height: 730px;
  background-color: #fff;

  .pager {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
<style lang="scss">
.el-table {
  font-size: 18px;
  border-left: 0;
  .el-table__header-wrapper {
    .el-table__header {
      height: 66px;
    }
  }
  .el-table__body-wrapper {
    .el-table__row {
      height: 59px;
      .cell,
      .el-tooltip {
        padding-left: 0 !important;
      }
    }
  }
}
</style>
