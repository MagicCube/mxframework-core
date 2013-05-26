/*!
 * MXFramework v6.0
 * - A WebApp-Oriented AJAX Framework
 *
 * Copyright 2005-2013. All rights reserved.
 *
 * Create Date: 2012-09-23 20:46
 * First Created by Henry Li (henry.li03@sap.com, henry1943@163.com).
 */


MX = function()
{
    var me = this;
    
    me.runAt = "desktop";
    me.osType = null;
    
    me.debugMode = false;
    me.webContentPath = null;
    me.appContentPath = null;
    
    me.init = function()
    {
        var userAgent = window.navigator.userAgent;
        if (userAgent.contains("iPad") || userAgent.contains("iPhone") || userAgent.contains("iPod"))
        {
            me.runAt = "mobile";
            me.osType = "ios";
        }
        else if (userAgent.contains("Android"))
        {
            me.runAt = "mobile";
            me.osType = "android";
        }
        
        var scripts = document.getElementsByTagName("script");
        var src = scripts[scripts.length - 1].src;
        var mxPath = "/mx/framework-core.js";
        if (src.endsWith(mxPath))
        {
            me.appContentPath = src.substr(0, src.length - mxPath.length);
            var pos = me.appContentPath.lastIndexOf("/");
            me.webContentPath = me.appContentPath.substr(0, pos);
            me.debugMode = true;
        }
        else
        {
            mxPath = "/mx/min.js";
            if (src.endsWith(mxPath))
            {
                me.appContentPath = src.substr(0, src.length - mxPath.length);
                var pos = me.appContentPath.lastIndexOf("/");
                me.webContentPath = me.appContentPath.substr(0, pos);
                me.debugMode = false;
            }
            else
            {
                throw new Error("MXFramework is not well configured.");
            }
        }
    };
    
    me.mappath = function(p_url)
    {
        if (typeof (p_url) != "string") return null;
        
        var url = p_url;
        if (url.indexOf("~/") == 0)
        {
            url = mx.webContentPath + url.substr(1);
        }
        else if (url.indexOf("$/") == 0)
        {
            url = mx.appContentPath + url.substr(1);
        }
        return url;
    };
    $mappath = me.mappath;
    
    
    
    
    me.loadingScripts = [];
    me.loadedScripts = [];    
    me.loadingStyles = [];
    me.loadedStyles = [];
    me.include = function(p_path, p_callback)
    {
        var path = me.mappath(p_path);
        
        var ingList = null;
        var edList = null;
        var type = null;
        if (path.indexOf(".js") == path.length - 3)
        {
            ingList = me.loadingScripts;
            edList = me.loadedScripts;
            type = "js";
        }
        else if (path.indexOf(".css") == path.length - 4)
        {
            if (path.indexOf("/") == -1)
            {
                path = me.getResourcePath(path.substr(0, path.length - 4), "css");
            }
            ingList = me.loadingStyles;
            edList = me.loadedStyles;
            type = "css";
        }
        
        if (ingList[path] != null)
        {
            if (typeof(p_callback) == "function")
            {
                ingList[path].push(p_callback);
            }
        }
        else if (edList[path] != null)
        {
            if (typeof(p_callback) == "function")
            {
                p_callback();
            }            
        }
        else
        {
            _add(ingList, path, ((typeof(p_callback) == "function") ? [ p_callback ] : []));
            if (document.body != null)
            {
                var element = null;
                if (type == "js")
                {
                    element = document.createElement("script");
                }
                else if (type == "css")
                {
                    element = document.createElement("link");
                    element.rel = "stylesheet";
                }
                

                element.onload = me._include_onload;
                element.onerror = me._include_onload;
                if (element.readyState)
                {
                    element.onreadystatechange = me._include_onload;
                }
                
                element.dynamic = true;
                document.body.appendChild(element);
                
                if (type == "js")
                {
                    element.src = path + (me.debugMode ? ("?nocache=" + Math.random()) : "");
                }
                else if (type == "css")
                {
                    element.href = path + (me.debugMode ? ("?nocache=" + Math.random()) : "");
                }
            }
            else
            {
                var tag = null;
                if (type == "js")
                {
                    tag = "<script src='" + path + (me.debugMode ? ("?nocache=" + Math.random()) : "") + "'";
                }
                else if (type == "css")
                {
                    tag = "<link rel='stylesheet' href='" + path + (me.debugMode ? ("?nocache=" + Math.random()) : "") + "'";
                }
                document.write(tag + " onerror='mx._include_onload(event)' onreadystatechange='mx._include_onload(event);' onload='mx._include_onload(event)'></script>");
            }
        }
    };
    $include = me.include;
    
    me._include_onload = function(e)
    {
        e = (e != null ? e : event);
        var element = null;
        if (e.srcElement != null)
        {
            element = e.srcElement;
        }
        else
        {
            element = e.target;
        }
        
        if (element.readyState != null)
        {                        
            if (typeof(element.times) == "undefined" && element.readyState != "complete")
            {
                element.times = 1;
                return;
            }
            
            
        }
        
        element.onload = null;
        element.onerror = null;
        if (element.readyState)
        {
            element.onreadystatechange = null;
        }
        
        var path = null;
        var callbacks = [];
        if (element.tagName == "SCRIPT")
        {
            path = element.src;
            if (me.debugMode)
            {
                path = path.substring(0, path.lastIndexOf("?"));
            }
            if (e.type != "error")
            {
                _add(me.loadedScripts, path, path);
                callbacks = me.loadingScripts[path];
                _remove(me.loadingScripts, path);
            }
            else
            {
                mx.error("Fail to load '" + path + "'.");
            }

        }
        else if (element.tagName == "LINK")
        {
            path = element.href;
            if (me.debugMode)
            {
                path = path.substring(0, path.lastIndexOf("?"));
            }
            if (e.type != "error")
            {
                _add(me.loadedStyles, path, path);
                callbacks = me.loadingStyles[path];
                _remove(me.loadingStyles, path);
            }
            else
            {
                mx.error("Fail to load '" + path + "'.");
            }
        }
        
        
        while (callbacks.length > 0)
        {
            var func = callbacks.pop();
            func(path);
            func = null;
        }
        callbacks = null;
        
        if (me.loadingStyles.length == 0 && me._styleReady_callbacks.length > 0)
        {
            while (me._styleReady_callbacks.length > 0)
            {        
                if (me.loadingStyles.length > 0)
                {
                    break;
                }
                var readyFunc = me._styleReady_callbacks.pop();
                readyFunc();
                readyFunc = null;
            }
        }
        
        if (me.loadingScripts.length == 0 && me._scriptReady_callbacks.length > 0)
        {
            while (me._scriptReady_callbacks.length > 0)
            {    
                if (me.loadingScripts.length > 0)
                {
                    break;
                }
                var readyFunc = me._scriptReady_callbacks.pop();
                readyFunc();
                readyFunc = null;
            }
        }
        
        if ((me.loadingStyles.length == 0 && me.loadingScripts.length == 0 && me._ready_callbacks.length > 0)
                || (me.osType == "android" && me.loadingScripts.length == 0 && me._ready_callbacks.length > 0))
        {
            while (me._ready_callbacks.length > 0)
            {   
                
                if ((me.osType != "android" &&(me.loadingStyles.length > 0 || me.loadingScripts.length > 0))
                       || (me.osType == "android" && me.loadingScripts.length > 0))
                {
                    break;
                }
                var readyFunc = me._ready_callbacks.pop();
                readyFunc();
                readyFunc = null;
            }
        }
    };
    
    
    
    
    me._ready_callbacks = [];
    me.whenReady = function(p_callback)
    {
        setTimeout(function(){
            if (typeof(p_callback) != "function")
            {
                return;
            }
            
            if (me.loadingStyles.length == 0 && me.loadingScripts.length == 0)
            {
                p_callback();
            }
            else
            {
                me._ready_callbacks.push(p_callback);
            }
        }, 0);
    };
    
    me._styleReady_callbacks = [];
    me.whenStyleReady = function(p_callback)
    {
        setTimeout(function(){
            if (typeof(p_callback) != "function")
            {
                return;
            }
            
            if (me.loadingStyles.length == 0)
            {
                p_callback();
            }
            else
            {
                me._styleReady_callbacks.push(p_callback); 
            }
        }, 0);
    };
    
    me._scriptReady_callbacks = [];
    me.whenScriptReady = function(p_callback)
    {
        setTimeout(function(){
            if (typeof(p_callback) != "function")
            {
                return;
            }
            
            if (me.loadingScripts.length == 0)
            {
                p_callback();
            }
            else
            {
                me._scriptReady_callbacks.push(p_callback); 
            }
        }, 0);
    };
    
    
    
    function _add(p_collection, p_key, p_value)
    {
        p_collection[p_key] = p_value;
        p_collection.push(p_key);
    }
    
    function _remove(p_collection, p_key)
    {
        for (var i = 0; i < p_collection.length; i++)
        {
            if (p_collection[i] == p_key)
            {
                p_collection.splice(i, 1);
                break;
            }
        }
    }
    
    
    
    
    


    me.importClass = function(p_fullClassName, p_callback)
    {
        if (me.debugMode)
        {
            var path = me.getClassPath(p_fullClassName);
            if (path != null)
            {
                me.include(path, function()
                {
                    try
                    {
                        var cls = eval(p_fullClassName);
                        if (typeof(cls) == "function")
                        {
                            cls.fullName = p_fullClassName;
                        }
                    }
                    catch (e)
                    {
                        
                    }
                    
                    if (typeof(p_callback) == "function")
                    {
                        p_callback();
                    }
                });
            }
        }
        else
        {
            if (p_fullClassName.startsWith("mx."))
            {
                if (isFunction(p_callback))
                {
                    p_callback();
                }
                return;
            }
            
            if (p_fullClassName.startsWith("lib."))
            {
                var path = me.getClassPath(p_fullClassName);
                if (path != null)
                {
                    me.include(path, p_callback);
                }
            }
            else
            {
                var index = p_fullClassName.indexOf(".");
                if (index != -1)
                {
                    var moduleName = p_fullClassName.substr(0, index);
                    me.include("$/" + moduleName + "/min.js", p_callback);
                }
            }
        }
    };
    $import = me.importClass;
    
    me.getClassPath = function(p_fullClassName)
    {
        return me.getResourcePath(p_fullClassName, "js");
    };
    
    me.getResourcePath = function(p_fullClassName, p_ext, p_auto2x)
    {
        if (isEmpty(p_ext))
        {
            p_ext = "png";
        }
        
        var ext = null;
        if (p_auto2x == true && (p_ext == "png" || p_ext == "jpg"))
        {
            if (window.devicePixelRatio == 2)
            {
                ext = "@2x" + "." + p_ext;
            }
            else
            {
                ext = "." + p_ext;
            }
        }
        else
        {
            ext = "." + p_ext;
        }
        

        
        var parts = p_fullClassName.split(".", 1);
        var path = null;
        if (parts.length == 1)
        {
            if (!me.debugMode)
            {
                if (parts[0] != "lib" && ext == ".css")
                {
                    path = $mappath("$/" + parts[0] + "/res/min.css");
                }
            }
            
            if (path == null)
            {
                var classPath = p_fullClassName.replace(/\./g, "/");
                path = $mappath("$/" + classPath + ext);
            }
        }
        return path;
    };
    
    
    
    
    me.log = function(p_message)
    {
        if (typeof(console) != "undefined")
        {
            console.log("[MX] " + p_message);
        }
    };
    
    me.warn = function(p_message)
    {
        if (typeof(console) != "undefined")
        {
            console.warn("[MX] " + p_message);
        }
    };
    
    me.error = function(p_message)
    {
        if (typeof(console) != "undefined")
        {
            console.error("[MX] " + p_message);
        }
    };
    
    return me;
};


mx = new MX();
mx.init();



$import("mx.MXObject");
$import("mx.MXEvent");
$import("mx.MXComponent");
$import("mx.view.View");
$import("mx.scn.Scene");
$import("mx.app.Application");