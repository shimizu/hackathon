!(function(){
    "use strict"
    console.log("load detail.js")
    
    const key ="laIipCFynb2CgaT7SnJ1c1QxN0LCB9b31AvLM5nO"
    
    const param = {
        prefCode:getParameterByName('prefCode'),
        wagesAge:getParameterByName('wagesAge'),
        sicCode:getParameterByName("sicCode"),        
        simcCode:"-"        
    }
    
    var api = RESASAPI();

    loadPerYear()
    
    
    
    
    //一人当たり賃金データのロード
    function loadPerYear() {
        api.apikey(key)     
        api.type("一人当たり賃金")
    
        api.param(param)
         
        console.log(api.url())
    
        api.on('load', function(data) {
            var valueArray = data.result.data.map(function(d){ return d.value })
            
            var value = valueArray[0]
            console.log(value)
            var prefName = data.result.prefName
            var sicName = data.result.sicName
            
            d3.select("#prefName").text(prefName)
            d3.select("#sicName").text(sicName)
            d3.select("#value").text(value)
        })
         
        api.send()        
    }
    
    function getParameterByName(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}());
