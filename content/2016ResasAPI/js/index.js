!(function(){
    "use strict"
    console.log("load index.js")

}());

var ww = $(window).width();
var wh = $(window).height();
var index = {
    setMainHeight: function() {
        var mainBorderWidth = 40
        $('.js-main').height(wh -  mainBorderWidth);
    },

    setMapSize: function() {
        var $mapBody = $('.map_body');
        var mapwidth = $mapBody.width();
        var mapheight = $mapBody.height();
        console.log(mapwidth, mapheight);

        var tgtX = (ww - mapwidth/2)/2
        var tgtY = (wh - mapheight/2)/2

        console.log(tgtX,tgtY);

        //$('.map_body').attr('transform', 'translate(' + tgtX + ',' + tgtY + '),scale(.5)');
    },

    init: function () {
        index.setMainHeight();
        index.setMapSize();
	}
}
$(window).load(function () {
	index.init();
});
