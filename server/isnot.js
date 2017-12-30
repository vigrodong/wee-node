const is = Object.prototype.toString;
const isNumber = function(some) {
  return is.call(some) == '[object Number]';
};
const isString = function(some) {
  return is.call(some) == '[object String]';
};
const isBoolean = function(some) {
  return is.call(some) == '[object Boolean]';
};
const isObject = function(some) {
  return is.call(some) == '[object Object]';
};
const isFunction = function(some) {
  return is.call(some) == '[object Function]';
};
const isDate = function(some) {
  return is.call(some) == '[object Date]';
};
const isRegExp = function(some) {
  return is.call(some) == '[object RegExp]';
};
const isArray = function(some) {
  return is.call(some) == '[object Array]';
};
exports.isNumber = isNumber;
exports.isString = isString;
exports.isBoolean = isBoolean;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isDate = isDate;
exports.isRegExp = isRegExp;
exports.isArray = isArray;
