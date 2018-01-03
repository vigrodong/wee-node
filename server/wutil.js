/**
 * Created by vigro on 2018/1/3.
 */

var wuntil = {};
var processControl;//判断受否有属性值

const has = function(array, prop, value) {
  processControl = false;
  array.forEach(function(target) {
    if (target[prop] === value) {
      processControl = true;
    }
  });
  return processControl;
};

wuntil.has = has;

module.exports = wuntil;