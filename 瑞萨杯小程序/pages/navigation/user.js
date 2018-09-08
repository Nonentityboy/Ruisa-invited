// pages/user/user.js
var hours = getApp().globalData.hours;
var mins = getApp().globalData.mins;
var total_cost = getApp().globalData.total_cost;
var seconds = getApp().globalData.seconds;
var local_name= getApp().globalData.local_name;
var data_time = getApp().globalData.local_time;
var chepai = getApp().globalData.chepai;
var app = getApp();

Page({
  data: {
    chepai:'',
    userInfo: {},
    time:'',
    denglu:'false',
    avatarUrl: ""
  }, 
  bindViewTap: function () {
    wx.navigateTo({
      url: '../jishi/jishi'
    })
  },
  onLoad: function (options) {
    console.log(options)
    var that=this
    that.setData({
      denglu:false
    })
    console.log(3333)
    wx.login({
      success: function (res) {
        console.log(res)
        var code=res.code
        if (res.code) {
              wx.request({
                url: 'http://222.24.14.38:8080/UserHistory',
                method: 'GET',
                data: {
                code:code
                },
                success: function (res) {
                  console.log('发送成功')
                  console.log(555)
                  console.log(res)
                  wx.setStorage({
                    key: 'chepai',
                    data: res.data.chepai,
                  })
                  wx.getStorage({
                    key: 'chepai',
                    success: function (res) {
                      console.log(res)
                      that.setData({
                        denglu: true,
                        chepai: res.data.chepai
                      })
                    }
                  })
                }
              })


              /*// 保存openId，并将用户信息发送给后端
              if (res.code === 0) {
                wx.showModal({
                  title: 'set openid',
                  content: res.data,
                })
              } else {
                wx.showModal({
                  title: 'Sorry',
                  content: '用户登录失败~',
                })
              }*/
            }
        }
    })
  app.globalData.data_time=that.data.time;
    app.getUserInfo(function (info) {
      console.log(info)
      that.setData({
        userInfo: info,
        avatarUrl: info.avatarUrl
      })
    })
  },
  onShow: function () {
    var chepai = wx.getStorageSync('chepai')
    this.setData({
      chepai: chepai,
      denglu:true
    })
  },
  
})