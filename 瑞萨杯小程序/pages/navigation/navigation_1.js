var app = getApp()
var prom = require("../../utils/prom.js");
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var destination = getApp().globalData.destination;
var markersData = [];
var markerdata = [];
Page({
  data: {
    markers: [
      
    ],
    longitude :'',
    latitude:'',
    title:'',
    controls: [
    {
      id: 1,
      iconPath: "../../img/find.png",
      position: {
        left:110,
        top:305,
        width: 160,
        height: 160
      },
      clickable: true
    },
    {
      id: 2,
      iconPath: "../../img/people.png",
      position: {
        left: 310,
        top: 405,
        width:50,
        height:50
      },
      clickable: true
    },
    {
      id: 3,
      iconPath: "../../img/location.png",
      position: {
        left: 20,
        top: 400,
        width: 55,
        height: 55
      },
      clickable: true
    },
    ],
    latitude: '',
    longitude: '',
    textData: {},
    city: ''
  },
  moveToLocation: function () {
    var that = this;
    this.mapCtx.moveToLocation()
    wx.getLocation({
      success: function (res) {
        console.log(res)
        console.log(res.latitude + ',' + res.longitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
 /* makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markerdata, id);
    that.changeMarkerColor(markerdata, id);
  },*/
  onLoad: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
    this.moveToLocation();
    var _this = this;
    wx.getSystemInfo(
      {
        success: function (res) {
          var _innerWidth = res.windowWidth
          _this.data.controls.forEach(function (item) {
            item.position.left = (item.position.left / 375) * _innerWidth
            item.position.top = (item.position.top / 375) * _innerWidth
            item.position.width = (item.position.width / 375) * _innerWidth
            item.position.height = (item.position.height / 375) * _innerWidth
          })
          _this.setData(
            {
              controls: _this.data.controls
            }
          )
        }
      }
    )
   var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: '900cd0384cc848c45188cdbff435c817'});
   var params = {
    iconPathSelected: '../../img/marker_checked.png',
      iconPath: '../../img/marker.png',
      success: function (data) {
        markersData = data.markers;
        var poisData = data.poisData;
       var markers_new = [];
        markerdata.forEach(function (item, index) {
          markers_new.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: item.iconPath,
            width: item.width,
            height: item.height
          })
        })
        if (markersData.length > 0) {
         that.setData({
            markers: markers_new
          });
          that.setData({
            city: poisData[0].cityname || ''
          });
          that.setData({
           latitude: markersData[0].latitude
          });
          that.setData({
            longitude: markersData[0].longitude
          });
          that.showMarkerInfo(markersData, 0);
        } else {
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              that.setData({
                latitude: res.latitude
              });
              that.setData({
                longitude: res.longitude
              });
              that.setData({
                city: '北京市'
              });
            },
            fail: function () {
              that.setData({
                latitude: 39.909729
              });
              that.setData({
                longitude: 116.398419
              });
              that.setData({
                city: '北京市'
              });
            }
          })

          that.setData({
            textData: {
              name: '抱歉，未找到结果',
              desc: ''
            }
          });
        }
 },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    }
    if (e && e.keywords) {
      params.querykeywords = e.keywords;
    }
    myAmapFun.getPoiAround(params)
  },
  onReady:function(){
    this.mapCtx = wx.createMapContext('myMap')
  },
  bindInput: function (e) {
    var that = this;
    var url = '../inputtips/input';
    if (e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city) {
      var dataset = e.target.dataset;
      url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude + '&city=' + dataset.city;
    }
    wx.redirectTo({
      url: url
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    })
  },
  makertap: function (data) {
    var that = this;
    console.log(markerdata[data.markerId].longitude)
    var latitude = markerdata[data.markerId].latitude;
    var longitude = markerdata[data.markerId].longitude;
     that.setData({
       latitude: latitude,
       longitude: longitude 
     })
  // var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../img/mapicon_navi_s.png";
      } else {
        data[j].iconPath = "../../img/marker.png";
      }
     /* markers.push({
        id: data[j].id,
        latitude: data[j].latitude,
        longitude: data[j].longitude,
        iconPath: data[j].iconPath,
        width: data[j].width,
        height: data[j].height
      })*/
    }
    app.globalData.destination = that.data.longitude + ',' + that.data.latitude
    console.log(2)
    console.log(app.globalData.destination);
   /* that.setData({
      markers: markers
    });*/
    wx.navigateTo({
      url: "navigation_car/navigation"
    })
  },
  controltap: function (t) {
    var that=this
      console.log(t)
      if (1 === t.controlId) {
        prom.wxPromisify(wx.request)({
          url:'http://39.106.215.155:8888/mixueshop/selectMapping',
          header: {
            "content-type": "json"
          }
        }).then(function (res) {
         markerdata=res.data
          console.log(res.data)
          var marker_new = [];
          res.data.forEach(function (item,index) {
            console.log(res.data[index].id)          
            marker_new.push({
              id: res.data[index].id,
              latitude: res.data[index].latitude,
              longitude: res.data[index].longitude,
              iconPath:" ../../img/marker.png",
              title: res.data[index].name
            })
            that.setData({
              markers: marker_new,
            })
            app.globalData.local_name = this.data.title
          })
        })
      }
      if (2 === t.controlId) {
        wx.navigateTo({
          url: "user"
        })
    } 
    if (3 === t.controlId) {
       {
       that.moveToLocation()
      }
    }
  }
})