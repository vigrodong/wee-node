/**
 * Created by vigro on 2018/1/23.
 */
const url = require('url')

function reqExt(req,res,Engine){
  req.query = url.parse(req.url,true).query;
  req.post = [];
  req.on('data',function(chunk){
    req.post.push(chunk)
  });
  if(!isFunction(res.send) || !isFunction(res.json)){
    res.send = function(str) {
      res.write(str);
      res.end();
    };
    res.json = function(obj) {
      res.write(JSON.stringify(obj));
      res.end();
    };
  }
  if(isFunction(Engine) && !isFunction(res.render)){
    res.render = Engine;
  }
}

module.exports = reqExt;