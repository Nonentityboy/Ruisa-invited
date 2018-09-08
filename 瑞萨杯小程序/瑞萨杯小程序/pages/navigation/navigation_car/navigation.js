var amapFile = require('../../../libs/amap-wx.js');
var config = require('../../../libs/config.js');
var destination = getApp().globalData.destination;
var setdestination = getApp().globalData.setdestination;
var status = getApp().globalData.status;
var id = getApp().globalData.id;
var count = getApp().globalData.count;
var start_time = getApp().globalData.start_time;
Page({
  data: {
    origin: '1234',
    markers: [],
    theorigin: '',
    distance: '',
    cost: '',
    polyline: []
  },
  onLoad: function (res) {
    var _this = this;
    var markers = [];
    var setdestination = getApp().globalData.setdestination;
    markers.push(setdestination);
    _this.setData({
      markers: markers,
    })
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
    var e = getApp().globalData.setdestination.id;
    console.log(e);
    this.markertap(e);
  },
  markertap:function(e){
    console.log(e)
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getDate();
    var minute = date.getDate();
    getApp().globalData.start_time = year + "-" + month + '-' + day + ' ' + hour + ':' + minute; 
    wx.showModal({
      title: '提示',
      content: '您是否已经停好车？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'http://222.24.14.38:8080/ThreadStatus',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            id: getApp().globalData.setdestination.id,
          },
          success: function (res) {
            console.log(res.data)
            getApp().globalData.id = res.data;
            console.log(getApp().globalData.id)
            if (res.data !== 1){
              wx.showToast({
                title: '未检测您的车辆',
                icon:"loading"
              })
            }
            else if (res.data === 1){
                     
              wx.request({
                url: 'http://222.24.14.38:8080/upDateHistoryStart',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                data: {
                  OpenID:"123465",
                  mapId: getApp().globalData.setdestination.id,//点id
                  start_time: getApp().globalData.start_time //停好车的时间
                },
                success:function(res){
                  getApp().globalData.count = res.data;
                }
              })
              wx.reLaunch({
                url: '../../jishi/jishi',
              })
            }
          }
          })
          // wx.request({
          //   url: 'http://epigroup.tech:8888/mixueshop/Bechoosen',
          //   method: 'GET',
          //   header: {
          //     'content-type': 'application/json' // 默认值
          //   },
          //   data: {
          //     id: markerData[i].id
          //   },
          //   success: function (res) {
          //     getApp().globalData.setdestination = markerData[i],
          //       getApp().globalData.destination = markerData[i].longitude + ',' + markerData[i].latitude;
          //     getApp().globalData.status = markerData[i].status,
          //       console.log(getApp().globalData.destination)
          //     wx.navigateTo({
          //       url: 'navigation_car/navigation',
          //     })
          //   }
          // })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    // wx.request({
    //  // url: 'https://epi.xuejietech.cn/mixueshop/ThreadStatus',
    //   //222.24.14.38: 8080 
    //   url: 'https://222.24.14.38: 8080/mixueshop/ThreadStatus',
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   data: {
    //     id: getApp().globalData.setdestination.id,
    //   },
    //   success: function (res) {

    // }
    // })
  },
//   markerRecord:function(e){
//     var _this = this;
//     var markerSet = getApp().globalData.setdestination;
//     console.log(markerSet);
//    // getApp().globalData.setdestination.push()
//       if (getApp().globalData.status === 2) {
//     wx.request({
//      // url: 'https://epi.xuejietech.cn/mixueshop/ThreadStatus',
//       //222.24.14.38: 8080 
//       url: 'https://222.24.14.38: 8080/mixueshop/ThreadStatus',
//       method: 'GET',
//       header: {
//         'content-type': 'application/json' // 默认值
//       },
//       data: {
//         id: getApp().globalData.setdestination.id,
//       },
//       success: function (res) {
//         console.log(res.data)
//         getApp().globalData.status = res.data;
//         if(res.data === 1){
//           wx.navigateTo({
//             url: '../../jishi/jishi',
//           })
//           return
//         }
//         else {
//           return
//         }
//       },
//       //_this.markerRecord(markerSet.id),
//       fail: function (res) { },
//       complete: function (res) { },
//     })
//       }
//     console.log(getApp().globalData.status)
//  //   getApp().globalData.status
//      _this.markerRecord(markerSet.id)
    
//   },
  goDetail: function () {
    wx.navigateTo({
      url: '../navigation_car_detail/navigation'
    })
  }
})