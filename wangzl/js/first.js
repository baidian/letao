$(function () {

    var page = 1;
    var pageSize = 2;

    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (data) {
                //console.log(data);
                $("tbody").html(template("tpl",data));

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
        })
    }
    render();

    $(".btn-add").on("click", function () {
        $("#firstModal").modal("show");
    });
})
