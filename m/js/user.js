$(function () {

    $.ajax({
        type:"get",
        url:'/user/queryUserMessage',
        success: function (data) {

            if(data.error === 400){
                location.href = "login.html";
            }
            console.log(data);
            $(".userinfo").html(template("tpl",data));


        }
    });


    $(".btn_logout").on("click", function () {
        $.ajax({
            type:"get",
            url:"/user/logout",
            success: function (data) {
                if(data.success){
                    location.href = "login.html";
                }
            }
        })
    })


})