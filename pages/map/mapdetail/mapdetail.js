var QQMapWX = require('../util/qqmap-wx-jssdk.js');
var QQMapWX = require('../util/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'BXOBZ-HJ2WX-M2I4L-ZWOQP-5UA6Q-XIBCO' // 必填
});
var fromLoc = [];
var instruction = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 18,
    latitude: 36.078380,
    longitude: 115.560160,
    markers: [{
      id: 1,
      latitude: 36.078380,
      longitude: 115.560160,
      iconPath: '/image/location.png',
      width: 32,
      height: 32,
      title: '五里屯村'
    }],
    showDesc: false,
    distance: 0,
    duration: 0,
    toLoc: {
      latitude: 36.078380,
      longitude: 115.560160,
    },
    struction: []
  },
  getDesc: function() {
    this.setData({
      showDesc: !this.data.showDesc
    })
    console.log(this.data.showDesc)
  },
  onReady: function() {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getLoc: function() {
    var _this = this;
    wx.chooseLocation({
      success: function(res) {
        fromLoc.push({
          latitude: res.latitude,
          longitude: res.longitude
        });
        console.log(fromLoc)
        _this.searchWay(fromLoc[0])
      },
    })
  },
  //驾车路线
  searchWay: function(startLoc) {
    var _this = this;
    qqmapsdk.direction({
      mode: 'driving', //出行方式
      from: startLoc,
      to: this.data.toLoc,
      success: (res) => {
        console.log(res.result.routes[0].steps);
        _this.setData({
          distance: res.result.routes[0].distance,
          duration: res.result.routes[0].duration
        })

        for (var i = 0; i < res.result.routes[0].steps.length; i++) {
          instruction[i] = res.result.routes[0].steps[i].instruction
        }
        _this.setData({
          struction: instruction
        })
        console.log(this.data.struction.length)
        var ret = res;
        var coors = ret.result.routes[0].polyline,
          pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#1E90FF',
            width: 6
          }]
        })
      },
    });
  },
  getApp: function() {
    const latitude = this.data.latitude
    const longitude = this.data.longitude
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  }
})