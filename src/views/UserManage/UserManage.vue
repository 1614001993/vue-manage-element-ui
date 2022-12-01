<template>
  <div class="manage">
    <el-dialog :title="this.operateType === 'add' ? '新增用户' : '编辑用户'" :visible.sync="isShow">
      <common-form :formLable="operateFormLable" :form="operateForm"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <common-form inline :formLable="formLable" :form="searchForm">
        <el-button type="primary" @click="getUserList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>

    <common-table
      @changePage="getUserList"
      v-bind:tableData="tableData"
      :config="config"
      :tableLable="tableLable"
      @edit="editUser"
      @dele="deleUser"
    ></common-table>
  </div>
</template>

<script>
import CommonTable from "../../components/CommonTable.vue"
import CommonForm from "../../components/CommonForm.vue"
export default {
  components: {
    CommonForm,
    CommonTable,
  },
  methods: {
    // 搜索用户
    // 新增用户
    addUser() {
      this.operateForm = {}
      this.operateType = "add"
      this.isShow = true
    },
    // 提交的操作
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/api/user/edit", this.operateForm).then((res) => {
          console.log(res)
          this.isShow = false
          this.getUserList()
        })
      } else {
        this.$http.post("/api/user/add", this.operateForm).then((res) => {
          console.log(res)
          this.getUserList()
        })
      }
    },
    editUser(data) {
      console.log(data)
      this.operateType = "edit"
      this.isShow = true
      this.operateForm = data
    },
    deleUser(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.get("/api/user/del", { params: { id: data.id } }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            })
            this.getUserList()
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        })
    },
    getUserList(name = "") {
      console.log(name)
      this.config.loading = true
      name ? (this.config.page = 1) : ""
      this.$http.get("/api/user/getUser", { params: { page: this.config.page, name } }).then((res) => {
        this.tableData = res.data.list.map((item) => {
          item.sexLable = item.sex === 0 ? "女" : "男"
          return item
        })
        this.config.total = res.data.count
        this.config.loading = false
      })
    },
  },
  created() {
    this.getUserList()
  },
  data() {
    return {
      dialogFormVisible: false,
      operateType: "add",
      isShow: false,
      operateForm: { name: "", addr: "", age: "", birth: "", sex: "" },
      operateFormLable: [
        {
          model: "name",
          label: "姓名",
        },
        {
          model: "addr",
          label: "地址",
        },
        {
          model: "age",
          label: "年龄",
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            { label: "男", value: 1 },
            { label: "女", value: 0 },
          ],
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false,
      },
      tableData: [],
      tableLable: [
        {
          prop: "name",
          lable: "姓名",
        },
        {
          prop: "age",
          lable: "年龄",
        },
        {
          prop: "sexLable",
          lable: "性别",
        },
        {
          prop: "birth",
          lable: "出生日期",
        },
        {
          prop: "addr",
          lable: "地址",
        },
      ],
      searchForm: {
        keyword: "",
      },
      formLable: [
        {
          modle: "keyword",
          label: "",
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
