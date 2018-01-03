const http = require('http');
const https = require('https');
const static = require('./static.js');
const commonRouter = require('./commonRouter.js');
const isFunction = require('./isnot.js').isFunction;
const has = require('./wutil.js').has;
const fs = require('fs');

const wee = function() {
  // 服务的路由设置
  var routers = [];
  // 静态文件的路由设置

  var staticdir = [];
  // 全局进程控制
  var processControl = 0;

  //路由错误的回掉函数
  var notFound = null;

  const app = function(req, res) {

    static(staticdir, res, req).
        then(
            function() {
            }).
        catch(function() {
          commonRouter(routers, req, res).then(function() {

          }).catch(function() {
            if (notFound && isFunction(notFound)) {
              notFound();
            }
            else {
              res.write('404,not fund or have no root');
              res.end();
            }
          });
        });
  };

  //添加路由功能
  app.use = function(url, cb) {
    if (has(routers, 'url', url)) {
      throw new Error('set the same router');
    } else {
      routers.push({
        url: url,
        callback: cb,
      });
    }
  };

  // 改变开发的node的运行环境
  app.chdir = function(dictory) {
    process.chdir(dictory);
  };

  //当使用static功能后 ，次目录文件夹下的所有请求，都将是对静态文件的输入输出，不再参与任何的业务逻辑
  app.static = function(dir, rename) {
    if (has(staticdir, 'rename', rename)) {
      throw new Error('add the same name routers');
    } else {
      staticdir.push({
        dir: dir,
        rename: rename ? rename : dir.replace(/[\.\/]/gi, ''),
      });
    }
  };
  //静态文件不存在的处理方案
  app.staticnot = function(cb) {
    notFound = cb;
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

  //改变当时node的运行进程，符合开发者对目录的操作习惯。
  process.chdir(__dirname);
  return app;
};
module.exports = wee;
