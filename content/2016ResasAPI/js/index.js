!(function(){
    var zoom = 2
    var viewPort = [1012, 888]

    var t = d3.transition()
        .duration(1000)


    var stageWidth = document.querySelector(".main__map").clientWidth
    var stageHeight = document.querySelector(".main__map").clientHeight

    //console.log("stage", [stageWidth, stageHeight])

    var map = d3.select("#main_map")
    var rects = map.selectAll("rect")

    //ズーム処理
    rects.on("click", function(){
        rect = d3.select(this)

        var x = +rect.attr("x")
        var y = +rect.attr("y")
        var w = +rect.attr("width")
        var h = +rect.attr("height")

        //console.log("rect", [x,y,w,h])

        var nx = (viewPort[0]/2 -(w/2)) / zoom
        var ny = (viewPort[1]/2 -(h/2)) / zoom

        rects
        .transition()
        .duration(1000)
        .attr("transform", 'translate('+(0-x)+','+(0-y)+'),translate('+nx+','+ny+')')


        map
        .transition()
        .duration(1000)
        .attr("transform", "scale("+zoom+")")
    })

    //ズーム解除処理
    d3.select("#zoom-off").on("click", function(){
        rects
        .transition()
        .duration(1000)
        .attr("transform", 'translate(0, 0)')

        map
        .transition()
        .duration(1000)
        .attr("transform", "scale(1)")
    })
}());

var ww = $(window).width();
var wh = $(window).height();
var index = {
    setMainHeight: function() {
        $('.js-main').height(wh);
    },
    mapClickEvent: function() {
        var $map = $('.main__map');
        var $zoomOff = $('#zoom-off');
        var $balloon =$('.main__balloon');
        var $form = $('.form-wrap');
        var defSize = $balloon.height();
        $balloon.height(defSize);
        $map.click(function(event) {
            $balloon.height(wh/2 - 40);
            $('.balloon__text').fadeOut('200');
            $form.addClass('form-wrap--active');
        });
        $zoomOff.click(function(event) {
            $balloon.height(defSize);
            $('.balloon__text').fadeIn('200');
            $form.removeClass('form-wrap--active');
        });
    },
    mapZoom: function () {

        var zoom = 2
        var viewPort = [1012, 888]

        var t = d3.transition()
            .duration(1000)


        var stageWidth = document.querySelector(".main__map").clientWidth
        var stageHeight = document.querySelector(".main__map").clientHeight

        //console.log("stage", [stageWidth, stageHeight])

        var map = d3.select("#main_map")
        var rects = map.selectAll("rect")

        //ズーム処理
        rects.on("click", function(){
            rect = d3.select(this)

            var x = +rect.attr("x")
            var y = +rect.attr("y")
            var w = +rect.attr("width")
            var h = +rect.attr("height")

            //console.log("rect", [x,y,w,h])

            var nx = (viewPort[0]/2 -(w/2)) / zoom
            var ny = (viewPort[1]/2 -(h/2)) / zoom

            rects
            .transition()
            .duration(1000)
            .attr("transform", 'translate('+(0-x)+','+(0-y)+'),translate('+nx+','+ny+')')


            map
            .transition()
            .duration(1000)
            .attr("transform", "scale("+zoom+")")
        })

        //ズーム解除処理
        d3.select("#zoom-off").on("click", function(){
            rects
            .transition()
            .duration(1000)
            .attr("transform", 'translate(0, 0)')


            map
            .transition()
            .duration(1000)
            .attr("transform", "translate(0, 250)")
        })

    },

    init: function () {
        index.setMainHeight();
        index.mapClickEvent();
        index.mapZoom();
	}
}
$(window).load(function () {
	index.init();
});
