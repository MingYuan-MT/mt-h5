//index.js
const app = getApp()

Page({
  data: {
    list: []
  },
  onShow: function() {
    let that = this
    let token = wx.getStorageSync('token');
    wx.request({
      url: app.apiDomain + '/v1/my/reserve',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      success(res) {
        console.log('我预定的会议室：', res)
        that.setData({
          list: res.data.data
        })
        

      }
    })
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
