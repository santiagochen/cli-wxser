
//获取应用实例
var app = getApp()

Page({
  
  data : {
    pageArr : [
      
      {name : "sample | 测试", url : ""},
      {name : "sample | 测试", url : ""},
      {name : "sample | 测试", url : ""},
      {name : "sample | 测试", url : ""}
      
    ],
  },

  toggleModal : function(e){
    var that = this;
    this.setData({
      isActive : (!that.data.isActive) ? "is-active" : ""
    })
  },

  toggleModal1 : function(e){
    var that = this;
    this.setData({
      isActive1 : (!that.data.isActive1) ? "is-active" : ""
    })
  },

  toggleModal2 : function(e){
    var that = this;
    this.setData({
      isActive2 : (!that.data.isActive2) ? "is-active" : ""
    })
  }

})
