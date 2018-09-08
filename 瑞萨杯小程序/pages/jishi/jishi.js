var textDesc = getApp().globalData.textDesc;
var util = require("../../utils/util.js");
var app = getApp();
var id = getApp().globalData.id;
var setdestination = getApp().globalData.setdestination;
var count = getApp().globalData.count;
Page({
  data:{
    timer: "00:00",
    isRunning: false,
    color: 'black',
    tips: '长按屏幕任意位置离开后开始计时',
    formula: '',
    showTips: true,
    showFormula: true,
    showModalStatus: false,
    hiddenmodal: true,
    nocancel:true,
    num:0,
    hours:0,
    mins:0,
    seconds:0,
    cost: 0,
    timer:'',
    tim:0,
   show:'',
   image: 'http://imgx.xiawu.com/xzimg/i4/2775678607/TB2.KhkkXXXXXc6XpXXXXXXXXXX_!!2775678607.jpg'
  },
  click: function () {
    console.log('hahah')
    var that = this;
    var show;
   wx.scanCode({
     onlyFromCamera:true,
      success: (res) => {
        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 2000
    })
  },
  listenerButton:function(){
    console.log(getApp().globalData.id);
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您是否已离开？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'http://222.24.14.38:8080/ThreadStatus',
            header: {
              'content-type': 'json' // 默认值
            },
            method: 'GET',
            data: {
              id: getApp().globalData.setdestination.id,
            },
            success: function (res) {
              console.log(res.data)
              if(res.data === 1){
                  wx.showToast({
                  title: '请检测您的车辆',
                  icon: "loading"
                })
              }
              else if (res.data !== 1) {
                wx.request({
                  url: 'http://222.24.14.38:8080/upDateHistoryEnd',
                  header: {
                    'content-type': 'json' // 默认值
                  },
                  method: 'GET',
                  data: {
                    endTime: "2018-8-24 22:52",
                    count: getApp().globalData.count,
                    payStatus: 0,
                    price: "13"
                  },
                })
                wx.reLaunch({
                  url: '../thePay/thePay',
                })
              }
              // if (res.data !== 1) {
              //   wx.showToast({
              //     title: '未检测您的车辆',
              //     icon: "loading"
              //   })
              // }
              // else if (res.data === 1) {
              //   wx.reLaunch({
              //     url: '../thePay/thePay',
              //   })
              // }
            }
          })
          // wx.request({
          //   url: 'http://222.24.14.38:8080/upDateHistoryEnd',
          //   header: {
          //     'content-type': 'json' // 默认值
          //   },
          //   method: 'GET',
          //   data: {
          //     endTime: "2018-8-24 22:52",
          //     id: getApp().globalData.id,
          //     payStatus: 0,
          //     price: "13"
          //   },
          //   success: function (res) {
          //     console.log(res)
          //     // if (res.data !== 1) {
          //     //   wx.showToast({
          //     //     title: '未检测您的车辆',
          //     //     icon: "loading"
          //     //   })
          //     // }
          //     // else if (res.data === 1) {
          //     //   wx.reLaunch({
          //     //     url: '../thePay/thePay',
          //     //   })
          //     // }
          //   }
          // })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }

 })
    that.setData({
      hiddenmodal:!this.data.hiddenmodal
    })
  },
  Confirm: function () {
    this.setData({
      hiddenmodal:true
    })
  },
 getData: function (e) {
   var that = this;
   wx.request({
     url: 'http://222.24.14.38:8080/StopParking',
     method: 'GET',
     headers: {
       'Content-Type':'application/json'
      },
           success: function (res) {
              if (1 === res.data) {
               console.log(res.data)
               Countdown();
               charging();
             }
               var num = 0;
               function Countdown() {
                  console.log()
                 var timer = setInterval(function () {
                   num++;
                    that.setData({ num: num })
                    var mins = 0, seconds = 0, hours = 0;
                    if (num < 60) {
                      var seconds = num % 60
                    } else if (num < 3600) {
                      var mins = parseInt(num / 60)
                      var seconds = num % 60
                    } else {
                      var mins = parseInt(num / 60)
                      var seconds = num % 60
                      var hours = parseInt(mins / 60)
                      var mins = mins % 60
                    }
                    that.setData({
                      hours: hours ,
                      mins: mins ,
                      seconds: seconds,
                      timer:timer
                    });
                  }, 1000)
                }
   },
        fali:function(){
     }
   })
   
var cost=1;
 function charging() {
      var cleartime = setInterval(function () {
        cost++;
        clearInterval(cleartime);
        that.setData({ cost: cost });
        console.log(cost)
        charging();
      }, 100000)
    } charging();
},
  onLoad: function (e) {
    let that = this
    this.endTime = e.timeStamp;
    if (this.endTime - this.startTime < 350) {
      // clear timer
      this.timers && clearInterval(this.timers);
    } else if (this.data.showTips == true && that.data.showModalStatus == false) {
      this.formatTime(this);
      this.setData({
        showTips: false,
        showFormula: false
      });
    }
  },
  timeUp: function (callback) {
    let _this = this
    let n = 0, timeee = '';
    let hour, minute, second;//时 分 秒
    hour = minute = second = 0;//初始化
    let millisecond = 0;//毫秒
    _this.timers = setInterval(function () {
      millisecond = millisecond + 50;
      if (millisecond >= 1000) {
        millisecond = 0;
        console.log(millisecond);
        second = second + 1;
      }
      if (second >= 60) {
        second = 0;
        minute = minute + 1;
      }
      if (minute >= 60) {
        minute = 0;
        hour = hour + 1;
      }
      if (minute == 0 && second < 60) {
        timeee = _this.toDub(second) + ':' + _this.toDus(millisecond)
      } else {
        timeee = _this.toDub(minute) + ':' + _this.toDub(second) + ':' + _this.toDus(millisecond);
      }
      callback(timeee);
    }, 50);
  },
  formatTime: function (that) {
    this.timeUp(function (val) {
      that.setData({
        timer: val
      });
    })
  },
  toDus: function (n) {
    if (n >= 50 && n < 100) {
      n = "" + n
    } else if (n > 100 && n < 1000) {
      n = "" + n
    } else if (n == 0) {
      n = "" + n
    }
    return n;
  },
  toDub: function (n) {
    return n < 10 ? "0" + n : "" + n;
  },
})

