MXObject = function()
{
    var me = this;
    
    me.__class__ = MXObject;
    me.__superClasses__ = [];

    me.constructed = false;
    me.disposed = false;
    
    me._ = function(p_options)
    {
        if (me.canConstruct())
        {
            if (isPlainObject(p_options))
            {
                var isEventDispatcher = typeof(me.on) == "function";
                for (var key in p_options)
                {
                    var option = p_options[key];
                    if (isEventDispatcher && typeof(me[key] == "object") && typeof(option) == "function" && key.startsWith("on"))
                    {
                        me.on(key.substr(2), option);
                    }
                    else 
                    {
                        me[key] = option;
                    }
    
                    option = null;
                }
            }
            me.constructed = true;
            
            p_options = null;
        }
    };
    
    
    me.getClass = function()
    {
        return me.__class__;
    };
    
    
    me.canConstruct = function()
    {
        return !me.constructed;
    };

    me.instanceOf = function(p_class)
    {
        if (p_class == me.__class__)
        {
            return true;
        }
        else if (p_class == Object || p_class == MXObject)
        {
            return true;
        }
        else
        {
            return me.__superClasses__.indexOf(p_class) != -1;
        }
    };
    
    me.endOfClass = function(p_arguments)
    {
        if (me.__class__.caller != $extend)
        {
            me._(p_arguments[0]);
        }
        return me;
    };
    
    
    

    me.dispose = function()
    {
        me.disposed = true;
    };
    
    
    
    return me.endOfClass(arguments);
};