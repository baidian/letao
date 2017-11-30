$(function () {
    var page = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (data) {
                //console.log(data);
                var html = template("tpl",data);
                $("tbody").html(html);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(data.total / data.size),
                    numberOfPages:5,
                    onPageClicked: function (a,b,c,p) {
                        page = p;
                        render();
                    }
                });
            }
        });
    }
    render();

    $("tbody").on("click",'.btn', function () {
        $("#userModal").modal("show");

        var id = $(this).parent().data("id");

        var isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

        $(".btn_confirm").off().on("click", function () {
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success: function (data) {
                    if(data.success){
                        $("#userModal").modal("hide");
                        render();
                    }
                }
            })
        })

    })
})