Page({
  data: {
    imgUrls: [
     'cloud://marry-82nvc.6d61-marry-82nvc-1259697128/image/wx1c8999491b230eac.o6zAJs5B3XhSU55w0fXfvv5ssDfE.07k9NM6NGkam4d2a251517dab234ada58a567a8d5c69.webp',
     'cloud://marry-82nvc.6d61-marry-82nvc-1259697128/image/wx1c8999491b230eac.o6zAJs5B3XhSU55w0fXfvv5ssDfE.1LFInjEzVvOg4d2a251517dab234ada58a567a8d5c69.webp',

'cloud://marry-82nvc.6d61-marry-82nvc-1259697128/image/wx1c8999491b230eac.o6zAJs5B3XhSU55w0fXfvv5ssDfE.1cOZbWmtDFCMf6226440fb8c99ae2150b17ced3fb635.webp'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})