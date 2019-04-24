App({
  onLaunch: function () {

  },
  fetchIssues: function(callback) {
    wx.request({
      url: this.globalData.GITHUB_URL,
      method: 'GET',
      success: res => {
        var issues = []
        var categories = {}
        for (var i = 0; i < res.data.length; i++) {
          issues[i] = {
            number: res.data[i].number,
            time: res.data[i].created_at.substring(0, 10),
            author: res.data[i].user.login,
            title: res.data[i].title.substring(11)
          }

          var label = '其他'
          var color = '333333'
          const { labels } = res.data[i]
          if (labels.length !== 0) {
            label = labels[0].name
            color = labels[0].color
          }
          if (categories[label]) {
            categories[label].issues.push(issues[i])
          } else {
            categories[label] = {
              label,
              color: '#' + color,
              issues: [ issues[i] ]
            }
          }
        }

        this.globalData.issues = issues
        this.globalData.categories = categories
        if (callback) {
          callback(issues, categories)
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  globalData: {
    GITHUB_URL: 'https://api.github.com/repos/Moosphan/Android-Daily-Interview/issues?per_page=20&page=1',
    issues: [],
    categories: {}
  }
})