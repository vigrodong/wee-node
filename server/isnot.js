const is = Object.prototype.toString;
const isNumber = function(some){
	is.call(some) == '[object Number]'
}
const isString = function(some){
	is.call(some) == '[object String]'
}
const isBoolean = function(some){
	is.call(some) == '[object Boolean]'
}
const isObject = function(some){
	is.call(some) == '[object Object]'
}
const isFunction = function(some){
	is.call(some) == '[object Function]'
}
const isDate = function(some){
	is.call(some) == '[object Date]'
}
const isRegExp = function(some){
	is.call(some) == '[object RegExp]'
}
const isArray = function(some){
	is.call(some) == '[object Array]'
}
exports.isnot = {
	isNumber,
	isString ,
	isBoolean,
	isObject,
	isFunction,
	isDate,
	isRegExp,
	isArray
}
