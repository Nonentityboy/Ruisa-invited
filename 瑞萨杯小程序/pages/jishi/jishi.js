
Page({
  
  data:{
  num:0,
   hours:0,
   mins:0,
   seconds:0,
   cost: 0,
   timer:'',
   tim:0,
   
   image: 'http://imgx.xiawu.com/xzimg/i4/2775678607/TB2.KhkkXXXXXc6XpXXXXXXXXXX_!!2775678607.jpg'
  },

  previewImage: function (e) {
    console.log(e)
    wx.previewImage({
      current: this.data.image,
      urls: this.data.image.split(',')
    })
  },
  
 getData: function (e) {
   var that=this;
   wx.request({
     url: 'http://192.168.1.181:8080/tinyProgram/counter',
     method: 'get',
     headers: {
       'Content-Type':'application/json'
      },
           success: function (res) {
            
              if (1 == res.data) {
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
                      hours: hours + '时',
                      mins: mins + '分',
                      seconds: seconds + '秒',
                      timer:timer
                    });
                  }, 1000)
                }
   },
        fali:function(){
     }
   })
   
var cost=0;
 function charging() {
      var cleartime = setInterval(function () {
        cost++;
        clearInterval(cleartime);
        that.setData({ cost: cost });
        console.log(cost)
        charging();
      }, 100000)
    }
      charging();
},
pause:function(){
  console.log(this.data.timer);
  clearTimeout(this.data.timer)

},
onLoad: function (options) {
  this.getData();
    /*setInterval(function () {
      getData();
    }, 5000)*/
}
})
