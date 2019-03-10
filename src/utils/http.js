// 正式服务器
// let domain = 'https://wx.dfo888.cn/'
let domain = {};
if (process.env.NODE_ENV === "development") {
  domain.host = "";
} else {
  domain.host = "";
}
console.log(domain);
