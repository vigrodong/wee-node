const http = require('http');
const router = require('./router.js')();
const fs = require('fs');

router.use(/\/.*/,function(req,res){
	fs.ReadStream('../index.html').pipe(res);
})

http.createServer(router).listen(8990);
