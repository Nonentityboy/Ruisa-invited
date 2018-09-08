//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    try {
      var res = wx.getSystemInfoSync()
      console.log(res.model)
      console.log(res.pixelRatio)
      console.log(res.windowWidth)
      console.log(res.windowHeight)
      console.log(res.language)
      console.log(res.version)
      console.log(res.platform)
      this.globalData.windowWidth = res.windowWidth;
      this.globalData.windowHeight = res.windowHeight;
    } catch (e) {
      // Do something when catch error
    }
 },
 onLoad:function(){
   console.log(3333)
   wx.login({
     success: function (res) {
       console.log(3333)
       console.log(res.code)
       if (res.code) {
         wx.request({
           url: '39.106.215.155:8888/mixueshop/test',
           method: 'GET',
           data: {
             code: res.code,
             appid: 'wx12311c8b49f755c2',
             secret: '288a03e084edfc98e56b6017920cec8b',
             grant_type: 'authorization_code'
           },
           header: {
             'content-type': 'application/json'
           },
           success: function (res) {
             console.log('成功')
             wx.request({
               url: '',
               method: 'GET',
               data: {},
               success: function (res) {
                 openid = res.data.openid;
                 console.log(openid)
                 console.log('发送成功')
                 wx.setStorage({
                   key: 'chepai',
                   data: 'res.data.chepai',
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
         })
       }

     }
   })
 },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log(3333)
        console.log(res.code)
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
         }
      })
    }
  },
  globalData: {
    userInfo: null,
    count:0,
    windowWidth: 0,
    id:0,
    windowHeight: 50,
    serviceUrl: 'http://localhost:53658/api',
    destination: "EPI666",
    chepai:'',
    status:'',
    textDesc:'',
    data_time:'',
    start_time:''
  }
})