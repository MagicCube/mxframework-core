# MXFramework
MagicCube MXFramework is a lightweight Object-Oriented JavaScript framework.

# Examples
Class: my.namespace.Animal
File:  /scripts/my/namespace/Animal.js
```javascript
// Define a namespace.
$ns("my.namespace");

/**
 * Define a class which extends MXComponent.
 * A MXComponent is a very popular super class.
 * Actually, in this case, we can also use MXObject instead.
 * MXObject is the super class of MXComponent.
 */
my.namespace.Animal = function()
{
	/**
	 * In MXFramework, it always use 'me' instead of 'this'.
	 */
	var me = $extend(MXComponent);
	/**
	 * 'base' is almost the same as 'super' in Java.
	 */
	var base = {};


	/**
	 * Define a public field.
	 * Every public member should under 'me'.
	 */
	me.name = null;

	/**
	 * Define a private field.
	 * The names of a private members always start with an underline.
	 */
	 var _something = null;
	 var _someVariable = 0;


	/**
	 * Override a public method.
	 * 'init' method will be automatically called immediately after the instance is created.
	 * Even though, you can also set the 'autoInit' field to false if you need lazy intialization.
	 */
	base.init = me.init;
	me.init = function(p_options)
	{
		base.init(p_options);
	};


	/**
	 * Define a public function.
	 */
	me.sayHi = function()
	{
		if (_canSayHi())
		{
			return $format("Hi, I'm a {name}", { name: me.name });
		}
	};


	/**
	 * Define a private function.
	 */
	function _beforeSayHi()
	{
		return notEmpty(me.name);
	}


	/**
	 * This is the end of class.
	 */
	return me.endOfClass(arguments);
};
```

# Documents
For documents, see https://github.com/MagicCube/mxframework-core/wiki
