//index.js
const app = getApp()

Page({
  data: {
    meetsData: []
  },
  onShow: function() {
    let that = this
    let storList = wx.getStorageSync('meetsData')
    console.log('str=====.》', storList)
    console.log('str=====.》222', Object.keys(storList))
    let list = []
    Object.keys(storList).map((item) => {
      list.push({
        floor: item,
        list: storList[item],
      })
    })
    console.log('list====>', list)
    that.setData({
      meetsData: list
    })
    
  },
  onLoad: function() {

  },
  handleReservation: function(e) {
    console.log(e)
    let token = wx.getStorageSync('token');
    let record = e.target.dataset.index
    wx.request({
      url: app.apiDomain + '/v1/reserve/add',
      data: {
        start_time: record.start_time,
        end_time: record.end_time,
        room_id: record.id,
        is_need_sign: record.is_need_sign,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      success(res) {
        wx.setStorageSync('currentMeet', res.data.data)
        wx.navigateTo({
          url: '/pages/flashDetermination/reservationSuccess/index'
        })
        console.log('res', res)
      }
    })
  }
})
