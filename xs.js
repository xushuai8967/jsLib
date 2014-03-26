(function() {
	window['XS'] = {
		version : '1.0.0',
	}
	
	function $() {
		var elements = new Array();
		for ( var i = 0; i < arguments.length; i++) {
			var element = arguments[i];
			if (typeof element == 'string') {
				element = document.getElementById(element);
			}
			if (arguments.length == 1) {
				return element;
			}
			elements.push(element);
		}
		return elements;
	}
	

	window['XS']['$'] = $;

})();

/*
 * 用于扩展对象
 * 扩展后，target对象将获得source对象的所有属性
 * */
XS.extend = function(target, source) {
	for (var p in source) {
	    if (source.hasOwnProperty(p)) {
	        target[p] = source[p];
	    }
	}
	return target;
}

// 时间工具
XS.date = {
	getNow : function (){
		return new Date();
	},
}
