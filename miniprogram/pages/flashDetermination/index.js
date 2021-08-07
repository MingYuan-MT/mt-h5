//index.js
const app = getApp()
var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
let isYaoYiYao = false
Page({
  data: {
    tabActive: '2',
    // 会议开始结束时间
    meetDate: '',
    startTime: '',
    endTime: '',
    // 当前定位
    tagActive: '1',
    switchTouyingChecked: true,
    switchQiandaoChecked: true,
    isShow: true,
    show: false,

    // 语音内容
    voiceData: '',
    isStarting: false,
    nickName: ''
  },

  onLoad: function() {
    let that = this
    that.initRecord()
    that.setData({
      meetDate: that.getNowDate(new Date()),
      startTime: that.getNowTime(new Date()),
      endTime: that.getNextOneHourTime(1),
    })
    console.log('22', that.data.meetDate)
  },
  onHide: function() {
    let that = this
    that.setData({
      timer: null
    })
  },
  onShow: function() {
    let that = this
    if (that.data.tabActive !== '2') {
      that.setData({
        isShow: false
      })
    } else {
      that.setData({
        isShow: true
      })
    }
    let token = wx.getStorageSync('token');
    let userInfo = wx.getStorageSync('userInfo')
    that.setData({
      nickName: userInfo.nickName
    })
    console.log('token', token)
    wx.onAccelerometerChange(function (e) {
      if (!that.data.isShow) {
        return
      }
      if (e.x > 1 && e.y > 1) {
        if (!isYaoYiYao) {
          isYaoYiYao = true
          wx.showLoading({
            title: '加载中'
          })
          wx.request({
            url: app.apiDomain + '/v1/reserve/shake-lists',
            data: {
              region: '武汉'
            },
            method: 'POST',
            header: {
              'content-type': 'application/json',
              'Authorization': "Bearer " + token,
            },
            success(res) {
              console.log('yaoyiyao返回：', res)
              isYaoYiYao = false
              that.setData({
                isShow: false
              })
              wx.setStorageSync('meetsData', res.data.data.B3)
              wx.hideLoading()
              wx.navigateTo({
                url: '/pages/flashDetermination/quickReservation/index'
              })

            }
          })

        }
        
      }
    })
  },
  getNowDate: function(date){
    // return date.toLocaleDateString()
    const year = date.getFullYear()
    const month = date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
    const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
    return [year, month,day].join('-')
  },
  getNowTime: function(time){
    // return time.toLocaleTimeString()
    let hour = time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()
    let minute = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
    return [hour, minute].join(':')
  },
  getNextOneHourTime: function(hour) {
    let that = this
    var date = new Date();
    var date1 = new Date().getTime();	// 获取当前时间戳
    let nextOne = new Date(date.setTime(date1 + hour * 3600000));
    return that.getNowTime(nextOne)
  },
  changeTab: function(e) {
    console.log(e)
    this.setData({
      tabActive: e.target.dataset.index
    })
    console.log('e.target.dataset.index', e.target.dataset.index)
    if (e.target.dataset.index !== '2') {
      this.setData({
        isShow: false
      })
    } else {
      this.setData({
        isShow: true
      })
    }

  },
  // 会议日期
  changeMeetDate: function(e) {
    console.log('meetDate', e)
    this.setData({
      meetDate: e.detail.value
    })
  },
  // 开始时间
  changeStartTime: function(e) {
    console.log('startTime', e)
    this.setData({
      startTime: e.detail.value
    })
  },
  // 结束时间
  changeEndTime: function(e) {
    console.log('endTime', e)
    this.setData({
      endTime: e.detail.value
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
      switchTouyingChecked: e.detail.value
    })
  },
  // 签到
  switchQiandao: function(e) {
    console.log(e)
    this.setData({
      switchQiandaoChecked: e.detail.value
    })
  },
  // 确认
  handleSure: function() {
    let that = this
    let token = wx.getStorageSync('token');
    wx.request({
      url: app.apiDomain + '/v1/reserve/condition-lists',
      data: {
        start_time: that.data.meetDate + ' ' + that.data.startTime,
        end_time: that.data.meetDate + ' ' + that.data.endTime,
        region: '武汉',
        is_shadow: that.data.switchTouyingChecked == true ? 1 : 0,
        is_need_sigin: that.data.switchQiandaoChecked == true ? 1 :0
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      success(res) {
        wx.navigateTo({
          url: '/pages/flashDetermination/quickReservation/index'
        })
        wx.setStorageSync('meetsData', res.data.data.B3)
      }
    })
  },



  // 初始化语音监听事件
  initRecord: function() {
    let that = this
    manager.onRecognize = function(res) {
      console.log("current result", res.result)
    }
    manager.onStop = function(res) {
      console.log("record file path", res.tempFilePath)
      console.log("result", res.result)
      that.setData({
        voiceData: res.result
      })
    }
    manager.onStart = function(res) {
      console.log("成功开始录音识别", res)
    }
    manager.onError = function(res) {
      console.error("error msg", res.msg)
    }
  },

  // 语音开始
  touchStart: function() {
    console.log('start')
    let that = this
    manager.start({duration:30000, lang: "zh_CN"})
    that.setData({
      isStarting: true
    })
  },
  // 语音结束
  touchEnd: function() {
    let that = this
    manager.stop()
    that.setData({
      isStarting: false
    })

    let token = wx.getStorageSync('token');
    console.log('token', token)
    wx.request({
      url: app.apiDomain + '/v1/reserve/voice-lists',
      data: {
        text: that.data.voiceData
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      success(res) {
        console.log('语音返回：', res)
        if (res.data.code === 200) {
          wx.setStorageSync('meetsData', res.data.data.B3)
          wx.navigateTo({
            url: '/pages/flashDetermination/quickReservation/index'
          })
        } else {
          wx.showToast({
            title: '语音识别失败！',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  }
})
