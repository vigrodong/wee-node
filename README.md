# nodeweb
## a simple node web library

### how to use 

#### first
> npm i wee-node --save -dev

#### second

>       server.js
        const wee = require('wee-node') 
        const app = wee()
        app.use('/',function(res,req){
            res.send('hello,world');
        })

## api

#### app.use(router,callback,callback)
>       exzample server.js
        app.use('/',function(res,req){  
            res.write('hello!');  
            res.end();
        })

或者   
>
        app.use('/',function(res,req){    
                res.write('hello!');  
                res.end();
            },  
        function(res,req,next){     
            //进入路由的生命周期，before  
            console.log('hello')   
            next();
        })
>       res被添加两个静态方法
        res.send => res.write + res.end
        res.json => 发送json格式的字符串
#### app.static(realDictory,renamedictory)

> app.static('./static');  

>       localhost:8080/static/index.html  

> app.static('./static','img')  

>       localhost:8080/img/one.png

#### app.engine(engine)
>       exzample server.js
       const laytpl = require('laytpl').__express;
       app.engine(laytpl);
       var options = {name:'hello,wee'}
       app.use('/',function(req,res){
            res.render('./index.html',options,function(err,str){
            res.send(str)     
       })
       })

>       index.html
        <html>
        <head>
            <title></title>
        </head>
        <body>
        {{d.name}}
        
        </body>
        </html>     
        
>       result
        hello,wee

#### app.staticnot(callback)


#### app.listen(port,protocol)
> app.listen(8080，'http');
  

开启端口为8080的服务器,第二个参数默认是 http协议 ，暂时只支持，http，和https

#### app.chdir(dictory)


#### app.before(callback)

>       exzample server.js
        app.before(function(req,res,next){  
            req.send('hello');
            next();
        })  

在所有请求到来后首先触发这个，需要用next去继续下面的路由行为

## tool
### wee-file-parse

#### use

> 
        const app = require('wee-node')();
        const file = require('wee-file-parse');
        const fs = require('fs');
        
        app.use('upload',function(req,res){
            var chunks = [];
            req.on('data',function(chunk){
                chunks.push(chunk);
            });
            req.on('end',function(){
                var data = file(chunks);
                fs.writeFile('/'+data.filename,data,(err)=>{
                    if(err){
                        throw err;
                    }
                    console.log('The file has been saved!');
                })
            })
        })

当将收集到上传的chunks传入到解析tool里面，会返回一个对象，该对象有两个属性，一个是上传的文件的body，一个是上传的文件的name
>
        data.file
        data.filename
        














