// 云函数入口文件
const cloud = require('wx-server-sdk')

//初始化云函数
cloud.init()

// exports.main = (event) => {
//   const wxInfo = cloud.getWXContext()
//   return {
//     wxInfo
//   }
// }



// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}