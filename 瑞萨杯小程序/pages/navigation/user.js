// pages/user/user.js
var app = getApp();
Page({
  data: {
    userInfo: {},
    avatarUrl: ""
  },
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function (info) {
      console.log(info)
      that.setData({
        userInfo: info,
        avatarUrl: info.avatarUrl
      })
    })
  },
  
})