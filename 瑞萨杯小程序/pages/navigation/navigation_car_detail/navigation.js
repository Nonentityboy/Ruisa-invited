var amapFile = require('../../../libs/amap-wx.js');
var config = require('../../../libs/config.js');
var destination = getApp().globalData.destination;
Page({
  data: {
    steps: {}

  },
  onLoad: function () {
    var origin;
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: '900cd0384cc848c45188cdbff435c817' });
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        console.log(latitude);
        origin = res.longitude + "," + res.latitude;
        console.log(origin);
        console.log(getApp().globalData.destination);
        myAmapFun.getDrivingRoute({
          origin: origin,
          destination: getApp().globalData.destination,
          success: function (data) {
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              that.setData({
                steps: data.paths[0].steps
              });
            }
          },
        })
      }
    })
  }
})