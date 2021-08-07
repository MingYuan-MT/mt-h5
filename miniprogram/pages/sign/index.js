//index.js
const app = getApp()

Page({
  data: {
    
  },

  onLoad: function() {

  },
  // 签到二维码
  toSignQRCode: function() {
    wx.navigateTo({
      url: '/pages/sign/signQRCode/index'
    })
  },
  // 签到统计
  toSignDetails: function() {
    wx.navigateTo({
      url: '/pages/sign/signDetails/index'
    })
  }
})
