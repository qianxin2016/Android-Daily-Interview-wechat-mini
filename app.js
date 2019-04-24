App({
  onLaunch: function () {

  },
  fetchIssues: function(page, callback) {
    wx.request({
      url: this.globalData.GITHUB_URL + '?per_page=30&page=' + page,
      method: 'GET',
      success: res => {
        var issues = {...this.globalData.issues}
        var categories = {...this.globalData.categories}
        for (var i = 0; i < res.data.length; i++) {
          // merge newly fetched issues
          if (issues[res.data[i].number]) {
            continue
          }

          issues[res.data[i].number] = {
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
            categories[label].issues.push(issues[res.data[i].number])
          } else {
            categories[label] = {
              label,
              color: '#' + color,
              issues: [issues[res.data[i].number] ]
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
    GITHUB_URL: 'https://api.github.com/repos/Moosphan/Android-Daily-Interview/issues',
    issues: {},
    categories: {}
  }
})