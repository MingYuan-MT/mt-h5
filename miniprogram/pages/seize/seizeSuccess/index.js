//index.js
const app = getApp()

Page({
  data: {
    end_time: ''
  },

  onLoad: function(option) {
    let end_time = option.time 
    this.setData({
      end_time:end_time
    })
  },

  back: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})
