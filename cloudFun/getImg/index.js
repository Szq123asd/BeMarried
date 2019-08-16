// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()


exports.main = async(event, context) => {
  try {
    return await db.collection('test_image').where({
      _id: event._id
    }).get()
  } catch (e) {
    // console.log(e)
  }
}

// 云函数入口函数
// exports.main = async(event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }