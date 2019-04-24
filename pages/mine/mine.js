const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  about: () => {
    wx.navigateTo({
      url: '../about/about'
    })
  },
  history: () => {

  }
})
