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
    });


    $(".btn_add_cart").on("click", function () {

        var size = $(".lt_size span.now").text();

        if(!size){
            mui.toast("请选择尺码");
            return false;
        }

        var num = $(".mui-numbox-input").val();


        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                productId:id,
                size:size,
                num:num
            },
            success: function (data) {
                if(data.error === 400){
                    location.href = "login.html?retUrl="+location.href;
                }

                if(data.success){
                    mui.confirm("添加成功","提示",["去购物车","继续逛逛"], function (e) {
                        if(e.index === 0){
                            location.href = "cart.html";
                        }
                    });
                }
            }
        })
    })

})
