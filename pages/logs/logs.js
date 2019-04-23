const app = getApp()

const Towxml = require('../../towxml/main')
const towxml = new Towxml()

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
          var content = towxml.toJson(res.data[i].body, 'markdown')
          content.theme = 'main'
          comments[i] = {
            replier: res.data[i].user.login,
            avatar: res.data[i].user.avatar_url,
            time: res.data[i].created_at.substring(0, 10),
            content
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
