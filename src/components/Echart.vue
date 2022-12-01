<template>
  <div style="height: 100%" ref="echart">echarts</div>
</template>

<script>
export default {
  props: {
    charData: {
      type: Object,
      default: () => {
        return {
          xData: [],
          series: [],
        }
      },
    },
    isAxisChart: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isCollapse() {
      return this.$store.state.asideStatus
    },
    // 判断是否需要坐标轴
    option() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
  },
  data() {
    return {
      // 判断是否初始化了echarts
      echarts: null,
      axisOption: {
        // grid: {
        //   left: "20%",
        // },
        // x轴数据
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            // axisLabel: {
            //   formatter: "{value} ",
            // },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        legend: {
          show: true,
        },
        tooltip: {
          trigger: "axis",
        },
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089",
        ],
        series: [],
      },
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: ["#0f78f4", "#dd536b", "#9462e5", "#a6a6a6", "#e1bb22", "#39c362", "#3ed1cf"],
        series: [],
      },
    }
  },
  watch: {
    charData: {
      handler: function () {
        this.initChart()
      },
      deep: true,
    },
    isCollapse() {
      setTimeout(() => {
        this.resizeChart()
      }, 200)
    },
  },
  methods: {
    // 判断echarts是否初始化
    initChart() {
      this.initChartData()
      if (this.echarts) {
        this.echarts.setOption(this.option)
      } else {
        this.echarts = this.$echarts.init(this.$refs.echart)
        this.echarts.setOption(this.option)
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.charData.xData
        this.axisOption.series = this.charData.series
      } else {
        this.normalOption.series = this.charData.series
      }
    },
    resizeChart() {
      this.echarts ? this.echarts.resize() : ""
    },
  },
  mounted() {
    window.addEventListener("resize", this.resizeChart)
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeChart)
  },
}
</script>

<style lang="scss" scoped></style>
