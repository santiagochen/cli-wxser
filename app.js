#!/usr/bin/env node

var program = require('commander');
var clipboardy = require('clipboardy');
var sniffer = require('./utils/sniffer');
var pkg = require('./package');
var inq = require('./utils/inq');

//遍历获取
program.command('ls')
.description('遍历获取')
.action(function() {
    var list = sniffer.getData();
    if(list){
        inq.inqAll(list, function(data){
            clipboardy.write(sniffer.getWxml( data )).then(console.log("成功获取内容!"));
        })
    }else{
        console.log("对不起, 没有相关片段")
    }
});

//指定获取
program.command('get <cmd>')
.description('选择获取')
.action(function(cmd) {
    var list = sniffer.getData(cmd);
    if(list){
        inq.inqSingle(list,function(data){
            clipboardy.write(sniffer.getWxml( data )).then(console.log("成功获取内容!"));
        })
    }else{
        console.log("对不起, 没有相关片段")
    }
    
});


//通过次级分类名称搜索
/* program.command('ext <cmd>')
.description('搜索获取')
.action(function(cmd) {
    var list = sniffer.searchData(cmd);
    if(list){
        inq.inqSearch(list,function(data){
            clipboardy.write( sniffer.getWxml( data ) ).then(console.log("成功获取内容!"));
        })
    }else{
        console.log("对不起, 搜索不到任何相关片段")
    }
    
}); */

program
.version(pkg.version)
.parse(process.argv);