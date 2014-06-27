---
layout: document
title: Getting Started
description: Setup development environment, and write your first application with MXFramework.
group: navigation
weight: 1
---
{% include JB/setup %}

# Quick Start

Like many other JavaScript frameworks, MXFramework has its own way to define namespace, class and component.
In this quick example, we will demonstrate how to define classes using MXFramework.


```javascript
scripts/your/namespace/Cat.js

$ns("your.namespace");

// Import the super class.
$import("my.namespace.Animal");

/**
 * Cat inherits from Animal.
 */
your.namespace.Cat = function()
{
    var me = $extend(my.namespace.Animal);
    /*
     * Change the initial value of name.
     */
    me.name = "Cat";
    var base = {};

    me.nickName = "kitty";

    base.init = me.init;
    me.init = function(p_options)
    {
        base.init(p_options);
        if (isEmptyString(me.nickName) && isString(me.name))
        {
            me.nickName = me.name;
        }
    };

    /**
     * Override 'sayHi' method.
     */
    base.sayHi = me.sayHi;
    me.sayHi = function()
    {
        // $format is a shortcut to String.format, Date.format and Number.format.
        return base.sayHi() + $format(" You can call me {0}", [ me.nickName ]);
    };

    return me.endOfClass(arguments);
};
```
