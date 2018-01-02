/**
 * Created by vigro on 2018/1/2.
 */
const fs =require('fs');

var  processControl = 0;
function readStatic(staticdir,res,req){
  return new Promise(function(resolve, reject) {
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
  })
}
module.exports = readStatic
