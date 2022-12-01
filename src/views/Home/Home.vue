<template>
  <el-row class="home" :gutter="15">
    <el-col :span="8">
      <!-- 登录信息   -->
      <el-card class="user-info-card" shadow="hover" style="height: 290px; margin-bottom: 20px">
        <div class="user-info">
          <img class="user-info-img" :src="userImg" alt="" />

          <div class="user-info-dis">
            <p class="name">李全晓</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="history-login">
          <p class="history-login-add">上次登录时间：<span>2022-10-29</span></p>
          <p class="history-login-time">上次登陆地点：<span>甘肃省兰州市</span></p>
        </div>
      </el-card>
      <!-- 购买统计 -->
      <el-card shadow="hover" class="box-card" style="height: 538px">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column v-for="(val, index) in tabLable" :key="index" :prop="index" :label="val"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="info">
        <el-card shadow="hover" v-for="(item, index) in payList" :key="index">
          <i :class="'el-icon-' + item.icon" class="icon" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">￥ {{ item.num }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- echarts图表 -->
      <div class="line-chart">
        <el-card shadow="hover">
          <tab-echarts style="height: 280px" :charData="echartData.orderData"></tab-echarts>
        </el-card>
      </div>
      <div class="stat-card">
        <el-card shadow="hover">
          <tab-echarts style="height: 260px" :charData="echartData.userData"></tab-echarts>
        </el-card>
        <el-card shadow="hover">
          <tab-echarts style="height: 260px" :charData="echartData.videoData" :isAxisChart="false"></tab-echarts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import TabEcharts from "../../components/Echart.vue"

export default {
  components: {
    TabEcharts,
  },
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      payList: [
        { name: "今日完成订单", icon: "finished", num: 1234, color: "#2ec7c9" },
        { name: "今日收藏订单", icon: "star-on", num: 1234, color: "#ffb980" },
        { name: "今日取消订单", icon: "refresh-left", num: 1234, color: "#5ab1ef" },
        { name: "本月完成订单", icon: "finished", num: 1234, color: "#2ec7c9" },
        { name: "本月收藏订单", icon: "star-on", num: 1234, color: "#ffb980" },
        { name: "本月取消订单", icon: "refresh-left", num: 1234, color: "#5ab1ef" },
      ],
      tabLable: { name: "课程", todayBuy: "今日购买", monthBuy: "本月购买", totalBuy: "总购买" },
      tableData: [],
      echartData: {
        orderData: {
          xData: [],
          series: [],
        },
        userData: {
          xData: [],
          series: [],
        },
        videoData: {
          series: [],
        },
      },
    }
  },
  methods: {
    getData() {
      this.$http.get("/home/getData").then((res) => {
        res = res.data.data
        this.tableData = res.tableData
        //订单数据处理
        const order = res.orderData
        this.echartData.orderData.xData = order.date
        // 取出series中的name部分--键名
        let keyArray = Object.keys(order.data[0])
        keyArray.forEach((key) => {
          this.echartData.orderData.series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          })
        })
        // 用户数据处理
        const user = res.userData

        this.echartData.userData.xData = user.map((item) => item.date)
        this.echartData.userData.series.push({
          name: "新增用户",
          data: user.map((item) => item.new),
          type: "bar",
        })
        this.echartData.userData.series.push({
          name: "活跃用户",
          data: user.map((item) => item.active),
          type: "bar",
        })
        // 视频饼图
        this.echartData.videoData.series.push({
          data: res.videoData,
          type: "pie",
        })
      })
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/home";
</style>
