(function(){
    
var scripts = document.getElementsByTagName("script");
var src = scripts[scripts.length - 1].src;
var srcPath = src.substr(0, src.lastIndexOf("/mx/") + 1);

if (typeof(jQuery) == "undefined")
{
    include("lib/jquery/jquery.js");
}

include("mx/javascript-extensions.js");
include("mx/framework-base.js");
include("mx/framework-core.js");

function include(p_src)
{
    document.write("<script type='text/javascript' src='" + srcPath + p_src + "'></script>");
}

})();