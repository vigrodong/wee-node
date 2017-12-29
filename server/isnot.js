const is = Object.prototype.toString;
export const isNumber = function(some){
	is.call(some) == '[object Number]'
}
export const isString = function(some){
	is.call(some) == '[object String]'
}
export const isBoolean = function(some){
	is.call(some) == '[object Boolean]'
}
export const isObject = function(some){
	is.call(some) == '[object Object]'
}
export const isFunction = function(some){
	is.call(some) == '[object Function]'
}
export const isDate = function(some){
	is.call(some) == '[object Date]'
}
export const isRegExp = function(some){
	is.call(some) == '[object RegExp]'
}
export const isArray = function(some){
	is.call(some) == '[object Array]'
}
export default const isnot = {
	isNumber,
	isString ,
	isBoolean,
	isObject,
	isFunction,
	isDate,
	isRegExp,
	isArray
}
