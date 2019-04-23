//logs.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    comments: []
  },
  onLoad: function (option) {
    wx.request({
      url: app.globalData.GITHUB_URL + '/' + option.number + '/comments',
      method: 'GET',
      success: res => {
        var comments = []
        for (var i = 0; i < res.data.length; i++) {
          comments[i] = {
            replier: res.data[i].user.login,
            avatar: res.data[i].user.avatar_url,
            time: res.data[i].created_at.substring(0, 10),
            content: res.data[i].body
          }
        }

        this.setData({ comments })
      },
      fail: err => {
        console.log(err)
      }
    })
  }
})
