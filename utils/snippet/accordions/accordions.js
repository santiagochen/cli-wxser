
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
    var _acindex = e.currentTarget.dataset.acindex;
    if( !that.data.istoggle ){
      that.data.istoggle = [];
    }else{
      for(var i=0; i<that.data.istoggle.length; i++){
        if( i !== parseInt(_acindex) ){
          var _isetter = 'istoggle['+i+']';
          this.setData({
            [_isetter] : false
          })
        }
      }
    }
    var _target = 'istoggle['+_acindex+']';
    this.setData({
      [_target] : that.data.istoggle[_acindex]==true ? false : true
    })
  },

  

})
