$(function () {

    //需要发送ajax请求获取用户数据
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                var html = template('tpl', data);
                $('tbody').html(html);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / data.size),
                    numberOfPages: 5,
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;

                        render();
                    }
                });
            }


        });
    }

    render();


    $("tbody").on("click", ".btn", function () {

        $("#userModal").modal("show");

        var id = $(this).parent().data("id");

        var idDelete = $(this).hasClass("btn-danger") ? 0 : 1;

        $(".btn_confirm").off().on("click", function () {
            $.ajax({
                type:"post",
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:idDelete
                },
                success: function (data) {
                    if(data.success){
                        $("#userModal").modal("hide");

                        //重新渲染表格
                        render();
                    }
                }
            })
        })
    })

})