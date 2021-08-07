//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: ''
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function(options) {
    var that = this;
    //查看是否授权
    wx.getSetting({
      success: function(res) {
        console.log('res', res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(resUserInfo) {
              console.log('resUserInfo', resUserInfo)
              that.setData({
                avatarUrl: resUserInfo.userInfo.avatarUrl
              })
            }
          })
          console.log("用户授权了");
        } else {
          console.log("用户没有授权");
        }
      }
    });
  },


  
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      
      wx.login({
        success (res) {
          if (res.code) {
            let code = res.code
            wx.request({
              url: app.apiDomain + '/v1/login/login',
              data: {
                code,
                nick_name: e.detail.userInfo.nickName
              },
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success(res) {
                console.log('res44', res)
                wx.setStorageSync('userInfo', e.detail.userInfo);
                wx.setStorageSync('token', res.data.data);
                wx.switchTab({
                  url: '/pages/home/index'
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }

})
