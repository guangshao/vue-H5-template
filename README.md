# vue-h5-template
封装h5的模板
>引用第三方库
>1. js-cookie 
>2. dayjs // 日期转换

##目录结构说明
src
  ├── App.vue
  ├── assets
  │   ├── logo.png
  │   └── stylus
  │       ├── base
  │       │   ├── base.styl // 基础样式
  │       │   ├── mixins.styl // 1px像素边框
  │       │   ├── mobile.styl // mobile重置
  │       │   └── normalize.styl // 初始化css
  │       └── parital
  │           └── _var.styl // css变量
  ├── components
  ├── main.js
  ├── router.js
  ├── store.js
  ├── utils
  │   ├── http.js // 网络请求
  │   ├── localstorage.js // 本地存储
  │   └── wxJsdk.js // 微信sdk
  └── views