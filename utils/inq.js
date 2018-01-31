var inquirer = require('inquirer');
var _ = require('underscore');

function inqSearch(hy){
    var callback=arguments[1]?arguments[1]:null, selected = {};
    hy.hy2cloned = [];
    hy.hy2.forEach(function(data,index){
        var obj = { name : data._parent+'|'+data.value, value : {
            hy1 : data._parent,
            hy2 : data.value
        } };
        hy.hy2cloned.push( obj )
    })

    inquirer.prompt([
        {
            name: 'hy2',
            type: 'list',
            message: '选择涉及'+hy.hy2cloned[0].value.hy2+'的一级种类:',
            choices: hy.hy2cloned.map(function (data) {
                return {
                    name: data.name,
                    value: data.value,
                    short: "您选择了"+data.value.hy1+'的'+hy.hy2cloned[0].value.hy2+"的片段"
                };
            })
        }
    ]).then(function (answers) {
        var obj = answers.hy2;
        if(callback){
            callback(obj);
        }else{
            console.log( "no callback ----" );
            console.log( answers )
            console.log( "no callback ----" );
        }
    });

}

function inqSingle(hy){
    var callback=arguments[1]?arguments[1]:null, selected = {};
    inquirer.prompt([
        {
            name: 'hy2',
            type: 'list',
            message: '选择'+hy.hy1[0].value+'的二级种类:',
            choices: _.sortBy( _.where( hy.hy2, {_parent:hy.hy1[0].value} ), 'name' ).map(function (data) {
                return {
                    name: data.name,
                    value: data.value,
                    short: "您选择了"+data._parent+'的'+data.value+"的片段"
                    
                };
            })
        }
    ]).then(function (answers) {
        answers.hy1 = hy.hy1[0].value;

        if( _.findWhere( hy.hy1, {value:answers.hy1} ).sp==true ){
            answers.sp = true;
        }

        if(callback){
            callback(answers);
        }else{
            console.log( "no callback ----" );
            console.log( answers )
            console.log( "no callback ----" );
        }
    });
}

function inqAll(hy){
    var callback=arguments[1]?arguments[1]:null, selected = {};
    inquirer.prompt([
        {
            name: 'hy1',
            type: 'list',
            message: '选择一级种类:',
            choices: _.sortBy(hy.hy1,'name').map(function (data) {
                return {
                    name: data.name,
                    value: data.value,
                    short: "您选择了"+data.value  
                }
            }) 
        }
        
    ]).then(function (answers1) {
        selected.hy1 = answers1.hy1;
        inquirer.prompt([

            {
                name: 'hy2',
                type: 'list',
                message: '选择'+answers1.hy1+'的二级种类:',
                choices: _.sortBy( _.where( hy.hy2, {_parent:answers1.hy1} ), 'name' ).map(function (data) {
                    return {
                        name: data.name,
                        value: data.value,
                        short: "您选择了"+data._parent+'的'+data.value+"的片段"
                    };
                })
            }

        ]).then(function(answers2){
            selected.hy2 = answers2.hy2; 
            
            if( _.findWhere( hy.hy1, {value:selected.hy1} ).sp==true ){
                selected.sp = true;
            }
            
            if(callback){
                callback(selected);
            }else{
                console.log( "no callback ----" );
                console.log( answers2 )
                console.log( "no callback ----" );
            }

        })
    });

}


module.exports = {
    "inqAll" : inqAll,
    "inqSingle" : inqSingle,
    "inqSearch" : inqSearch
}