import { getWxSignature } from "@/http/index";
import wx from "weixin-js-sdk";

var wxUtils = {
  /**
   * @desc 检查微信接口是否可用
   * @function wxCheckJsApi
   * @param array
   * @return Promise
   * */
  wxCheckJsApi: jsApiList => {
    return new Promise((resolve, reject) => {
      wx.checkJsApi({
        jsApiList: jsApiList,
        success: function(res) {
          resolve(res);
        }
      });
    });
  },
  /**
   * @desc 开启查找周边ibeacon设备接口
   * @function wxStartSearchBeacons
   * @return Promise
   * */
  wxStartSearchBeacons: () => {
    return new Promise((resolve, reject) => {
      console.log("开始查找Beacons");
      wx.startSearchBeacons({
        ticket: "",
        complete: function(argv) {
          console.log(argv);
          let n = argv.errMsg.split(":")[1];
          switch (n) {
            case "ok":
              resolve("正在监听蓝牙..."); // return []
              break;
            case "already started":
              reject(new Error("请刷新页面后再进入")); // '打开后未stop再次打开'
              break;
            case "bluetooth power off":
              reject(new Error("蓝牙未打开"));
              break;
            case "location service disable":
              reject(new Error("GPS服务未打开"));
              break;
            case "system unsupported":
              reject(new Error("系统不支持"));
              break;
            default:
              reject(new Error(n));
              break;
          }
        }
      });
    });
  },
  /**
   * @desc 初始化微信设置
   * @function setWxConfig
   * @return Promise
   */
  setWxConfig: () => {
    // let url = config.domain + location.pathname // 当前url
    let url = document.URL.split("#")[0];
    getWxSignature(url)
      .then(res => {
        var Data = res.data.data;
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
        wx.config({
          debug: false, // 开启调试模式,开发时可以开启
          appId: Data.appId, // 必填，公众号的唯一标识   由接口返回
          timestamp: Data.timestamp, // 必填，生成签名的时间戳 由接口返回
          nonceStr: Data.nonceStr, // 必填，生成签名的随机串 由接口返回
          signature: Data.signature, // 必填，签名 由接口返回
          jsApiList: [
            "checkJsApi",
            "startSearchBeacons",
            "stopSearchBeacons",
            "onSearchBeacons",
            "onMenuShareAppMessage",
            "onMenuShareTimeline"
          ] // 此处填你所用到的方法
        });
      })
      .catch(e => {
        console.log(e);
      });
  },

  /**
   * @desc 微信分享
   * @function wxShare
   */
  wxShare: opt => {
    return new Promise((resolve, reject) => {
      wx.onMenuShareAppMessage({
        // 分享给朋友
        title: opt.title, // 分享标题
        desc: opt.desc, // 分享描述
        link: opt.link, // 分享链接 默认以当前链接
        imgUrl: opt.imgUrl, // 分享图标
        // 用户确认分享后执行的回调函数
        success: function() {
          opt.success && opt.success();
        },
        // 用户取消分享后执行的回调函数
        cancel: function() {
          opt.cancel && opt.cancel();
        }
      });
      // 分享到朋友圈
      wx.onMenuShareTimeline({
        // 分享到朋友圈
        title: opt.title, // 分享标题
        desc: opt.desc, // 分享描述
        link: opt.link, // 分享链接 默认以当前链接
        imgUrl: opt.imgUrl, // 分享图标
        // 用户确认分享后执行的回调函数
        success: function() {
          opt.success && opt.success();
        },
        // 用户取消分享后执行的回调函数
        cancel: function() {
          opt.cancel && opt.cancel();
        }
      });
    });
  }
};
export {
  wxUtils // 微信公用方法
};
