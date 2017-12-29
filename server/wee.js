const wee = function(){
	var routers=[];
	const routercb = function(req,res){
		routers.forEach(function(target){
			if(typeof(target.url) == 'object'){
				if(target.url.test(req.url)){
					target.callback(req,res)
				}
			}else{
				if(req.url == target.url){
					target.callback(req,res)
				}
			}
			
		})
	}
	routercb.use = function(url,cb){
		routers.push({
			url:url,
			callback:cb
		})
	}
	return routercb;
}
module.exports = wee;
