// pages/publishbook/userpublish/index.js
const app = getApp();
Page({
  data: {
    ImageSrc: "",
    nowtext: "书籍种类",
    show: false,
    BookClass: ['文学', '武侠', '言情', '科技'],
    title: "",
    author: "",
    isbn:"",
    pb:true
  },
  select: function(event) {
    var nowshow = this.data.show
    this.setData({
      show: !nowshow
    })
  },
  selectclass: function(event) {
    var nowshow = this.data.show
    this.setData({
      nowtext: event.currentTarget.dataset.class
    })
    this.setData({
      show: nowshow
    })
  },
  titleinput(e) {
    this.setData({
      title: e.detail.value
    })

  },
  authorinput(e) {
    this.setData({
      author: e.detail.value
    })
  },
  isbninput(e) {
    this.setData({
      isbn: e.detail.value
    })
  },



  chooseImage() {
    const self = this

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])
        const imageSrc = res.tempFilePaths[0]
        self.setData({
          ImageSrc: imageSrc
        })
      }
    })
  },

  publish: function(event) {
    var that=this
    if (this.data.nowtext == "书籍种类") {
      wx.showModal({
        content: '请选择书籍种类',
        showCancel: false,
        confirmText: '确定'
      })
    } else {
      wx.uploadFile({
        url: 'https://jxlbw.cn/travelling-library/upload.action', //仅为示例，非真实的接口地址
        filePath: that.data.ImageSrc,
        name: 'file',
        formData: {
          'bookname':that.data.title,
          'isbn': that.data.isbn,
          'writer': that.data.author,
          'newbook': 0,
          'bookclass':that.data.nowtext,
          'openId': app.globalData.openid
        },
        success: function(res) {
          if(res.data=="success"){
          wx.showModal({
            content: '发布成功',
            showCancel: false,
            confirmText: '确定'
          })
          that.setData({pb:false})
          }
          else{
            wx.showModal({
              content: '发布失败',
              showCancel: false,
              confirmText: '确定'
            })
          }
        
        }
      })
    }
  }







})