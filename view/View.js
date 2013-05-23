$ns("mx.view");

mx.view.View = function()
{
    var me = $extend(MXComponent);
    var base = {};
    
    me.id = null;
    me.$element = null;
    me.$container = null;
    me.elementTag = "div";
    me.elementClass = null;
    me.elementStyle = null;
    
    me.frame = null;
    
    me.parentView = null;
    me.subviews = [];
    
    base._ = me._;
    me._ = function(p_options)
    {
        if (me.frame != null && p_options != null && p_options.frame != null)
        {
            p_options.frame = $.extend(me.frame, p_options.frame);
        }
        base._(p_options);
    };
    
    base.init = me.init;
    me.init = function(p_options)
    {
        base.init(p_options);
        
        if (me.$element == null)
        {
            me.$element = $("<" + me.elementTag + "/>");
        }
        if (me.$container == null)
        {
            me.$container = me.$element;
        }
        
        if (notEmpty(me.$element.attr("id")) && isEmpty(me.id))
        {
            me.id = me.$element.attr("id");
        }
        
        if (isEmpty(me.id) && isEmpty(me.$element.attr("id")))
        {
            me.id = String.newGuid();
        }
        me.$element.attr("id", me.id);
        if (mx.debugMode)
        {
            me.$element.data("view", me);
        }
        
        if (me.elementClass != null)
        {
            me.$element.addClass(me.elementClass);
        }
        
        if (isPlainObject(me.elementStyle))
        {
            me.css(me.elementStyle);
        }
        
        me.setFrame(me.frame);
    };
    
    me.setFrame = function(p_frame, p_animated)
    {
        if (p_frame != null)
        {
            if (me.frame != null)
            {
                me.frame = $.extend(me.frame, p_frame);
            }
            else
            {
                me.frame = p_frame;
            }
            
            if (p_animated)
            {
                me.$element.animate(me.frame, p_animated);
            }
            else
            {
                me.$element.css(me.frame);
            }
            
            if (me.frame.left != null || me.frame.right != null || me.frame.top != null || me.frame.bottom != null)
            {
                me.$element.css("position", "absolute");
            }
        }
    };
    
    me.addSubview = function(p_view, $p_element)
    {
        if (typeof($p_element) == "undefined")
    {
            $p_element = me.$container;
    }
    
    if (isFunction(p_view.placeAt))
    {
            var $container = $("<div/>");
            p_view.placeAt($container);
            $p_element.append($container);
            return;
    }
        
        if ($instanceof(p_view, mx.view.View))
        {
            if (p_view.parentView == me)
            {
                return;
            }
            
            if (p_view.parentView != null)
            {
                p_view.parentView.removeSubview(p_view);
            }
            
            if ($p_element != null)
            {
                $p_element.append(p_view.$element);
            }
            me.subviews.add(p_view);
            
            if (p_view.id != null)
            {
                me.subviews[p_view.id] = p_view;
            }
            p_view.parentView = me;
        }
    };
    
    me.removeSubview = function(p_view)
    {
        if ($instanceof(p_view, mx.view.View))
        {
            p_view.$element.detach();
            me.subviews.remove(p_view);
            if (p_view.id != null)
            {
                me.subviews[p_view.id] = null;
                delete me.subviews[p_view.id];
            }
            p_view.parentView = null;
            p_view = null;
        }
    };
    
    me.clearSubviews = function()
    {
        while (me.subviews.length > 0)
        {
            me.removeSubview(me.subviews[0]);
        }
    };
    
    
    
    me.css = function(p_attrName, p_attrValue)
    {
        if (arguments.length == 1)
        {
            return me.$element.css(p_attrName);
        }
        else if (arguments.length >= 2)
        {
            return me.$element.css(p_attrName, p_attrValue);
        }
    };
    
    me.show = function(p_options)
    {
        me.$element.show(p_options);
    };
    

    me.hide = function(p_options)
    {
        me.$element.hide(p_options);
    };
    
    
    me.toString = function()
    {
        return "View[" + me.id + "]";
    };
    
    return me.endOfClass(arguments);
};

$view = function(p_element)
{
    var $e = $(p_element);
    while ($e.length != 0 && $e.data("view") == null)
    {
        $e = $e.parent();
    }
    return $e.data("view");
};