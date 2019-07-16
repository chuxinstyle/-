const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    book: [],
    nowtext: "书籍种类",
    show: false,
    BookClass: ['文学', '武侠', '言情', '科技'],
  },

  select: function (event) {
    var nowshow = this.data.show
    this.setData({ show: !nowshow })
  },
  selectclass: function (event) {
    var nowshow = this.data.show
    this.setData({ nowtext: event.currentTarget.dataset.class })
    this.setData({ show: nowshow })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var b = JSON.parse(options.json);

    this.setData({ book: b })
    console.log(this.data.book)

  },

  publish: function (event) {
    if (this.data.nowtext == "书籍种类") {
      wx.showModal({
        content: '请选择书籍种类',
        showCancel: false,
        confirmText: '确定'
      }) }
    else {
      wx.request({
        url: "https://jxlbw.cn/travelling-library/publishbook.action",
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          bookname: this.data.book.title, isbn: this.data.book.isbn13,
          bookdetail: this.data.book.summary, writer: this.data.book.author,
          image: this.data.book.image, newbook: 0, bookclass: this.data.nowtext, openId: app.globalData.openid
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          if (res.statusCode == 200) {
            wx.showModal({
              content: '发布成功',
              showCancel: false,
              confirmText: '确定'
            })
          }
          else {
            wx.showModal({
              content: '发布失败，请勿重复发布',
              showCancel: false,
              confirmText: '确定'
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '发布失败',
            success: function () {
              setTimeout(() => {
                wx.hideToast();
              }, 2000);
            },
          });
        },
        complete: function (res) { },
      })
    }
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