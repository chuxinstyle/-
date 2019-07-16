// pages/scroll-view+swiper/index.js
Page({

  data: {
    tab_index: 0,
    BookClass: ['全部', '文学', '武侠', '言情', '科技'],
    book: [],
    scrollLeft: 0,
    currPage: [1, 1, 1, 1, 1]

  },
  checkCor: function() {
    console.log();
    if (this.data.tab_index > 2) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  gobookdetail: function(event) {

    /*console.log(event.currentTarget.dataset.isbn)
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
    })*/
    var json = event.currentTarget.dataset.book
    wx.navigateTo({
      url: '../../pages/bookdetail/index?json=' + JSON.stringify(json),
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: "https://jxlbw.cn/travelling-library/selectByPage.action",
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      data: {
        bookclass: that.data.BookClass[0],
        currPage: that.data.currPage[0]
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data)
        console.log(res.data.list)
        that.data.book[0] = res.data.list
        that.setData({
          book: that.data.book
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  scroll(event) {
    console.log(event)
  },

  reactBottom() {
    console.log('触底-加载更多')
  },

  //选择类别
  tabChange(event) {
    var that = this
    if (that.data.book[event.detail.current] != null) {} else {
      wx.request({
        url: "https://jxlbw.cn/travelling-library/selectByPage.action",
        header: {
          'content-type': 'application/x-www-form-urlencoded'},
        data: {
          currPage: that.data.currPage[event.detail.current],
          bookclass: that.data.BookClass[event.detail.current]
          },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log(res.data)
          that.data.book[event.detail.current] = res.data.list
          that.setData({
            book: that.data.book
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
    this.setData({
      tab_index: event.detail.current
    })
    this.checkCor()
 },

  // tab栏选择
  selectTab(event) {
    this.setData({
      tab_index: event.currentTarget.dataset.index
    })

  },
  //上拉触底加载
  lower(event) {
    wx.showLoading({
      title: '玩命加载中',
      duration: 1500
    })
    var that = this
    that.data.currPage[event.currentTarget.dataset.n] = that.data.currPage[event.currentTarget.dataset.n] + 1
    that.setData({
      currPage: that.data.currPage
    })
    wx.request({
      url: "https://jxlbw.cn/travelling-library/selectByPage.action",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        currPage: that.data.currPage[event.currentTarget.dataset.n],
        bookclass: that.data.BookClass[event.currentTarget.dataset.n]
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.list == "") {
          wx.showLoading({
            title: '没有更多了',
            duration: 1500
          })
        } else {
          console.log(res.data)
          that.data.book[event.currentTarget.dataset.n] =
            that.data.book[event.currentTarget.dataset.n].concat(res.data.list)
          that.setData({
            book: that.data.book
          })
          // 隐藏加载框
          wx.hideLoading();
        }

      },
      fail: function(res) {},
      complete: function(res) {},
    })



    // 隐藏加载框
    // wx.hideLoading();

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