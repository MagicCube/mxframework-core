$ns("mx.scn");

mx.scn.Scene = function()
{
    var me = $extend(mx.view.View);
    me.frame = { width: "100%" };
    var base = {};
    
    me.title = null;
    me.subtitle = null;
    me.leftItem = null;
    me.rightItem = null;
    
    me.autoFillParent = false;
    me.isPopup = false;
    me.isSlide = false;
    me.isActive = false;
    
    me.container = null;
    
    me.onactivate = null;
    me.ondeactivate = null;
    
    base.init = me.init;
    me.init = function(p_options)
    {
        base.init(p_options);
        me.$element.addClass("Scene");
    };
    
    
    
    me.setTitle = function(p_title)
    {
    	me.title = p_title;
    	if (me.container != null && me.container.navigationBarView != null)
		{
    		me.container.navigationBarView.setTitle(me.title);
		}
    };
    
    me.setSubtitle = function(p_subtitle)
    {
    	me.subtitle = p_subtitle;
    	if (me.container != null && me.container.navigationBarView != null)
		{
    		me.container.navigationBarView.setSubtitle(me.subtitle);
		}
    };
    
    me.setLeftItem = function(p_leftItem)
    {
    	me.leftItem = p_leftItem;
    	if (me.container != null && me.container.navigationBarView != null)
		{
    		var item = me.container.navigationBarView.setLeftItem(p_leftItem);
    		me.leftItem = item;
		}
    };
    
    me.setRightItem = function(p_rightItem)
    {
    	me.rightItem = p_rightItem;
    	if (me.container != null && me.container.navigationBarView != null)
		{
    		var item = me.container.navigationBarView.setRightItem(p_rightItem);
    		me.rightItem = item;
		}
    };
    
    
    
    
    me.activate = function(p_args, p_isBack)
    {
        if (me.container != null)
        {
            me.container.activeScene = me;
            
            if (me.autoFillParent)
            {
            	if (me.container.$content != null)
        		{
            		me.setFrame({ width: me.container.frame.width, height: me.container.$content.height() });
        		}
            	else
        		{
            		me.setFrame({ width: me.container.frame.width, height: me.container.frame.height });
        		}
            }
            else
        	{
            	if (me.frame != null && me.frame.height != null)
        		{
            		me.setFrame({ width: me.container.frame.width, height: me.frame.height });
        		}
        	}
        }
        
        
        me.setTitle(me.title);
        me.setSubtitle(me.subtitle);
        if (me.leftItem != null)
    	{
        	me.setLeftItem(me.leftItem);
    	}
        me.setRightItem(me.rightItem);
        
        me.isActive = true;
        me.trigger("activate", { args: p_args, isBack: p_isBack ? true : false });
    };
    
    me.deactivate = function()
    {
        me.isActive = false;
        me.trigger("deactivate");
    };
    
    base.hide = me.hide;
    me.hide = function()
    {
        if (me.isPopup)
        {
            me.container.hidePopupScene(me);
        }
        else if (me.isSlide)
        {
            me.container.hideSlideScene(me);
        }
        else if (me.container.activeScene == me)
        {
            me.container.popScene(me);
        }
        else
        {
            base.hide();
        }
    };
    
    me.toString = function()
    {
        return "Activity[" + me.id + "]";
    };
    
    return me.endOfClass(arguments);
};