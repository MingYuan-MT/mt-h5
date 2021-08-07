//index.js
const app = getApp()
var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
Page({
  data: {
    tabActive: '3',
    // 会议开始结束时间
    meetDate: '',
    startTime: '',
    endTime: '',
    // 当前定位
    tagActive: '1',
    switchTouyingChecked: true,
    switchQiandaoChecked: true,
    isShow: false,
    show: false,

    // 语音内容
    voiceData: '',
    isStarting: false,

    isChangeImage: false
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
    wx.onAccelerometerChange(function (e) {
      console.log('isshow', that.data.isShow)
      if (!that.data.isShow) {
        return
      }
      if (e.x > 1 && e.y > 1) {
        that.timerOut(250)
        that.timerOut(500)
        that.timerOut(750)
        that.timerOut(1000)

        // wx.showToast({
        //   title: '摇一摇成功',
        //   icon: 'success',
        //   duration: 2000
        // })
      }
    })
  },
  timerOut: function(time) {
    let that = this
    setTimeout(() => {
      that.setData({
        isChangeImage: !that.data.isChangeImage
      })
    }, time)
  },
  getNowDate: function(date){
    // return date.toLocaleDateString()
    const year = date.getFullYear()
    const month = date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
    const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
    return [year, month,day].join('-')
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
  onDisplay: function() {
    console.log(111)
    this.setData({ show: true });
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
  }
})
