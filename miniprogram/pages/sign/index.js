//index.js
const app = getApp()

Page({
  data: {
    list: []
  },

  onLoad: function() {
    this.getSignList()
  },
  getSignList: function() {
    let that = this
    let token = wx.getStorageSync('token');
    console.log('token', token)
    wx.request({
      url: app.apiDomain + '/v1/signing/lists',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      success(res) {
        console.log('签到返回：', res)
        that.setData({
          list: res.data.data.data
        })
      }
    })
  },
  // 签到二维码
  toSignQRCode: function(e) {
    let metting_id = e.target.dataset.id
    let token = wx.getStorageSync('token');
    console.log('token', token)
    wx.request({
      url: app.apiDomain + '/v1/signing/code',
      data: {
        metting_id: metting_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      success(res) {
        console.log('签到二维码返回：', res)
        wx.setStorageSync('signQRCode', res.data.data.url)
        wx.navigateTo({
          url: '/pages/sign/signQRCode/index'
        })
      }
    })
    
  },
  // 签到统计
  toSignDetails: function(e) {
    let metting_id = e.target.dataset.id
    let token = wx.getStorageSync('token');
    console.log('token', token)
    wx.request({
      url: app.apiDomain + '/v1/signing/statistics',
      data: {
        metting_id: metting_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      success(res) {
        console.log('签到统计返回：', res)
        wx.setStorageSync('signDetails', res.data.data)
        wx.navigateTo({
          url: '/pages/sign/signDetails/index'
        })
      }
    })

  }
})
