//index.js
const app = getApp()

Page({
  data: {
    
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
