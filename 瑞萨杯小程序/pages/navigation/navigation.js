var app = getApp();
var prom = require("../../utils/prom.js");
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var destination = getApp().globalData.destination;
var setdestination = getApp().globalData.setdestination;
var markersData = [];
var markerdata = [];
Page({
  data: {
    textName: "",
    textDesc: "",
    markers: [],
    longitude: '',
    latitude: '',
    title: '',
    controls: [
      {
        id: 1,
        iconPath: "../../img/find.png",
        position: {
          left: 110,
          top: 305,
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
          width: 50,
          height: 50
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
      {
        id: 4,
        iconPath: "../../img/map_nav.png",
        position: {
          left: 20,
          top: 10,
          width: 150,
          height: 40
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
    wx.request({
      //  url: 'http://epigroup.tech:8888/Bechoosen',
      url: 'http://epigroup.tech:8888/mixueshop/selectMapping',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({
          markers: res.data
        })
        _this.setData({
          textName: res.data[0].name
        })
        _this.setData({
          textDesc: res.data[0].descript
        })
      }
    })
  },
  onReady: function () {
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
  controltap: function (t) {
    console.log(t)
    if (1 === t.controlId) {
      var _this = this;
      wx.request({
        url: 'http://epigroup.tech:8888/mixueshop/selectMapping',
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          console.log(e.markerId)
          var markerData = res.data;
          var i = e.markerId;
          _this.setData({
            textName: markerData[i].name,
            textDesc: markerData[i].descript,
          });
        }
      })
      for (var j = 0; j < markerData.length; j++) {
        if (markerData[j].status === 0) {
          markerData[j].iconPath = "/img/marker_choice.png";
        }
        else if (markerData[j].status === 1) {
          markerData[j].iconPath = "/img/marker_checked.png";
        }
        else if (markerData[j].status === 2) {
          markerData[j].iconPath = "/img/marker.png";
        }
        markers.push({
          id: markerData[j].id,
          latitude: markerData[j].latitude,
          longitude: markerData[j].longitude,
          status: markerData[j].status,
          iconPath: markerData[j].iconPath,
          width: 30,
          height: 40
        })
        that.setData({
          markers: markers
        });
      }
    }
    else if (2 === t.controlId){
      wx.navigateTo({
        url: 'user',
      })
    }
  },
  markertap: function (e) {
    console.log(e)
    var _this = this;
    wx.request({
      url: 'http://epigroup.tech:8888/mixueshop/selectMapping',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        console.log(e.markerId)
        var markerData = res.data;
        var i = e.markerId;
        _this.setData({
          textName: markerData[i].name,
          textDesc: markerData[i].descript,
        });
        _this.changeMarkerColor(markerData, i);
      }
    })
  },
  changeMarkerColor: function (markerData, i) {
    var that = this;
    var markers = [];
    console.log(markerData[i]);
    for (var j = 0; j < markerData.length; j++) {
      if (j === 1 && markerData[i].id === 1 || j ===  0 && markerData[i].id === 0 ) {
        wx.showModal({
          title: '提示',
          content: '是否选择此车位',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.request({
                url: 'http://epigroup.tech:8888/mixueshop/Bechoosen',
                method: 'GET',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                data: {
                  id: markerData[i].id
                },
                success: function (res) {
                  getApp().globalData.setdestination = markerData[i],
                  getApp().globalData.destination = markerData[i].longitude + ',' + markerData[i].latitude;
                  getApp().globalData.status = markerData[i].status,
                  console.log(getApp().globalData.destination)
                  wx.navigateTo({
                    url: 'navigation_car/navigation',
                  })
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
      else if (markerData[j].status === 0) {
        markerData[j].iconPath = "/img/marker_choice.png" ;
      }
      else if (markerData[j].status === 1) {
        markerData[j].iconPath = "/img/marker_checked.png";
      }
      else if (markerData[j].status === 2) {
        markerData[j].iconPath = "/img/marker.png";
      }
      markers.push({
        id: markerData[j].id,
        latitude: markerData[j].latitude,
        longitude: markerData[j].longitude,
        status: markerData[j].status,
        iconPath: markerData[j].iconPath,
        width: 30,
        height: 40
      })
      that.setData({
        markers: markers
      });
    }
    console.log(markers[i])
  },

})