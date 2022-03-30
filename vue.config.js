module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/style.scss";
        `
      }
    }
  },
  configureWebpack: {
    performance: {
      hints: false
    }
  }
};