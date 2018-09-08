const app = getApp();
var time = require('../../utils/util.js');
Page({
  data: {

  },
  onLoad: function () {
    let userOpenid = app.globalData.userOpenid;
    console.log(userOpenid)
    var _this = this;
    wx.request({
      url: 'https://epi.xuejietech.cn/mixueshop/UserHistory',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data:{
        OpenID: "o6dn05XUdo6FadipxXS5p6vPZE7Y",
      },
      success: function (resInfo) {
        console.log(resInfo)
        _this.setData({
          historyList: resInfo.data
        })
      }
    })
  },
  goToComment: function () {
    wx.navigateTo({
      url: '../navigation/navigation',
    })
  }
})