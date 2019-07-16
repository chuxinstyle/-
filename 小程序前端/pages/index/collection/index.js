// pages/index/collection/index.js
const app = getApp()
Page({
  data: {
    collectbook: []
  },
  onLoad: function(options) {
    var that = this
    wx.request({
      url: "https://jxlbw.cn/travelling-library/selectcollectbook.action",
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      data: {
        openid: app.globalData.openid
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data)
        that.setData({
          collectbook: res.data
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  gobookdetail: function(event) {
    var json = event.currentTarget.dataset.book
    wx.navigateTo({
      url: '../../bookdetail/index?json=' + JSON.stringify(json),
    })
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },




})