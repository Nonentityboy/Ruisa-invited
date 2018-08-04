var amapFile = require('../../../libs/amap-wx.js');
var config = require('../../../libs/config.js');
var destination = getApp().globalData.destination;
Page({
  data: {
    origin: '1234',
    theorigin: '',
    markers: [],
    distance: '',
    cost: '',
    polyline: []
  },
  onLoad: function (res) {
    var _this = this;
    var latitude;
    var longitude;
    var origin;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: '900cd0384cc848c45188cdbff435c817' });
    console.log(getApp().globalData.destination)
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        _this.setData({
          latitude: res.longitude
        })
        origin = res.longitude + ',' + res.latitude,
        console.log(origin);
        console.log(destination);
        myAmapFun.getDrivingRoute({
          origin: origin,
          destination: getApp().globalData.destination,
          success: function (data) {
            var points = [];
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              var steps = data.paths[0].steps;
              for (var i = 0; i < steps.length; i++) {
                var poLen = steps[i].polyline.split(';');
                for (var j = 0; j < poLen.length; j++) {
                  points.push({
                    longitude: parseFloat(poLen[j].split(',')[0]),
                    latitude: parseFloat(poLen[j].split(',')[1])
                  })
                }
              }
            }
            _this.setData({
              polyline: [{
                points: points,
                color: "#0066ff",
                width: 5
              }]
            });
            if (data.paths[0] && data.paths[0].distance) {
              _this.setData({
                distance: data.paths[0].distance + '米'
              });
            }
            if (data.taxi_cost) {
              _this.setData({
                cost: '打车约' + parseInt(data.taxi_cost) + '元'
              });
            }

          }
        })
      }
    })
  },
  goDetail: function () {
    wx.navigateTo({
      url: '../navigation_car_detail/navigation'
    })
  }
})