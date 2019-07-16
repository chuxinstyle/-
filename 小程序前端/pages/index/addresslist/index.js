// pages/index/address/index.js
const app = getApp()
Page({

  /**页面的初始数据 */
  data: {
    arr:[],
    addressList: []
    

  },

  /*生命周期函数--监听页面加载*/

  onLoad: function (options) {
     var that=this
       that.data.arr = wx.getStorageSync('addressList') || [];
   
    console.log(that.data.arr);
    if(that.data.arr.length==0){
      wx.request({
        url: "https://jxlbw.cn/travelling-library/addresslist.action",
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: { openid: app.globalData.openid },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
         that.setData({ addressList: res.data})
          wx.setStorageSync('addressList', res.data);
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    else {
      that.setData({
        addressList: that.data.arr
      });}

    // 更新数据  
    
  
   
    
  },



  /**生命周期函数--监听页面显示 */
  onShow: function () {

    this.onLoad();

  },

  addAddress: function () {

    wx.navigateTo({ url: '../address/index' });

  },

  /* 删除item */

  delAddress: function (e) {
    console.log(e)
    wx.request({
      url: "https://jxlbw.cn/travelling-library/deleteaddress.action",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { address: this.data.addressList[e.target.dataset.id].address,openid: app.globalData.openid },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        
      },
      fail: function (res) { },
      complete: function (res) { },
    })


    
    this.data.addressList.splice(e.target.id.substring(3), 1);

    // 更新data数据对象  

    if (this.data.addressList.length > 0) {

      this.setData({

        addressList: this.data.addressList

      })
      wx.setStorageSync('addressList', this.data.addressList);

    } else {

      this.setData({

        addressList: this.data.addressList

      })
      wx.setStorageSync('addressList', []);

    }
  }
})