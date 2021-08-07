//index.js
const app = getApp()

Page({
  data: {
    room_info:'',
    index: '',
    startDate: '',
    endDate: '',
    originPerson: '',
    meetingTitle: '',
    can_seize: false // 是否可抢占
  },

  onLoad: function(options) {
    let scene = decodeURIComponent(options.scene);
    let room_id = 0
    if(scene != 'undefined'){
      let params=scene.split("&")[1];
      room_id=params.split('=')[1];
    }
    if(room_id <= 0){
      wx.showToast({
        title: '参数错误！',
        icon: 'error',
        duration: 2000
      })
      return
    }
    let token = wx.getStorageSync('token');
    console.log('token',token)
    let that = this;
    wx.request({
      url: app.apiDomain + '/v1/seize/metting-info',
      data: {
        id: room_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token,
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
            let room_info = ''
            room_info = result.data.floor + '楼-' + result.data.name  + '（'
            if(result.data.room_uses){
              room_info = room_info + result.data.room_uses
            }
            room_info = room_info + ' 预计' + result.data.capacity + '人）';
            that.setData({
              room_info: room_info,
              startDate: result.data.metting_start_time,
              endDate: result.data.metting_end_time,
              originPerson: result.data.moderator,
              meetingTitle:result.data.subject,
              meeting_id:result.data.metting_id,
              room_id:result.data.room_id,
              subject:result.data.subject
            });
            if(result.data.seize_code != 0){
              that.setData({
                can_seize:true
              })
              wx.showToast({
                title: '会议室不可抢占',
                icon: 'error',
                duration: 2000
              })
            }
          }
        }else{
          wx.showToast({
            title: result.message,
            icon: 'error',
            duration: 2000
          })
        }
      }
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
  // 确认抢占
  handleSure: function() {
    let token = wx.getStorageSync('token');
    let that = this,room_id = that.data.room_id,meeting_id = that.data.meeting_id,subject = that.data.subject;
    wx.request({
      url: app.apiDomain + '/v1/seize/confirm',
      data: {
        room_id: room_id,
        metting_id: meeting_id,
        subject: subject,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      success(res) {
        let result = res.data;
        if(result.code == 200){
          let seize_end_time = result.data.seize_end_time
          wx.navigateTo({
            url: './seizeSuccess/index?time=' + seize_end_time,
          })
        }else{
          wx.showToast({
            title: result.error,
            icon: 'error',
            duration: 2000
          })
        }
      }
    });
  },
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})
