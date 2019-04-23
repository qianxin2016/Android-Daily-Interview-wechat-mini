const app = getApp()

Page({
  data: {
    issues: [],
  },
  onLoad: function (option) {
    if (option.category) {
      var category = app.globalData.categories[option.category]
      this.setData({ issues: [...category.issues] })
    }
  },
  showDetails: (e) => {
    wx.navigateTo({
      url: '../issue_details/issue_details?number=' + e.currentTarget.id
    })
  },
})
