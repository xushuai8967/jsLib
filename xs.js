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

Date.prototype.format = function (format) {   
    var o = {   
        "M+": this.getMonth() + 1,   
        "d+": this.getDate(),   
        "h+": this.getHours(),   
        "m+": this.getMinutes(),   
        "s+": this.getSeconds(),   
        "q+": Math.floor((this.getMonth() + 3) / 3),   
        "S": this.getMilliseconds()   
    }   
    if (/(y+)/.test(format)) {   
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));   
    }   
    for (var k in o) {   
        if (new RegExp("(" + k + ")").test(format)) {   
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));   
        }   
    }   
    return format;   
}  

/*
 * 用于继承
 * */
XS.extend = function(target, source) {
	for (var p in source) {
	    if (source.hasOwnProperty(p)) {
	        target[p] = source[p];
	    }
	}
	return target;
}

XS.date = {
    getFormatDate : function(date, pattern) {
	if (date == undefined) {   
	    date = new Date();   
    	}   
        if (pattern == undefined) {   
            pattern = "yyyy-MM-dd hh:mm:ss";   
        }   
            return date.format(pattern);   
    },
	
    getSmpFormatDate: function(date, isFull) {   
        var pattern = "";   
        if (isFull == true || isFull == undefined) {   
            pattern = "yyyy-MM-dd hh:mm:ss";   
        } else {   
            pattern = "yyyy-MM-dd";   
        }   
        return this.getFormatDate(date, pattern);   
    } ,
	
    getSmpFormatDateByLong : function (l, isFull) {   
        return this.getSmpFormatDate(new Date(l), isFull);   
    }  
}

/*
 * 验证 工具
 * */
XS.validate = {
	/*
	 * 验证手机号
	 * @param phone number
	 * */
	isMobile: function (value) {
	    var tmp = /^1[3-9]\d{9}$/;
	    var flag = tmp.test(value);
	    if (!flag) {
	        return false;
	    } else {
	       return true;
	    }
	},
	/*
	 * 验证URL
	 * */
	isUri: function (value) {
        var myreg = /((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/;
        if (myreg.test(value)) {
            return true;
        }
        else {
            return false;
        }
    },
	/*
	 * 验证EMAIL
	 * */
    isEmail: function (value) {
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (myreg.test(value)) {
            return true;
        }
        else {
            return false;
        }
    },
    isNumber: function (value) {
        //验证以为数字0-9之间
        var _checkStr = /^[0-9]$/;
        if (!_checkStr.test(value)) {
            return false;
        }
        else {
            return true;
        }
    },
    isInteger: function (value) {
        //验证是否是整数
        var regex = /^[-+]?\d*$/;
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isDouble: function (value) {
        var regex = /^[-\+]?\d+(\.\d+)?$/;
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isTime: function (value) {
        //验证时间格式：10:10:00 也可以是时:分格式
        var time = /^((2[0-3]|\d|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/;
        if (time.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isDate: function (value) {
        //验证日期：2013-01-09 or 2013/2/2(月和日可以是一位和两位数字)
        var regex = /^\d{1,4}(\-|\/)((0?\d)|10|11|12)(\-|\/)(([1-2]\d|30|31)|(0?\d))$/;
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isDateTime: function (value) {
        //验证日期时间：2013-9-9 10:00:00
        var regex = /^\d{1,4}(\-|\/)((0?\d)|10|11|12)(\-|\/)(([1-2]\d|30|31)|(0?\d)) ((2[0-3]|\d|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/;
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isZIP: function (value) {
        //邮编6为数字
        var regex = /^\d{6}$/;
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isCard: function (value) {
        //验证身份证号
        var regex = /^\d{15}(\d{2}[A-Za-z0-9])?$/
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    checkPassWordLen: function (value) {
        var regex = /^[a-zA-Z0-9]{6-20}$/; //验证密码，字符串数字，长度6-20位
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isIP4: function (value) {
        //ip地址
        var regex = /^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$/;
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isTel: function (value) {
        var regex = /^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$/; //电话号码的函数(包括验证国内区号,国际区号,分机号)
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isPicture: function (value) {
        var regex = /(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/; //图片
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isLetter: function (value) {
        var regex = /^[a-zA-Z]+$/; //字母
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isUpperLetter: function (value) {
        var regex = /^[A-Z]+$/;
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isLowerLetter: function (value) {
        var regex = /^[a-z]+$/;
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isQQ: function (value) {
        var regex = /^[1-9]*[1-9][0-9]*$/; //QQ号码
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isRar: function (value) {
        var regex = /(.*)\\.(rar|zip|7zip|tgz)$/; //压缩文件
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isChinese: function (value) {
        var regex = /^[\u0391-\uFFE5]+$/; //仅中文
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    }
    
}















