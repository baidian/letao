$(function () {



    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto:true,
                callback :function(){
                    $.ajax({
                        type:"get",
                        url:"/cart/queryCart",
                        success: function (data) {
                            if(data.error === 400){
                                location.href = "login.html?trtUrl=" + location.href;
                            }
                            //console.log(data);
                            $(".mui-table-view").html(template("tpl",{list:data}));

                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

                    }

                })
            }
        }
        }
    });

    $("#OA_task_2").on("tap",".btn_delete", function () {

        var id = $(this).data("id");


        mui.confirm("您是否要删除","温馨提示",["是","否"], function (e) {
            if(e.index === 0){
                $.ajax({
                    type:"get",
                    url:"/cart/deleteCart",
                    data:{
                        id:[id]
                    },
                    success: function (data) {
                        if(data.success){
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        })


    });

    $("#OA_task_2").on("tap",".btn_edit", function (){

        var data = this.dataset;

        var html = template("tpl2",data);

        html = html.replace(/\n/g,"");

        mui.confirm(html,"商品信息",["确认","取消"], function (e){
            if(e.index === 0){
                var id = data.id;
                var size = $('.lt_edit_size span.now').text();
                var num = $('.mui-numbox-input').val();


                $.ajax({
                    type:"post",
                    url:"/cart/updateCart",
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    success: function (data) {
                        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                    }
                })
            }
        });

        $(".lt_edit_size span").on("tap", function () {
            $(this).addClass("now").siblings().removeClass("now");
        });

        mui(".mui-numbox").numbox();
    })


    $("body").on("change",".ck", function (){
        
        var total = 0;
        $(":checked").each(function (i ,e) {
            var price = $(this).data("price");
            var num = $(this).data("num");
            total+=price * num;
        });

        $(".lt_total .total").text(total.toFixed(2));

        
    })

})