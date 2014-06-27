$(function()
{
    if (window.innerWidth && window.innerWidth >= 720)
    {
        var $docNav = $(".mx-doc-nav");
        var $ul = null;
        $(".mx-doc h1, .mx-doc h2").each(function(p_index, header)
        {
            var $header = $(header);
            var id = $header.text().toLowerCase().replace(/\s/g, "-").replace(/'/g, "-");
            $header.attr("id", id);
            var $li = $("<li><a></li>");
            if (p_index == 0)
            {
                $li.addClass("active");
            }
            $li.children("a").attr("href", "#" + id)
                             .text($header.text());
            if ($header.prop("tagName") == "H1")
            {
                $docNav.append($li);
                $ul = $("<ul class=nav>");
                $li.append($ul);
            }
            else
            {
                $ul.append($li);
            }
        });
        
        $("body").scrollspy({ target: ".mx-doc-nav" });
        $docNav.pin({
            containerSelector: "#mx-doc-container"
        });
    }
    else
    {
        $(".mx-doc").removeClass("col-xs-9");
    }
});