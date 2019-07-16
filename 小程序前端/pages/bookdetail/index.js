// pages/bookdetail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    book:[],
    collection:true

  },
  
borrow: function (event){
  var that=this
    var arr= wx.getStorageSync('addressList') || [];
    if(arr.length==0){
      wx.navigateTo({ url: '../index/address/index' });
    }
  else{
  wx.request({
    url: "https://jxlbw.cn/travelling-library/borrow.action",
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: {borrower:app.globalData.openid,isbn:that.data.book.isbn },
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      var bor=that.data.book
      bor.borrower = app.globalData.openid
      that.setData({book:bor})
      wx.showToast({
        title: '借阅成功',
        duration: 3000
      })
    },
    fail: function (res) {
      wx.showToast({
        title: '借阅失败',
        duration: 3000
      }) },
    complete: function (res) { },
  })
  }
},


  collect: function (event){
    var that=this
    wx.request({
      url: "https://jxlbw.cn/travelling-library/addcollect.action",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { openid: app.globalData.openid, isbn: this.data.book.isbn },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        wx.showToast({
          title: '收藏成功',
          duration: 3000
        })
        that.setData({collection:false})
      },
      fail: function (res) {
      },
      complete: function (res) { },
    })
  },


  deletecollect: function (event) {
    var that = this
    wx.request({
      url: "https://jxlbw.cn/travelling-library/deletecollect.action",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { isbn: this.data.book.isbn},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        wx.showToast({
          title: '取消收藏成功',
          duration: 3000
        })
        that.setData({ collection: true })
      },
      fail: function (res) {
      },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var b = JSON.parse(options.json);
     
    this.setData({ book:b})
    console.log(this.data.book)
    var that=this
    wx.request({
      url: "https://jxlbw.cn/travelling-library/selectcollect.action",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { openid: app.globalData.openid },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        for(var i=0;i<res.data.length;i++)
        {
          if(res.data[i].isbn==that.data.book.isbn){
            that.setData({collection:false})
            break
          }
        }
      },
      fail: function (res) {
      },
      complete: function (res) { },
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})