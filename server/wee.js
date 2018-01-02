const http = require('http');
const https = require('https');
const isRegExp = require('./isnot.js').isRegExp;
const isString = require('./isnot.js').isString;
const isFunction = require('./isnot.js').isFunction;
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

    new Promise(function(resolve, reject) {
      if (staticdir.length != 0) {
        processControl = 0;
        staticdir.forEach(function(target) {
          if (req.url.indexOf('/' + target.rename + '/') == 0) {
            fs.access(req.url.replace('/' + target.rename, target.dir), function(err) {
              if (err) {
                reject();
              } else {
                var fsStream = fs.ReadStream(req.url.replace('/' + target.rename, target.dir));
                fsStream.on('finish',function(){
                  resolve();
                })
                fsStream.pipe(res);
              }
            });
          } else {
            processControl++;
          }
        });
        if (processControl == staticdir.length) {
          reject();
        }
      }
      else {
        reject();
      }
    }).then(function() {
      resolve();
    }, function() {

      return new Promise(function(resolve, reject) {
        if (routers.length != 0) {
          processControl = 0;
          routers.forEach(function(target) {
            if (isRegExp(target.url) && target.url.test(req.url)) {
              target.callback(req, res);
              resolve();
              return false;
            } else if (isString(target.url) && req.url == target.url) {
              target.callback(req, res);
              resolve();
              return false;
            }
            else {
              processControl++;
            }
          });
          if (processControl == routers.length) {
            reject();
          }
        } else {
          reject();
        }
      });
    }).then(function() {

    }, function() {
      if (notFound && isFunction(notFound)) {
        notFound();
      }
      else {
        res.write('404,not fund or have no root');
        res.end();
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

  // 改变开发的node的运行环境
  app.chdir = function(dictory) {
    process.chdir(dictory);
  };

  //当使用static功能后 ，次目录文件夹下的所有请求，都将是对静态文件的输入输出，不再参与任何的业务逻辑
  app.static = function(dir, rename) {
    staticdir.push({
      dir: dir,
      rename: rename ? rename : dir,
    });
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
