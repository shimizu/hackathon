var pref_array = [
  { code: 1, name: "北海道" },
  { code: 2, name: "青森" },
  { code: 3, name: "岩手" },
  { code: 4, name: "宮城" },
  { code: 5, name: "秋田" },
  { code: 6, name: "山形" },
  { code: 7, name: "福島" },
  { code: 8, name: "茨城" },
  { code: 9, name: "栃木" },
  { code: 10, name: "群馬" },
  { code: 11, name: "埼玉" },
  { code: 12, name: "千葉" },
  { code: 13, name: "東京" },
  { code: 14, name: "神奈川" },
  { code: 15, name: "新潟" },
  { code: 16, name: "富山" },
  { code: 17, name: "石川" },
  { code: 18, name: "福井" },
  { code: 19, name: "山梨" },
  { code: 20, name: "長野" },
  { code: 21, name: "岐阜" },
  { code: 22, name: "静岡" },
  { code: 23, name: "愛知" },
  { code: 24, name: "三重" },
  { code: 25, name: "滋賀" },
  { code: 26, name: "京都" },
  { code: 27, name: "大阪" },
  { code: 28, name: "兵庫" },
  { code: 29, name: "奈良" },
  { code: 30, name: "和歌山" },
  { code: 31, name: "鳥取" },
  { code: 32, name: "島根" },
  { code: 33, name: "岡山" },
  { code: 34, name: "広島" },
  { code: 35, name: "山口" },
  { code: 36, name: "徳島" },
  { code: 37, name: "香川" },
  { code: 38, name: "愛媛" },
  { code: 39, name: "高知" },
  { code: 40, name: "福岡" },
  { code: 41, name: "佐賀" },
  { code: 42, name: "長崎" },
  { code: 43, name: "熊本" },
  { code: 44, name: "大分" },
  { code: 45, name: "宮崎" },
  { code: 46, name: "鹿児島" },
  { code: 47, name: "沖縄" }
];


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
            $zoomOff.fadeIn(200);
        });
        $zoomOff.click(function(event) {
            $balloon.height(defSize);
            $('.balloon__text').fadeIn('200');
            $form.removeClass('form-wrap--active');
            $zoomOff.fadeOut(200);
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

            rects.attr('opacity', '.5')
            rect.attr('opacity', '1')
            d3.select('#prefCode').attr('value', pref_array.filter(function(d){return d.name==rect.attr('data-pref')})[0].code)
            d3.select('#prefName').text(rect.attr('data-pref'))

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
            .attr('opacity', '1')


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
