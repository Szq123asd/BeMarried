// pages/bless/bless.js
var util = require('../../utils/util.js')

const app = getApp()
const db = wx.cloud.database()
var context
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMsge()
  },
  getContext: function(e) {
    context = e.detail.value;
  },
  //获取留言
  getMsge: function() {
    wx.showLoading({
      title: '加载中'
    })
    db.collection('Message').get({
      success: res => {
        this.setData({
          list: res.data,
          num: res.data.length
        })
        wx.hideLoading()
        console.log(res.data)
      }
    })
  },
  // 存储留言
  send: function(name) {
    
    var time = util.formatTime(new Date())
    console.log(time)
    if (context == undefined) {
      wx.showModal({
        title: '提示',
        content: '写下你的祝福',
      })
    } else {
      wx.cloud.callFunction({
        name: 'sendMessage',
        data: {
          name: app.globalData.userInfo.nickName,
          message: context,
           time:time
        },
        success: res => {
          wx.showToast({
            title: '您已送上祝福',
            duration: 1500
          })
          this.onLoad()
        }
      })
    }
  },

  onShareAppMessage: function () {
    var that = this
    //设置菜单中的转发按钮触发转发事件时的转发内容
    return {
      title: '我们的幸福，需要你的见证', //转发标题
      path: 'pages/my/my',
    }
  },
  upper:function(){
    wx.showToast({
      title: '已到顶部',
      icon:'none',
      duration: 2000
    })
  },
  tolower:function(){
    wx.showToast({
      title: '已到底部',
      icon:'none',
      duration:2000
    })
  }
})