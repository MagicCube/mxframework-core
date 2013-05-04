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
        for (var i = 0; i < me.listeners.length; i++)
        {
            me.listeners[i](e);
        }
    };
    
    return me;
};