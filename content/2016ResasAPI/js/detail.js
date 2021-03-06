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
    loadCPI()

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


    //CPI
    function loadCPI() {
        d3.tsv(dataDir+"cpi.tsv", cast, function(d){
            var nested = d3.nest()
                .rollup(function(d){ return d[0] })
                .key(function(d){ return d["県コード"]})
                .map(d)

            var value = (nested.get(param.prefCode))["消費者物価指数"]
            d3.select("#cpi").text(value)

            var sorted_data = d.sort(function(a, b){
              var ad = 0, bd = 0;
              if(a) ad = a['消費者物価指数'];
              if(b) bd = b['消費者物価指数'];
              return ad - bd;
            });

            var rank = findWithAttr(sorted_data, '県コード', parseInt(param.prefCode)) + 1;
            console.log(rank);
            d3.select("#cpi_rank").text(rank + ' / 47');
        })
    }


    //年間支出
    function loadSpend() {
        d3.tsv(dataDir+"kakei.tsv", cast, function(d){
            var nested = d3.nest()
                .rollup(function(d){ return d[0] })
                .key(function(d){ return d["県コード"]})
                .map(d)

            var value = (nested.get(param.prefCode))["消費支出"]
            d3.select("#spend").text(value / 10000)

        })
    }


    //借家平均家賃
    function loadRent() {
        var rf_data = [];
        d3.tsv(dataDir+"shakuya.tsv", cast, function(d){
            var nested = d3.nest()
                .rollup(function(d){ return d[0] })
                .key(function(d){ return d["県コード"]})
                .map(d)

            var value = (nested.get(param.prefCode))["借家平均家賃"]
            d3.select("#rent").text(d3.format(".2f")(value / 10000))

            var sorted_data = d.sort(function(a, b){
              var ad = 0, bd = 0;
              if(a) ad = a['借家平均家賃'];
              if(b) bd = b['借家平均家賃'];
              return ad - bd;
            });

            var rank = findWithAttr(sorted_data, '県コード', parseInt(param.prefCode)) + 1;
            console.log(rank);
            d3.select("#rent_rank").text(rank + ' / 47');
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

            var sorted_data = d.sort(function(a, b){
              var ad = 0, bd = 0;
              if(a) ad = a['非正規雇用比率'];
              if(b) bd = b['非正規雇用比率'];
              return ad - bd;
            });

            var rank = findWithAttr(sorted_data, '県コード', parseInt(param.prefCode)) + 1;
            d3.select("#regular_rank").text(rank + ' / 47');
            console.log('非正規雇用比率: '+rank);
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


            var sorted_data = d.sort(function(a, b){
              var ad = 0, bd = 0;
              if(a) ad = a['ブラック度'];
              if(b) bd = b['ブラック度'];
              return ad - bd;
            });

            var rank = findWithAttr(sorted_data, '県コード', parseInt(param.prefCode)) + 1;
            console.log('ブラック度: '+rank);
            d3.select("#black_rank").text(rank + ' / 47');
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
    function findWithAttr(array, attr, value) {
      for(var i = 0; i < array.length; i += 1) {
          if(array[i][attr] === value) {
              return i;
          }
      }
      return -1;
    }
}());
