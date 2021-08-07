//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    avatarUrl: '',
    nickName: ''
  },

  onLoad: function() {
    console.log('userInfo', wx.getStorageSync('userInfo'))
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      avatarUrl: wx.getStorageSync('userInfo').avatarUrl,
      nickName: wx.getStorageSync('userInfo').nickName,
    })
  },

  toMyMeets: function() {
    wx.navigateTo({
      url: '/pages/me/myMeets/index'
    })
  },
  toWasteRecord: function() {
    wx.navigateTo({
      url: '/pages/me/wasteRecord/index'
    })
  },
  

})
