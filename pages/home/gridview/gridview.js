// pages/home/gridview/gridview.js
var imgUrlsDefaultPre = []
var id
Page({
  data: {
    dsc: null,
    list: [],
  },
  onLoad: function(options) {
    var that = this
    id = options.id
    this.getDsc()
  },
  getDsc: function() {
    console.log(id)
    wx.cloud.callFunction({
      name: "getImg",
      data: {
        _id: id
      },
      success: res => {
        console.log(res.result.data[0].images_fileID)
        this.setData({
          list: res.result.data[0].images_fileID,
          dsc: res.result.data[0].dsc
        })
      }
    })
  },
  //查看大图
  previewImage: function(e) {
    var current = e.target.dataset.src;
    imgUrlsDefaultPre = this.data.list;
    // console.log(imgUrlsDefaultPre)
    // console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imgUrlsDefaultPre // 需要预览的图片http链接列表
    })
  }
})