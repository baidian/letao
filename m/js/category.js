$(function () {

    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        success: function (data) {
            //console.log(data);
            $(".category_left ul").html(template("tpl",data));

            var id = data.rows[0].id;
            renderSecond(id);

        }
    });

    $(".category_left ul").on("click","li", function () {

        $(this).addClass("now").siblings().removeClass("now");

        var id = $(this).data("id");
        renderSecond(id);

        mui(".mui-scroll-wrapper").scroll()[1].scrollTo(0,0,500);

    });

    function renderSecond(id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id,
            },
            success: function (data) {
                //console.log(data);
                $(".category_right ul").html(template("tpl_right",data));
            }
        })
    }

})
