/**
 * Created by vigro on 2018/1/2.
 */
const isRegExp = require('./isnot.js').isRegExp;
const isString = require('./isnot.js').isString;

var processControl = 0;
function commonRouter(routers, req, res) {
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
}

module.exports = commonRouter;