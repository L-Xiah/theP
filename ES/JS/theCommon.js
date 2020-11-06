


(function () {

//region unUsed
    function getParamName() {}
    function fn() {
        var param1 = 0;
        var paramThe = 1;
        console.log(getParamName(param1));
        console.log(getParamName(paramThe));
    }

    function callWithVariableName(fn) {
        eval('(' + fn.toString().replace(/\bgetParamName\s*\(([a-zA-Z_$][\w_$]*)\)/g, function(u, v) {
            return "'" + v + "'"
        }) + '())')
    }

    var unUsedFunc = function (param) {
        //console.log("--thePk--unUsedFunc------/" + param);
        if(!param && !!param) {
            console.log("--unUsedFunc--" + param);
            callWithVariableName(fn);
        }
    };

//endregion


//region Number

//给Number类型增加一个div方法，调用起来更加方便。
    Number.prototype.div = function (arg) {
        return accDiv(this, arg);
    };

//给Number类型增加一个mul方法，调用起来更加方便。
    Number.prototype.mul = function (arg) {
        return accMul(arg, this);
    };

//给Number类型增加一个add方法，调用起来更加方便。
    Number.prototype.add = function (arg) {
        return accAdd(arg, this);
    };

//endregion

//region "Date"
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };


    Date.prototype.Mon = function () {
        //这周一
        var rel = this;
        rel.setDate(rel.getDate()-(this.getDay()?this.getDay()-1:6));
        return rel;
    }

//endregion

}());

/**格式化数字为一个定长的字符串，前面补０
 *参数:
 * Source 待格式化的字符串
 * Length 需要得到的字符串的长度
 * @return {string}
 */
function FormatNum(Source,Length){
    var strTemp="";
    for(var i=1;i<=Length-Source.length;i++){
        strTemp+="0";
    }
    return strTemp+Source;
}

/**
 * 字符串转json对象
 * @param funStrJson
 * @returns {any}
 * @constructor
 */
function StringToJson(funStrJson) {
    return eval('(' + funStrJson + ')');
}

//region Number

//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    // noinspection JSUnresolvedFunction
    return (r1 / r2) * Math.pow(10, t2 - t1);
    // // noinspection JSAnnotator
    // with(Math){
    //
    // }
}

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m
}


//endregion

/**
 * 小数保留有效位数，(主要针对于0.00**这种小数保留有效位数)
 *
 * @param {number} funFlo
 * @param {number} funL
 * @returns
 */
function theFixed(funFlo, funL) {
    
    if ((typeof funFlo) != "number") {
        return null;
    }

    if (funFlo < 1 && funFlo > -1 ) {
        var theReg = /0\.0*/;
        var temp = theReg.exec(funFlo);
        var tempCon = 1;
        var tempExp = 0;
        if (temp) {
            tempExp = temp[0].length - 2;
            tempCon = Math.pow(10, tempExp) ;
        }
        var tempFlo = funFlo.mul(tempCon);
        tempFlo = tempFlo.toFixed(funL);

        var tempStr0 = "0";
        tempStr0 = "0." + tempStr0.repeat(tempExp);
        return tempFlo.replace("0.", tempStr0)

    } else {
        return funFlo.toFixed(funL);
    }



}


