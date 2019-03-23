var tinyPngWebpackPlugin = require("tinypng-webpack-plugin");
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugin("tinyPng").use(tinyPngWebpackPlugin, [
        {
          key: ""
        }
      ]);
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
};
