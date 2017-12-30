const http = require('http');
const https = require('https');
const isRegExp = require('./isnot.js').isRegExp;
const wee = function() {
  var routers = [];

  const app = function(req, res) {
    routers.forEach(function(target) {
      if (isRegExp(target.url)) {
        if (target.url.test(req.url)) {
          target.callback(req, res);
        }
      } else {
        if (req.url == target.url) {
          target.callback(req, res);
        }
      }
    });
  };

  //添加路由功能
  app.use = function(url, cb) {
    routers.push({
      url: url,
      callback: cb,
    });
  };

  //此功能可直接调开启服务器。
  app.listen = function(port, protocol) {
    var port = port ? port : 80;
    var protocol = protocol ? protocol : 'http';
    switch (protocol) {
      case 'http':
        http.createServer(app).listen(port);
        break;
      case 'https':
        https.createServer(app).listen(port);
        break;
      default:
        return false;
    }
  };
  return app;
};
module.exports = wee;
