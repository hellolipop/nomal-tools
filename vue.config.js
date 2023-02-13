const BaseUrl = require('./config/config')
const version = new Date().getTime();
module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "./src/assets/styles/global.scss";`,
      },
    },
    // 是否使用css分离插件 ExtractTextPlugin
    extract: {
      // 修改打包后css文件名   // css打包文件，添加时间戳
      filename: `css/[name].${version}.css`,
      chunkFilename: `css/[name].${version}.css`
    }
  },
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  devServer: {
    port: 8084,
    proxy: {
      [BaseUrl.ROOT]: {
        target: BaseUrl.URL,
        ws: false,
        changeOrigin: true,
        pathRewrite: { [`^${BaseUrl.ROOT}`]: "/" }
      }
    }
  },
  outputDir: 'dist', //打包的时候生成的一个文件名
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.entry.app = ["babel-polyfill", "./src/main.js"];
    }
  },
  configureWebpack: {
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `js/[name].${version}.js`,
      chunkFilename: `js/[id].${version}.js`
    },
  }
}
