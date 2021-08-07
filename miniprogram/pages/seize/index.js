//index.js
const app = getApp()

Page({
  data: {
    room_info:'',
    index: '',
    startDate: '',
    endDate: '',
    originPerson: '',
    meetingTitle: ''
  },

  onLoad: function() {
    let id = 6;
    let token = wx.getStorageSync('token');
    let that = this;
    wx.request({
      url: app.apiDomain + '/v1/seize/metting-info',
      data: {
        id: id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token.token,
      },
      success(res) {
        let result = res.data;
        if(result.code == 200){
          if(result.seize_code == 5){
            wx.navigateTo({
              url: 'sizeCountdown?id=1',
              events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                acceptDataFromOpenedPage: function(data) {
                  console.log(data)
                },
                someEvent: function(data) {
                  console.log(data)
                }
              },
              success: function(res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
              }
            })
          }else{
            console.log(result.data.floor)
            let room_info = ''
            room_info = result.data.floor + '楼-' + result.data.name  + '（'
            if(result.data.room_uses){
              room_info = room_info + result.data.room_uses
            }
            room_info = room_info + '预计' + result.data.capacity + '人）';
            that.setData({
              room_info: room_info,
              startDate: result.data.metting_start_time,
              endDate: result.data.metting_end_time,
              originPerson: result.data.moderator,
              meetingTitle:result.data.subject
            });
            if(result.data.seize_code != 0){
              wx.showToast({
                title: '会议室不可抢占',
                icon: 'error',
                duration: 2000
              })
            }
          }
        }else{
          wx.showToast({
            title: result.error,
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
    
    // that.setData({
    //   startDate: that.getNowTime(new Date()),
    //   endDate: that.getNextOneHourTime(1),
    // })
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
