MXEvent = function()
{
    var me = this;
    
    me.listeners = [];
    
    me.addEventListener = function(p_listener)
    {
        if (typeof(p_listener) == "function" && !me.listeners.contains(p_listener))
        {
            me.listeners.add(p_listener);
        }
    };
    
    me.insertEventListener = function(p_index, p_listener)
    {
        if (typeof(p_listener) == "function" && !me.listeners.contains(p_listener))
        {
            me.listeners.insert(p_index, p_listener);
        }
    };
    
    me.removeEventListener = function(p_listener)
    {
        return me.listeners.remove(p_listener);
    };
    
    me.clear = function()
    {
        me.listeners.clear();
    };
    
    me.fire = function(e)
    {
        if (me.listeners != null && me.listeners.length > 0)
        {
            var listeners = me.listeners.clone();
            for (var i = 0; i < listeners.length; i++)
            {
                listeners[i](e);
            }
            listeners = null;
        }
    };
    
    return me;
};