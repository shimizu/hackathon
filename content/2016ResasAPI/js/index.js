!(function(){
    "use strict"
    console.log("load index.js")

}());

var ww = $(window).width();
var wh = $(window).height();
var index = {
    setMainHeight: function() {
        $('.js-main').height(wh);
    },
    mapClickEvent: function() {
        var $map = $('.main__map');
        var $balloon =$('.main__balloon');
        var $form = $('.form-wrap');
        var defSize = $balloon.height();
        $balloon.height(defSize);
        $map.click(function(event) {
            $balloon.height(wh/2 - 40);
            $('.balloon__text').fadeOut('200');
            $form.addClass('form-wrap--active');
        });
    },

    init: function () {
        index.setMainHeight();
        index.mapClickEvent();
        //index.mapZoom();
	}
}
$(window).load(function () {
	index.init();
});
