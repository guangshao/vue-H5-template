import axios from "axios";
// import QS from "qs";

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12 });
// 设置post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

//http 请求拦截
instance.interceptors.request.use(
  config => {
    // if (config.type === 'post') {
    //  config.data = QS.stringify(config.data);
    // }
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  response => {
    // if (response.data.errCode == 2) {
    //   router.push({
    //     path: "/login",
    //     querry: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
    //   });
    // }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
