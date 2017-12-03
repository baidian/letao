mui(".mui-scroll-wrapper").scroll({
    indicators:false
});

mui(".mui-slider").slider({
    interval:2000
});

var Tools = {
    getParamObj: function () {
        var search = location.search;

        search = decodeURI(search);

        search = search.slice(1);

        var arr = search.split("&");

        var obj = {}
        arr.forEach(function(e){
            var key = e.split("=")[0];
            var value = e.split("=")[1];
            obj[key] = value;
        });

        return obj;
    },
    getParam:function(key){
        return this.getParamObj()[key];
    }
}