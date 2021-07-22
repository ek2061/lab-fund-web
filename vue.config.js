const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "高光譜訊號與影像處理實驗室經費管理系統";
      return args;
    });
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  devServer: {
    open: true, //process.platform === 'darwin',
    host: "0.0.0.0", //'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {  // 配置跨域
      "/api": {
        target: "127.0.0.1:3000",  // 後端目標
        ws: true,  // 代理 websockets
        changOrigin: true,  // 允許跨域
        pathRewrite: {
          "^/api": "",  //請求的時候使用這個api就可以
        },
      },
    },
    before: (app) => {},
  },
};
