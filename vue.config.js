module.exports = {
  devServer: {
    open: true,
    port: 3333,
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/_variable.scss";`,
      },
    },
  },
}
