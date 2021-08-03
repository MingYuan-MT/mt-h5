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
})
