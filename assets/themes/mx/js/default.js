$(function()
{
    var headroom = new Headroom($("header")[0], {
        "tolerance": 5,
        "offset": $("header").data("offset") ? $("header").data("offset") : 280,
        "classes": {
          "initial": "animated",
          "pinned": "slideInDown",
          "unpinned": "slideOutUp"
        }
    });
    headroom.init();
});