//index.js
const app = getApp()

Page({
  data: {
    tabActive: '1',
    // 会议开始结束时间
    startDate: '',
    endDate: '',
    // 当前定位
    tagActive: '1',
    switchTouyingChecked: true,
    switchQiandaoChecked: true,
  },

  onLoad: function() {
    var that = this;
    this.isShow = true;
  },
  changeTab: function(e) {
    console.log(e)
    this.setData({
      tabActive: e.target.dataset.index
    })
    // wx.onAccelerometerChange(function (e) {
    //   let that = this
    //   console.log('that', that)
    //   console.log(that.tabActive)
    //   if (this.tabActive !== '2') {
    //     return
    //   }
    //   console.log(e.x)
    //   console.log(e.y)
    //   console.log(e.z)
    //   if (e.x > 1 && e.y > 1) {
    //     wx.showToast({
    //       title: '摇一摇成功',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   }
    // })


  },
  // 开始时间
  changeStartDate: function(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  // 结束时间
  changeEndDate: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  // 当前定位
  changeTag: function(e) {
    console.log(e)
    this.setData({
      tagActive: e.target.dataset.index
    })
  },
  // 投影
  switchTouying: function(e) {
    console.log(e)
    this.setData({
      switchTouyingChecked: !e.target.dataset.index
    })
  },
  // 签到
  switchQiandao: function(e) {
    console.log(e)
    this.setData({
      switchQiandaoChecked: !e.target.dataset.index
    })
  },
})
