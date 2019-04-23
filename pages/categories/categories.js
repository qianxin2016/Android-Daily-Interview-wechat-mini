const app = getApp()

Page({
  data: {
    categories: [],
  },
  onLoad: function () {
    var categories = Object.keys(app.globalData.categories).map(
      key => { return app.globalData.categories[key] }
    )
    this.setData({ categories })
  },
  showCategory: (e) => {
    wx.navigateTo({
      url: '../category_details/category_details?category=' + e.currentTarget.id
    })
  },
})
