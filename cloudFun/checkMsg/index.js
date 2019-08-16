// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  return{
  num: await db.collection('Message').where({
    _openid: event._openid
  }).count()
  }
}

