//index.js
const app = getApp()
var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
let _animation;
let _animationIndex;
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
    isShow: false,
    show: false,

    // 语音内容
    voiceData: ''
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
  onShow: function() {
    let that = this
    // 初始化动画
    _animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
    // 初始化重力感应
    wx.onAccelerometerChange(function (e) {
      console.log('isshow', that.data.isShow)
      if (!that.data.isShow) {
        return
      }
      if (e.x > 1 && e.y > 1) {
        this.startAnimationInterval()
        wx.showToast({
          title: '摇一摇成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  /**
  * 实现image旋转动画，每次旋转 120*n度
  */
  rotateAni: function (n) {
    _animation.rotate(120 * (n)).step()
    this.setData({
      animation: _animation.export()
    })
  },

  /**
   * 开始旋转
   */
  startAnimationInterval: function () {
  var that = this;
    that.rotateAni(++_loadImagePathIndex); // 进行一次旋转
      _animationIntervalId = setInterval(function () {
        that.rotateAni(++_loadImagePathIndex);
    },  500); // 没间隔_ANIMATION_TIME进行一次旋转
  },

  /**
   * 停止旋转
   */
  stopAnimationInterval: function () {
    if (_animationIntervalId> 0) {
        clearInterval(_animationIntervalId);
        _animationIntervalId = 0;
    }
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
    manager.start({duration:30000, lang: "zh_CN"})
  },
  // 语音结束
  touchEnd: function() {
    manager.stop()
      }
  })

