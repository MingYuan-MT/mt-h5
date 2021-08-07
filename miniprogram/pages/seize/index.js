//index.js
const app = getApp()

Page({
  data: {
    
  },

  onLoad: function(options) {
    this.scanSeize()
  },
  scanSeize: function() {
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({
          url: '/pages/seize/toSeize/index'
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
})
