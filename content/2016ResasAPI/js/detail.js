!(function(){
    "use strict"
    console.log("load detail.js")
    
    const cast = function(d){
        Object.keys(d).forEach(function(key){
            if(!isNaN(+d[key])) d[key] = +d[key]
        })
        
        return d
    }
    
    const key ="laIipCFynb2CgaT7SnJ1c1QxN0LCB9b31AvLM5nO"
    const dataDir = "./data/"
    
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
    loadJob()
    loadFoundation()
    loadSpend()
    loadRent()
    loadRegular()
    loadBlack()
    
    //一人当たり賃金データのロード
    function loadWages() {
        var api = RESASAPI()
        api.apikey(key)     
        api.type("一人当たり賃金")    
        api.param(param)
    
    
        api.on('load', function(data) {
            console.log(data)
            var valueArray = data.result.data.map(function(d){ return d.value })
            
            var value = data.result.data[data.result.data.length-1].value
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
        api.on('load', function(data) {
            
            var value = data.result.data[data.result.data.length-1].value
            d3.select("#taxes").text(value * 1000 / 10000 )
        })
         
        api.send()        
        
    }
    
    //有効求人倍率取得
    function loadJob() {
        var api = RESASAPI()
        api.apikey(key)     
        api.type("有効求人倍率")    
        api.param(param)         
        console.log(api.url())
        api.on('load', function(data) {
            var valueArray = data.result.data.map(function(d){ return d.value })
                        
            d3.select("#job").text(valueArray[valueArray.length-1])
        })
         
        api.send()        
        
    }
    
    //起業のしやすさ
    function loadFoundation() {
        var api = RESASAPI()
        api.apikey(key)     
        api.type("創業比率")    
        api.param(param)         
        api.on('load', function(data) {
            var valueArray = data.result.data.map(function(d){ return d.value })
                        
            d3.select("#foundation").text(valueArray[valueArray.length-1])
        })
         
        api.send()        
        
    }
    
    
    //年間支出
    function loadSpend() {
        d3.tsv(dataDir+"kakei.tsv", cast, function(d){
            var nested = d3.nest()
                .rollup(function(d){ return d[0] })
                .key(function(d){ return d["県コード"]})
                .map(d)
                
            var value = (nested.get(param.prefCode))["消費支出"]    
            d3.select("#spend").text(value)
            
        })
    }



    //借家平均家賃    
    function loadRent() {
        d3.tsv(dataDir+"shakuya.tsv", cast, function(d){
            var nested = d3.nest()
                .rollup(function(d){ return d[0] })
                .key(function(d){ return d["県コード"]})
                .map(d)
                
            var value = (nested.get(param.prefCode))["借家平均家賃"]    
            d3.select("#rent").text(value)
            
        })
    }
    
    //正規雇用比率
    function loadRegular() {
        d3.tsv(dataDir+"jobs.tsv", cast, function(d){
            var nested = d3.nest()
                .rollup(function(d){ return d[0] })
                .key(function(d){ return d["県コード"]})
                .map(d)
                
            var value = (nested.get(param.prefCode))["非正規雇用比率"]
            d3.select("#regular").text(d3.format(".2f")(value))
            
        })
    }
    
    //正規雇用比率
    function loadBlack() {
        d3.tsv(dataDir+"black.tsv", cast, function(d){
            var nested = d3.nest()
                .rollup(function(d){ return d[0] })
                .key(function(d){ return d["県コード"]})
                .map(d)
                
            var value = (nested.get(param.prefCode))["ブラック度"]
            d3.select("#black").text(d3.format(".2f")(value))
            
        })
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
