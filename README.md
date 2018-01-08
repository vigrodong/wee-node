# nodeweb
## a simple node web library

### how to use 

#### first
> npm i wee-node --save -dev

#### second

> const wee = require('wee-node') 

> const app = wee()

## api

#### app.use(router,callback,callback)

> app.use('/',function(res,req){  

>      res.write('hello!');  
>      res.end();

> })

或者   
>app.use('/',function(res,req){    

>      res.write('hello!');  
>      res.end();
> },  
>  function(res,req,next){     
 
>       //进入路由的生命周期，before  
>       console.log('hello')   
>       next();
>})
#### app.static(realDictory,renamedictory)

> app.static('./static');  

>       localhost:8080/static/index.html  

> app.static('./static','img')  

>       localhost:8080/img/one.png



#### app.staticnot(callback)


#### app.listen(port,protocol)
> app.listen(8080，'http');
  

开启端口为8080的服务器,第二个参数默认是 http协议 ，暂时只支持，http，和https

#### app.chdir(dictory)


#### app.before(callback)

> app.before(function(req,res,next){  

>       req.send('hello');
>       next();

>})  

在所有请求到来后首先触发这个 ，需要用next去继续下面的路由行为
