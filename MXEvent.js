MXEvent = function()
{
    var me = this;

    me.listeners = [];

    var _onceListeners = null;

    me.addEventListener = function(p_listener, p_once)
    {
        if (typeof (p_listener) == "function" && !me.listeners.contains(p_listener))
        {
            me.listeners.add(p_listener);
            if (p_once === true)
            {
                if (_onceListeners == null)
                {
                    _onceListeners = [];
                }
                _onceListeners.add(p_listener);
            }
        }
    };

    me.insertEventListener = function(p_index, p_listener, p_once)
    {
        if (typeof (p_listener) == "function" && !me.listeners.contains(p_listener))
        {
            me.listeners.insert(p_index, p_listener);
            if (p_once === true)
            {
                if (_onceListeners == null)
                {
                    _onceListeners = [];
                }
                _onceListeners.add(p_listener);
            }
        }
    };

    me.removeEventListener = function(p_listener)
    {
        if (_onceListeners != null)
        {
            _onceListeners.remove(p_listener);
        }
        return me.listeners.remove(p_listener);
    };

    me.clear = function()
    {
        if (_onceListeners != null)
        {
            _onceListeners.clear();
            _onceListeners = null;
        }
        me.listeners.clear();
    };

    me.fire = function(e)
    {
        if (me.listeners != null && me.listeners.length > 0)
        {
            var listeners = me.listeners.clone();
            var toBeRemoved = [];
            for (var i = 0; i < listeners.length; i++)
            {
                var listener = listeners[i];
                listener(e);

                if (_onceListeners != null && _onceListeners.contains(listener))
                {
                    toBeRemoved.add(listener);
                    _onceListeners.remove(listener);
                    if (_onceListeners.length == 0)
                    {
                        _onceListeners = null;
                    }
                }
            }
            for (var i = 0; i < toBeRemoved.length; i++)
            {
                me.listeners.remove(toBeRemoved[i]);
            }
            listeners = null;
        }
    };

    return me;
};
MXEvent.className = "MXEvent";
