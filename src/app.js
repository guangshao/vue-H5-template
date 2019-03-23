import Vue from "Vue";
import App from "./App";
import api from "./config/api"; // 导入api接口
import http from "./utils/http"; // 导入api接口
import { createRouter } from "./router/createRouter";

export function createApp() {
  // 创建 router 实例
  const router = createRouter();
  Vue.prototype.$api = api;
  Vue.prototype.$http = http;
  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  });
  // 返回 app 和 router
  return { app, router };
}
