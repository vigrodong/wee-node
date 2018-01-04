/**
 * Created by vigro on 2018/1/2.
 */
const fs =require('fs');
const path = require('path')
var  processControl = 0;
function readStatic(staticdir,req,res){
  return new Promise(function(resolve, reject) {
    if (staticdir.length != 0) {
      processControl = 0;
      staticdir.some(function(target) {
        if (req.url.indexOf('/' + target.rename + '/') == 0) {
          var finnaldir = path.join(process.cwd(),req.url.replace('/' + target.rename, target.dir))
          fs.access(finnaldir, function(err) {
            if (err) {
              reject();
            } else {
              var fsStream = fs.ReadStream(finnaldir);
              fsStream.on('finish',function(){
                resolve();
              })
              fsStream.pipe(res);
            }
          });
          return true;
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
  })
}
module.exports = readStatic
