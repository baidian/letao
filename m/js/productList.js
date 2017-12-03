$(function () {

    //1. 获取地址栏中的key对应的值，设置到文本框search_input中
    var key = Tools.getParam("key");
    $(".search_input").val(key);


    //2. 页面加载需要渲染一次
    render();


    //3. 点击按钮，需要渲染一次
    $(".search_btn").on("click", function () {
        //点击按钮的时候，把所有a的now清除，把所有span都向下
        $(".lt_sort a").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");

        render();
    });

    //4. 点击排序的时候，
    $(".lt_sort [data-type]").on("click", function () {

        //如果有now这个类，换箭头
        //如果没有now这个类，移除别人，添加自己,,, 让所有箭头都向下
        var $this = $(this);

        if ($this.hasClass("now")) {
            $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            $this.addClass("now").siblings().removeClass("now");
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }

        render();

    })


    //代码走查 code review

    //需要发送ajax请求，获取后台的数据，把数据渲染到页面中。
    function render() {
        $(".lt_product").html('<div class="loading"></div>');
        //这个就是参数对象
        var param = {};
        param.page = 1;
        param.pageSize = 100;
        //文本框的值是啥，就发送什么
        param.proName = $(".search_input").val().trim();

        //对于price和num， 如果价格被点了，需要发送price  如果库存被点了，需要发送num, 如果都没被点，都不发送
        var $now = $(".lt_sort a.now");
        if ($now.length > 0) {
            //说明有一个被点击了，说明需要排序, 需要给param设置参数，可能是price，也可能是num,需要获取到$now这个元素是price或者type
            var type = $now.data("type");//price num
            var value = $now.find("span").hasClass("fa-angle-down") ? 2 : 1;
            param[type] = value;
        }


        //发送请求
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: param,
            success: function (info) {

                setTimeout(function () {
                    $(".lt_product").html(template("tpl", info));
                }, 1000);

            }
        });

    }

});