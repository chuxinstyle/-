var app = getApp();
var addressList = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  
  },



  saveAddress: function (e) {
    var consignee = e.detail.value.consignee;//姓名
    var mobile = parseInt(e.detail.value.mobile);//电话号码
    var address = e.detail.value.address;//详细地址
console.log(consignee+mobile+address)
    wx.request({
      url: "https://jxlbw.cn/travelling-library/address.action",
      header: { 'content-type': 'application/x-www-form-urlencoded'  },
      data: {name:consignee,mobile:mobile,address:address,openid: app.globalData.openid },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(consignee + mobile + address); //输出该文本 
          var arr = wx.getStorageSync('addressList') || [];
          console.log("arr,{}", arr);
          addressList = {
            consignee: consignee,
            mobile: mobile,
            address: address,
          }
          arr.push(addressList);
          wx.setStorageSync('addressList', arr);
          wx.navigateBack({
          })
          }
          else{
        wx.showModal({
          content: '已有地址信息，请先删除在添加',
          showCancel: false,
          confirmText: '确定'
        })
          }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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