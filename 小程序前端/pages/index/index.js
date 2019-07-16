//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    publishbooks:[],
    borrowbooks:[],
    tab_index: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
    
  },

  gobookdetail: function (event) {
    var json = event.currentTarget.dataset.book
    wx.navigateTo({
      url: '../../pages/removepublish/index?json=' + JSON.stringify(json),
    })
  },
  //事件处理函数

  selectTab(event) {
    var that = this
    if (event.currentTarget.dataset.index==1){
    wx.request({
      url: "https://jxlbw.cn/travelling-library/selectByborrower.action",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {borrower: app.globalData.openid },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data)
        that.setData({ borrowbook: res.data })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    }
    this.setData({
      tab_index: event.currentTarget.dataset.index
    })
    
  },

  tabChange(event) {
    this.setData({
      tab_index: event.detail.current
    })
  },

  returnbook(event){
    var that=this
    wx.request({
      url: "https://jxlbw.cn/travelling-library/returnBook.action",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { isbn: event.currentTarget.dataset.isbn },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        wx.showToast({
          title: '归还成功',
          duration: 1500
        })
        wx.request({
          url: "https://jxlbw.cn/travelling-library/selectByborrower.action",
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: { borrower: app.globalData.openid },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            console.log(res.data)
            that.setData({ borrowbook: res.data })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      
      
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  
  },
 
  onLoad: function () {
    var that=this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: "https://jxlbw.cn/travelling-library/selectByopenId.action",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {openId: app.globalData.openid },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.setData({publishbooks: res.data })
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
},


)
