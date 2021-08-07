//index.js
const app = getApp()

Page({
  data: {
    array: [
      {
        name: 1
      },
      {
        name: 2
      },
      {
        name: 3
      },
    ],
    index: '',
    startDate: '',
    endDate: '',
    originPerson: '',
    meetingTitle: ''
  },

  onLoad: function() {
    let that = this
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.navigateTo({
          url: '/pages/seize/index'
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
    that.setData({
      startDate: that.getNowTime(new Date()),
      endDate: that.getNextOneHourTime(1),
    })
  },

  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  changeStartDate: function(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  changeEndDate: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  getNowTime: function(time){
    return time.toLocaleTimeString()
  },
  getNextOneHourTime: function(hour) {
    let that = this
    var date = new Date();
    var date1 = new Date().getTime();	// 获取当前时间戳
    let nextOne = new Date(date.setTime(date1 + hour * 3600000));
    return that.getNowTime(nextOne)
  },
  handleSure: function() {
    wx.navigateTo({
      // url: '/pages/seize/seizeSuccess/index'
      url: '/pages/seize/seizeCountdown/index'
    })
  },
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})
