$(function(){

    var id = Tools.getParam('productId');

    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{
            id:id
        },
        success: function (data) {
            $(".mui-scroll").html(template("tpl",data));


            mui(".mui-slider").slider({
                interval:1000
            });

            $(".lt_size span").on("click", function () {
                $(this).addClass("now").siblings().removeClass("now");
            });

            mui(".mui-numbox").numbox();
        }
    })

})
