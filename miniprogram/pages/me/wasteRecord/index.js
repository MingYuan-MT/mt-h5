//index.js
const app = getApp()

Page({
  data: {
      list:[],
      recordCount:{}
  },

  onLoad: function() {
    let token = wx.getStorageSync('token');
    let that = this;
    console.log(token)
    wx.request({
      url: app.apiDomain + '/v1/my/use-log',
      data: {
        // nick_name: e.detail.userInfo.nickName
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token.token,
      },
      success(res) {
        let result = res.data;
        console.log(result.data.record_count)
        if(result.code == 200){
          that.setData({
            recordCount: result.data.record_count,
            list:result.data.list
          });
        }else{
          wx.showToast({
            title: result.error,
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
    
  },

})
