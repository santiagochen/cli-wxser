var config = require('./config'),
    fs = require('fs'),
    _ = require('underscore');
exports = module.exports = {
    hy : {
        hy1 : [],
        hy2 : []
    },

    cleanSymbol : function(data){
        var str = data.replace('<!--', ''),
        str = str.replace('-->', '');
        return str;
    },

    getSingleRaw : function(dir){
        this.dirArr = dir.split("-");

        if( this.dirArr.legnth>1 ){

        }else{
            
        }

        var arr = [config.base,'/',this.dirArr[0],'/',this.dirArr[0],'.wxml'];

        try {
            var _file = fs.readFileSync( arr.join('') );
            _raw = _file.toString();   
            return _raw;
        } catch (error) {
            //console.log("你请求的内容不存在")
            return null;
        }

        
    },

    /*
    解析全部dir的等级关系
    */
    analyseMultiRaw : function(){
        var that = this;
        var _dir = fs.readdirSync( config.base ); 
        _dir.forEach( function(data,index){
            if(data=='index') return;
            that.analyseSingleRaw(data)
        })
    },

    /*
    解析某个dir的等级关系
    */
    analyseSingleRaw : function(dir){
        var _raw = this.getSingleRaw(dir);
        if( _raw ){ 
            this.getComments( _raw.match(config.reg), dir.split("-")[1]?dir.split("-")[1]:null );
        }else{
            //console.log( "你请求的内容不存在" );
            return null;
        }
    },

    /*
    获取等级关系
    */
    getComments : function(comments){
        var that = this;
        var extraMark = arguments[1]?arguments[1]:null; 
        var raw_hy_arr = _.union( comments );
        this.hy.hy1.push( { _parent : null, name : that.cleanSymbol(raw_hy_arr[0]).split('|')[1], value : that.cleanSymbol(raw_hy_arr[0]).split('|')[1] } );
        raw_hy_arr.forEach(function(data,index){
            var str = that.cleanSymbol(data)
            var tempArr = str.split('|');
            if( extraMark ){
                if( extraMark == tempArr[2] || (extraMark=='basic'&&!tempArr[2])  ){
                    that.hy.hy2.push( { 
                        _parent : tempArr[1], 
                        name : tempArr[2]?tempArr[2]:'basic', 
                        value : tempArr[2]?tempArr[2]:'basic', 
                        comment : data 
                    } );
                }
                
            }else{
                that.hy.hy2.push( { 
                    _parent : tempArr[1], 
                    name : tempArr[2]?tempArr[2]:'basic', 
                    value : tempArr[2]?tempArr[2]:'basic', 
                    comment : data 
                } );
            }
            
        }) 
    },

    restoreHy : function(){
        this.hy.hy1 = [];
        this.hy.hy2 = [];
    },

    getWxml : function(obj){
        var arr = [config.base,'/',obj.hy1,'/',obj.hy1,'.wxml']; 
        try {
            var _file = fs.readFileSync( arr.join('') );
            _raw = _file.toString();  
            var ctArr = _raw.split( ( config.preStr + obj.hy1 + ( obj.hy2=='basic'?'':( '|'+ obj.hy2 ) ) + config.postStr ) )
            
            return ctArr[1];
        } catch (error) {
            //console.log("你请求的内容不存在")
            return null;
        }
    },

    getData : function(dir){
        if(dir){
            var _ct = this.analyseSingleRaw(dir);
        }else{
            var _ct = this.analyseMultiRaw();
        }
        return this.hy.hy2.length>0?this.hy:null;
    },

    searchData : function(word){
        var that = this;
        var _dir = fs.readdirSync( config.base ); 
        _dir.forEach( function(data,index){
            if(data=='index') return;
            that.analyseSingleRaw(data)
        });

        //对所有结果过滤
        //找hy2
        this.hy.hy2 = _.filter( this.hy.hy2, function(data){ return data['value'].indexOf(word)>=0 } );
        var tempArr = [];
        this.hy.hy2.forEach(function(data,index){
            tempArr.push( _.findWhere( that.hy.hy1, { name : data._parent } ) )
        })
        that.hy.hy1 = tempArr;

        return this.hy.hy2.length>0?this.hy:null;
    }

}