//index.js
const app = getApp()

Page({
  data: {
    qrCode: ''
  },

  onShow: function() {
    let that = this
    let qrCode = wx.getStorageSync('signQRCode')
    that.setData({
      qrCode: qrCode
    })
  },
  onLoad: function() {

  },
  handleSeize: function() {
    wx.navigateTo({
      url: '/pages/seize/seizeSuccess/index'
    })
  },

  handleReserve: function() {
    wx.navigateTo({
      url: '/pages/flashDetermination/index'
    })
  }
})
