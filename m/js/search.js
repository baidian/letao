$(function () {

    function getHistory(){
        var history = localStorage.getItem("history") || '[]';

        var arr = JSON.parse(history);
        return arr;

    }

    function render(){
        var arr = getHistory();

        $(".lt_history").html(template("tpl",{arr:arr}));
    }

    render();

    $(".lt_history").on("click",".btn_empty", function () {

        mui.confirm("您是否要清空所有的历史记录?","温馨提示",["取消","确定"], function (e) {
            if(e.index === 1){
                localStorage.removeItem("history");
                render();
            }

        })
    });

    $(".lt_history").on("click",".btn_delete",function(){

        mui.confirm("你确定要删除吗","温馨提示", ["否","是"], function (e) {
            //console.log(this);
            if (e.index === 1) {
                var  index = $(this).data("index");

                var arr = getHistory();

                arr.splice(index,1);

                localStorage.setItem("history",JSON.stringify(arr));

                render();
            }
        })

    })

    $(".lt_search button").on("click", function () {

        var key = $(".lt_search input").val().trim();
        $(".lt_search input").val("");
        if(key === ""){
            mui.toast("请输入搜索关键字");
            return false;
        }
        var arr = getHistory();


        var index = arr.indexOf(key);

        if(index != -1){
            arr.splice(index, 1);
        }


        if(arr.length >= 10){
            arr.pop();
        }



        arr.unshift(key);

        localStorage.setItem("history",JSON.stringify(arr));

        render();

        location.href = 'productList.html?key='+key;
    })

})
