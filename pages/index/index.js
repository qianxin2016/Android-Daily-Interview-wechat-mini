const app = getApp()

Page({
  data: {
    issues: [],
  },
  onLoad: function () {
    wx.request({
      url: app.globalData.GITHUB_URL,
      method: 'GET',
      success: res => {
        var issues = []
        for (var i = 0; i < res.data.length; i++) {
          issues[i] = {
            number: res.data[i].number,
            time: res.data[i].created_at.substring(0, 10),
            author: res.data[i].user.login,
            title: res.data[i].title.substring(11)
          }
        }

        this.setData({ issues })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showDetails: (e) => {
    wx.navigateTo({
      url: '../logs/logs?number=' + e.currentTarget.id
    })
  },
})
