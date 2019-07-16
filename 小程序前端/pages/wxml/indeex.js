//pages/wxml/indeex.js
Page({
  /**
   *
   * 页面的初始数据
   */
  data: {
    book: [],

  },




  gobookdetail: function(event) {
    wx.request({
      url: "https://jxlbw.cn/travelling-library/selectByisbn.action",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        isbn: event.currentTarget.dataset.isbn
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        var json = res.data
        wx.navigateTo({
          url: '../../pages/bookdetail/index?json=' + JSON.stringify(json),
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  //调用微信扫一扫功能
  scanBook: function(e) {
    wx.scanCode({
      success(res) {
        if (res.scanType === 'EAN_13' || res.scanType === 'EAN_10')
        {wx.request({
          url: "https://douban.uieee.com/v2/book/isbn/" + res.result,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {},
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            console.log(res);
            if (res.statusCode == 200) {
              var json = res.data
              wx.navigateTo({
                url: '../../pages/publishbook/index?json=' + JSON.stringify(json),
              })
            }
            else{
              wx.navigateTo({
                url:'../../pages/publishbook/userpublish/index',
              })
            }
          },
          fail: function (res) {
           },
          complete: function(res) {},
        })
        }
        else{
        wx.showModal({
          content: '请扫描书籍条码',
          showCancel: false,
          confirmText: '确定'
        })
        }

      },
      fail(){
        wx.showModal({
          content: '请扫描正确的条码',
          showCancel: false,
          confirmText: '确定'
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: "https://jxlbw.cn/travelling-library/selectBynewbook.action",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        newbook: 0
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          book: res.data
        })
        console.log(res)
      },
      fail: function(res) {},
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