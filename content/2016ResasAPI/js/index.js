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

    setMapSize: function() {

    },

    init: function () {
        index.setMainHeight();
        index.setMapSize();
	}
}
$(window).load(function () {
	index.init();
});
