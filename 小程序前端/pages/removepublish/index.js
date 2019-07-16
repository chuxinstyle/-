// pages/removepublish/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    book: [],
    show: true,
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var b = JSON.parse(options.json);
    this.setData({
      book: b
    })
    console.log(this.data.book)

  },

  removepublish: function(event) {
    var that=this
    wx.request({
      url: "https://jxlbw.cn/travelling-library/deleteBook.action",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openId: app.globalData.openid,
        isbn: that.data.book.isbn
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.statusCode == 200) {
          wx.showModal({
            content: '取消成功',
            showCancel: false,
            confirmText: '确定'
          })
           that.setData({show:false})
        } else {
          wx.showModal({
            content: '取消失败',
            showCancel: false,
            confirmText: '确定'
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '取消失败',
          success: function() {
            setTimeout(() => {
              wx.hideToast();
            }, 2000);
          },
        });
      },
      complete: function(res) {},
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})