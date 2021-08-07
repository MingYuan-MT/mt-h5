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
        let params=res.path.split("&")
        wx.navigateTo({
          url: '/pages/seize/index?' + params[1]
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
})
