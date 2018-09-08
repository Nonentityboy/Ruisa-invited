var appIdsecret  
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    Code: '',
    success: false,
    state: '',
    chepai:'',
    change:''
  },
  /**
    * 获取验证码
    */
  handleInputname: function (e) {
    this.setData({
      name: e.detail.value
    })
    wx.setStorageSync('name', this.data.name);
  },
  handlechepai: function (e) {
    console.log(e);
    console.log(e.detail.value)
    this.setData({
      chepai: e.detail.value
    })
    app.gloabalData.chepai = e.detail.value
  },
  change: function (e) {
    console.log(e);
    this.setData({
     change: e.detail.value
    })
    wx.setStorageSync('change', this.data.change);
 
  },
  
  submit: function (e) {
    var that = this
    console.log(2222)
    console.log(that.data.chepai)
    if (this.data.name == '') {
      wx.showToast({
        title: '请输入姓名',
        image: '/images/error.png',
        duration: 2000
      })
      return
    } else if (that.data.chepai.length!=8) {
      wx.showToast({
        title: '车牌号码有误',
        image: '/images/error.png',
        duration: 2000
      })
      return
    }
   else {
      var that = this;
    wx.login({
      success: function(res){
        if(res.code){
        wx.request({
          url: 'http://222.24.14.38:8080/Login',
          header: {
            'content-type': 'json'
          },
        data:{
          code: res.code,
          carId: that.data.chepai,
          userName:that.data.name,
          sex:that.data.change
        },
        method:'GET',
       success:function(){
         console.log('777')
      console.log('ok')
     }
    })   
   }
 }
 })
    wx.setStorageSync('chepai', that.data.chepai);
    wx.navigateBack()
 }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  }
})
