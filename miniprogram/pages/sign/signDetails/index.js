//index.js
const app = getApp()

Page({
  data: {
    info: {}
  },
  onShow: function() {
    let  that = this
    let signDetails = wx.getStorageSync('signDetails');
    that.setData({
      info: signDetails
    })
  },
  onLoad: function() {
    let that = this
    
    // if (scene.id) {
    //   that.handleSign(scene.id)
    // }
  },
  handleSign: function(id) {
    let that = this
    let token = wx.getStorageSync('token');
    wx.request({
      url: app.apiDomain + '/v1/signing/signing',
      data: {
        metting_id: id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      success(res) {
        console.log('签到返回：', res)
        that.setData({
          info: res.data.data
        })
      }
    })
  }
})
