
var musicUrl = 'http://www.ytmp3.cn/down/57611.mp3'
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    isPlayingMusic: true,
    autoplay: true,
    music_url: musicUrl,
    list: [],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'cloud://marry-82nvc.6d61-marry-82nvc/image-Bo5EvJOANzb2f19df914e743dfb16cb5ce02efce8bc1'
    }, {
      id: 1,
      type: 'image',
      url: 'cloud://marry-82nvc.6d61-marry-82nvc/image-Bo5EvJOANzb2f19df914e743dfb16cb5ce02efce8bc1'
    }, {
      id: 2,
      type: 'image',
      url: 'cloud://marry-82nvc.6d61-marry-82nvc/image-Bo5EvJOANzb2f19df914e743dfb16cb5ce02efce8bc1'
    }, {
      id: 3,
      type: 'image',
      url: 'cloud://marry-82nvc.6d61-marry-82nvc/image-Bo5EvJOANzb2f19df914e743dfb16cb5ce02efce8bc1'
    }, {
      id: 4,
      type: 'image',
      url: 'cloud://marry-82nvc.6d61-marry-82nvc/image-Bo5EvJOANzb2f19df914e743dfb16cb5ce02efce8bc1'
    }, {
      id: 5,
      type: 'image',
      url: 'cloud://marry-82nvc.6d61-marry-82nvc/image-Bo5EvJOANzb2f19df914e743dfb16cb5ce02efce8bc1'
    }, {
      id: 6,
      type: 'image',
      url: 'cloud://marry-82nvc.6d61-marry-82nvc/image-Bo5EvJOANzb2f19df914e743dfb16cb5ce02efce8bc1'
    }],
  },


  getImage: function() {
    wx.showLoading({
      title: '加载中'
    })
    db.collection('test_image').get({
      success: res => {
        console.log(res)
        this.setData({
          list: res.data
        })
        wx.hideLoading()
        // console.log(res.data)
      }
    })
  },

  //播放按钮
  play: function(event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url,
        title: '',
        coverImgUrl: ''
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  },
  onLoad() {
    this.towerSwiper('swiperList');
    var that = this
    wx.playBackgroundAudio({
      dataUrl: musicUrl,
    })
    this.getImage();
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
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
  jump:function(e){
    //获取详情ID
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'gridview/gridview?id='+id,
    })
  }
})