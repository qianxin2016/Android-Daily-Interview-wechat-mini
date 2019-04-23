const app = getApp()

Page({
  data: {
    issues: [],
  },
  onLoad: function (option) {
    if (app.globalData.issues.length === 0) {
      app.fetchIssues((issues, categories) => {
        this.setData({ issues })
      })
    } else {
      this.setData({ issues: app.globalData.issues })
    }
  },
  showDetails: (e) => {
    wx.navigateTo({
      url: '../issue_details/issue_details?number=' + e.currentTarget.id
    })
  },
})
