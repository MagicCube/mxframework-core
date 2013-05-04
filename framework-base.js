// 判断类型
function isBoolean(p_value)
{
    return typeof(p_value) == "boolean";
}

function isString(p_value)
{
    return typeof(p_value) == "string";
}

function isNumber(p_value)
{
    return typeof(p_value) == "number";
}

function isDate(p_value)
{
    return p_value != null && p_value.constructor == Date;
}

function isArray(p_value)
{
    return p_value != null && (typeof(p_value) == "object" && typeof(p_value.length) == "number" && typeof(p_value.swap) == "function");
}

function isObject(p_value)
{
    return p_value != null && typeof(p_value) == "object";
}

function isPlainObject(p_value)
{
    return $.isPlainObject(p_value);
}

function isFunction(p_value)
{
    return typeof(p_value) == "function";
}

function isClass(p_value)
{
    return typeof(p_value) == "function";
}

function isEmpty(p_value)
{
    return p_value == null || (typeof(p_value) == "string" && p_value.trim() == "");
}

function notEmpty(p_value)
{
    return !isEmpty(p_value);
}




// 类型转换
function parseBoolean(p_text)
{
    if (typeof(p_text) == "boolean")
    {
        return p_text;
    }
    t = p_text.toLowerCase();
    return (t == "true") || (t == "t");
}

var __regex_yyyyM = /^(\S*)-(\S*)$/;
var __regex_yyyyMD = /^(\S*)-(\S*)-(\S*)$/;
var __regex_Hms = /^(\S*):(\S*):(\S*)$/;
var __regex_Hm = /^(\S*):(\S*)$/;
function parseDate(p_text)
{
    if (p_text == null || (typeof(p_text) == "string" && p_text.trim() == ""))
    {
        return null;
    }
    if (isDate(p_text))
    {
       return p_text;
    }
    
    var y = 1900;
    var M = 1;
    var d = 1;
    var H = 0;
    var m = 0;
    var s = 0;
    
    var parts = null;
    var datePart = null;
    var timePart = null;
    p_text = p_text.trim();
    if (p_text.indexOf(" ") != -1)
    {
        parts = p_text.split(" ");
    }
    else if (p_text.indexOf("T") != -1)
    {
        parts = p_text.split("T");
    }
    
    if (parts == null)
    {
        parts = [p_text];
    }
    
    if (parts.length == 1)
    {
        if (parts[0].indexOf(":") != -1)
        {
            timePart = parts[0];
        }
        else
        {
            datePart = parts[0];
        }
    }
    else if (parts.length == 2)
    {
        datePart = parts[0];
        timePart = parts[1];
    }
    
    if (datePart != null)
    {
        var matches = datePart.match(__regex_yyyyMD);
        if (matches == null)
        {
            matches = datePart.match(__regex_yyyyM);
            if (matches != null)
            {
               timePart = null;
            }
            else
            {
                matches = [datePart, datePart];
            }
        }
        if (matches != null)
        {
            if (matches.length >= 2)
            {
                y = parseInt(matches[1], 10);
                if (isNaN(y))
                {
                    y = 1900;
                }
            }
            
            if (matches.length >= 3)
            {
                M = parseInt(matches[2], 10);
                if (isNaN(M) || M > 12 || M <= 0)
                {
                    M = 1;
                }
            }
            
            if (matches.length >= 4)
            {
                var d_max = Date.getDaysInMonth(y, M - 1);
                d = parseInt(matches[3], 10);
                if (isNaN(d) || d <= 0)
                {
                    d = 1;
                }
                else if (d > d_max)
                {
                    d = d_max;
                }
            }
        }
    }
    
    if (timePart != null)
    {
        var matches = timePart.match(__regex_Hms);
        if (matches == null)
        {
            matches = timePart.match(__regex_Hm);
            if (matches == null)
            {
                matches = [timePart, timePart];
            }
        }
        
        if (matches.length >= 2)
        {
            H = parseInt(matches[1], 10);
            if (isNaN(H) || H > 23 || H < 0)
            {
                H = 0;
            }
        }
        
        if (matches.length >= 3)
        {
            m = parseInt(matches[2], 10);
            if (isNaN(m) || m > 60 || m < 0)
            {
                m = 0;
            }
        }
        
        if (matches.length >= 4)
        {
            s = parseInt(matches[3], 10);
            if (isNaN(s) || s > 60 || s < 0)
            {
                s = 0;
            }
        }
    }
    
    return new Date(y, M - 1, d, H, m, s);
};



// 命名空间
function $namespace(p_namespace)
{
    var parts = p_namespace.split(".");
    if (parts.length == 0)
    {
        return null;
    }
    
    var space = null;
    for (var i = 0; i < parts.length; i++)
    {
        if (i == 0)
        {
            space = parts[0];
            try
            {
                eval(space);
            }
            catch (e)
            {
                eval(space + " = {}");
            }
        }
        else
        {
            space += "." + parts[i];
            if (!eval(space))
            {
                eval(space + " = {};");
            }
        }
    }
    return eval(p_namespace);
}
$ns = $namespace;




// 继承
function $extend(p_baseClass)
{
    if (typeof(p_baseClass) == "function")
    {
        var inst = new p_baseClass();
        inst.__class__ = $extend.caller;
        if (p_baseClass != MXObject && p_baseClass != MXComponent)
        {
            inst.__superClasses__.push(p_baseClass);
        }
        return inst;
    }
}




// 获取实例的类型。
function $getclass(p_inst)
{
    if (p_inst == null)
    {
        return null;
    }
    switch (typeof(p_inst))
    {
        case "boolean":
            return Boolean;
            
        case "number":
            return Number;

        case "string":
            return String;
            
        case "function":
            return Function;
            
        case "object":
            if (typeof(p_inst.getClass) == "function")
            {
                return p_inst.getClass();
            }
            else if (isDate(p_inst))
            {
                return Date;
            }
            else if (isArray(p_inst))
            {
                return Array;
            }
            else
            {
                return Object;
            }
    }
}




// 判断 p_inst 是否是 p_class 的实例。
function $instanceof(p_inst, p_class)
{
    if (p_inst == null)
    {
        return false;
    }
    switch (typeof(p_inst))
    {
        case "boolean":
            return p_class == Boolean;
            
        case "number":
            return p_class == Number;

        case "string":
            return p_class == String;
            
        case "function":
            return p_class == Function;
            
        case "object":
            if (typeof(p_inst.instanceOf) == "function")
            {
                return p_inst.instanceOf(p_class);
            }
            else if (isDate(p_inst))
            {
                return p_class == Date;
            }
            else if (isArray(p_inst))
            {
                return p_class == Array;
            }
            else
            {
                return true;
            }
    }
}




// 格式化
function $format(p_value, p_format)
{
    if (isString(p_value) && (isArray(p_format) || isNumber(p_format) || isPlainObject(p_format)))
    {
        return String.format(p_value, p_format);
    }
    if (isNumber(p_value))
    {
        return Number.format(p_value, p_format);
    }
    else if (isDate(p_value))
    {
        return Date.format(p_value, p_format);
    }
    else
    {
        return p_value != null ? p_value.toString() : "";
    }
}