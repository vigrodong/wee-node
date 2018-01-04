/**
 * Created by vigro on 2018/1/3.
 */
const isObject = require('./isnot.js').isObject;
var wuntil = {};
var processControl;//判断受否有属性值

const has = function(array, prop, value) {
  processControl = false;
  array.forEach(function(target) {
    if (target[prop].toString() === value.toString()) {
      processControl = true;
    }
  });
  return processControl;
};

const extend = function(sup, sub) {
  sup = isObject(sup) ? sub : {};
  sub = isObject(sub) ? sub : {};
  for(var prop in sub){
    sup[prop] = sub[prop];
  }
};

wuntil.has = has;
wuntil.extend = has;

module.exports = wuntil;