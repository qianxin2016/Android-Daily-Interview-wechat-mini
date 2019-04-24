const app = getApp()

Page({
  data: {
    issues: [],
    page: 1
  },
  onLoad: function () {
    if (Object.keys(app.globalData.issues).length === 0) {
      app.fetchIssues(this.data.page, (issues, categories) => {
        this.setData({ issues: this.mapToArray(issues) })
      })
    } else {
      this.setData({ issues: this.mapToArray(app.globalData.issues) })
    }
  },
  mapToArray: (issues) => {
    return Object.keys(issues).map(
      number => { return issues[number] }
    )
  },
  showDetails: (e) => {
    wx.navigateTo({
      url: '../issue_details/issue_details?number=' + e.currentTarget.id
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    app.fetchIssues(1, (issues, categories) => {
      this.setData({ issues: issues })
    })
  },
  onReachBottom: function () {
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    })
    app.fetchIssues(this.data.page + 1, (issues, categories) => {
      this.setData({
        issues: issues,
        page: this.data.page + 1
      })
    })
  }
})
