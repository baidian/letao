$(function () {

    $(".vcode_box button").on("click", function (e) {
        e.preventDefault();

        var $this = $(this);
        $this.prop("disabled",true).text("发送中...").addClass("disabled");

        $.ajax({
            type:"get",
            url:"/user/vCode",
            success: function (data) {
                console.log(data.vCode);

                var count = 5;
                var timer = setInterval(function () {
                    count--;
                    $this.text(count+"秒后再次发送");

                    if(count <= 0){
                        clearInterval(timer);
                        $this.prop("disabled",false).removeClass("disabled").text("再次发送");
                    }
                },1000)
            }
        })
    })


    $(".btn_register").on("click", function (e) {
        e.preventDefault();

        var username = $("[name='username']").val();
        var password = $("[name='password']").val();
        var repassword = $("[name='repassword']").val();
        var mobile = $("[name='mobile']").val();
        var vCode = $("[name='vCode']").val();

        if(!username){
            mui.toast("请输入用户名");
            return false;
        }
        if(!password){
            mui.toast("请输入密码");
            return false;
        }
        if(password != repassword ){
            mui.toast("确认密码与密码不一致");
            return false;
        }
        if(!mobile){
            mui.toast("请输入手机号");
            return false;
        }
        if(!/^1\d{10}$/.test(mobile)){
            mui.toast("请输入正确的手机号");
            return false;
        }
        if(!vCode){
            mui.toast("请输入验证码");
            return false;
        }

        $.ajax({
            type:"post",
            url:"/user/register",
            data:$("form").serialize(),
            success: function (data) {
                if(data.success){
                    mui.toast("注册成功，1秒后跳转登录页");

                    setTimeout(function () {
                        location.href="login.html";
                    },1000)
                }

                if(data.error){
                    mui.toast("data.message");
                }
            }
        })

    })
})