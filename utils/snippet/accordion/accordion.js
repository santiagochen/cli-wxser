
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

  //Function|toggleAccordion
  toggleAccordion : function(e){
    var that = this;
    this.setData({
      istoggle : that.data.istoggle==true ? false : true
    })
  },

  toggleAccordion1 : function(e){
    var that = this;
    this.setData({
      istoggle1 : that.data.istoggle1==true ? false : true
    })
  },

  toggleAccordion2 : function(e){
    var that = this;
    this.setData({
      istoggle2 : that.data.istoggle2==true ? false : true
    })
  }

})
