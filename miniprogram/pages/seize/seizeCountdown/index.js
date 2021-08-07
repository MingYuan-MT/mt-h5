//index.js
const app = getApp()

Page({
  data: {
    
  },

  onLoad: function() {

  },
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})
