const util = require('../../utils/util.js')

const app = getApp()

const db = wx.cloud.database()

Page({
  data: {
    datetime: "2019年10月1日 上午 10点0分",
    datetimeTo: "2019/10/01 10:00:00 ", // 秒杀开始时间
    days: "",
    seconds: "",
    minutes: "",
    hours: "",
    angle: 0,
    appName: "Marry",
    userInfo: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  onLoad: function () {
    this.timeLeft()
  },
  // 倒计时功能
  timeLeft: function () {
    this.data.timer = setInterval(() => {
      var time1 = new Date().getTime()
      var time2 = new Date(this.data.datetimeTo).getTime()
      var miss = time2 - time1
      let days = parseInt(miss / (1000 * 60 * 60 * 24));
      let hours = parseInt((miss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = parseInt((miss % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = parseInt((miss % (1000 * 60)) / 1000);
      this.setData({
        seconds: seconds,
        hours: hours,
        days: days,
        minutes: minutes
      })
    }, 1000);
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.cloud.callFunction({
        name: 'login',
        success: res => {
          e.detail.userInfo.openid = res.result.openid
          this.checkMsg(e.detail.userInfo.openid)
        }
      })
      // 需要openid
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.switchTab({
        url: '/pages/home/home',
      })
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权后进入！！！',
        showCancel: false,
        confirmText: "返回授权",
        success: function (res) {
          if (res.confirm) {
            console.log("用户点击授权")
          }
        }
      })
    }
  },

  // 将用户姓名，头像 openid 插入数据库
  checkMsg: function (openid) {

    // console.log(openid)
    wx.cloud.callFunction({
      name: 'checkMsg',
      data: {
        _openid: openid
      },
      success: res => {
        console.log(res.result)
        app.total.num = res.result.num.total
        // app.total.openid = 
        this.insert(app.total.num)
      },
    })
  },
  insert: function (i) {
    if (i === 0) {
      db.collection('Message').add({
        data: {
          name: app.globalData.userInfo.nickName,
          img: app.globalData.userInfo.avatarUrl,
          message: null,
          time: null
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
});