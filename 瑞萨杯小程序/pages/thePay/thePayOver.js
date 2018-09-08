// pages/thePay/thePayOver.js
const app = getApp()
Page({
  data:{
    total:"",
    delivery:{}
  },
  onLoad: function() {
    this.setData({
      total: app.globalData.total
    })
    console.log("time", app.globalData.deliveryTime);
    //顾客信息
    var delivery = {};
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    this.setData({
      delivery: delivery
    })
  },
  Return:function(){
    wx.redirectTo({
      url: '../navigation/navigation',
    })
  }
})