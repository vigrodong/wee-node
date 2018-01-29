/**
 * Created by vigro on 2018/1/23.
 */
const url = require('url');
const isFunction = require('./isnot.js')('[Object Function]');

function reqExt(req, res, Engine) {
  // extend req
  var chunks = [];
  req.query = url.parse(req.url, true).query;

  req.on('data', function(chunk) {
    chunks.push(chunk);
  });
  req.on('end', function() {
    req.post = chunks;
  });
  // extend res
  if(!isFunction(res.send) || !isFunction(res.json) ){
    res.send = function(str) {
      res.write(str);
      res.end();
    };
    res.json = function(obj) {
      res.write(JSON.stringify(obj));
      res.end();
    };
  }
  // add Engine
  if (isFunction(Engine) && !isFunction(res.render)) {
    res.render = Engine;
  }
};

module.exports = reqExt;