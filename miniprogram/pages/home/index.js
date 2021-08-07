//index.js
const app = getApp()

Page({
  data: {
    
  },

  onLoad: function() {
    
  },
  // 抢占
  handleSeize: function() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.navigateTo({
          url: '/pages/seize/index'
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
    
  },
  // 闪定
  handleReserve: function() {
    wx.navigateTo({
      url: '/pages/flashDetermination/index'
    })
  },
  // 签到
  handleSign: function() {
    wx.navigateTo({
      url: '/pages/sign/index'
    })
  }
})
