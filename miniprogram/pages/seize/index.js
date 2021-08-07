//index.js
const app = getApp()

Page({
  data: {
    
  },

  onLoad: function() {
    let that = this
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.navigateTo({
          url: '/pages/seize/toSeize/index'
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  back: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})
