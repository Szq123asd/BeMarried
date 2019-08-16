// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  markertap:function(){
    wx.navigateTo({
      url: 'mapdetail/mapdetail',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    //设置菜单中的转发按钮触发转发事件时的转发内容
    return {
      title:'我们的幸福，需要你的见证', //转发标题
      path: 'pages/my/my',
    }
  }
})