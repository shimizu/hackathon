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
    
    var api = RESASAPI()
    api.apikey(key)     


    loadWages()
    loadTaxes()
    
    
    
    
    //一人当たり賃金データのロード
    function loadWages() {
        var api = RESASAPI()
        api.apikey(key)     
        api.type("一人当たり賃金")    
        api.param(param)         
    
        api.on('load', function(data) {
            var valueArray = data.result.data.map(function(d){ return d })
                .filter(function(d){ return d.year == "2014" })
            
            var value = valueArray[0].value
            console.log(value)
            var prefName = data.result.prefName
            var sicName = data.result.sicName
            
            d3.select("#prefName").text(prefName)
            d3.select("#sicName").text(sicName)
            d3.select("#value").text(value)
        })
         
        api.send()        
    }
    
    //住民税表示
    function loadTaxes() {
        var api = RESASAPI()
        api.apikey(key)     
        api.type("一人当たり地方税")    
        api.param(param)         
        console.log(api.url())
        api.on('load', function(data) {
            
            var valueArray = data.result.data.map(function(d){ return d })
                .filter(function(d){ return d.year == "2014" })
                        
            d3.select("#taxes").text(valueArray[0].value * 1000 / 10000 )
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
