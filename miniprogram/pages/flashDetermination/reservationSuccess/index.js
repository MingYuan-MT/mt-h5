//index.js
const app = getApp()

Page({
  data: {
    successInfo: {}
  },

  onLoad: function() {

  },
  onShow: function() {
    let that = this
    let currentMeet = wx.getStorageSync('currentMeet');
    console.log('currentMeet,', currentMeet)
    that.setData({
      successInfo: currentMeet
    })
  }
})
