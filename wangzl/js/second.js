$(function(){

    var page = 1;
    var pageSize = 10;
    function render(){

        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (data) {
                //console.log(data);

                $("tbody").html(template('tpl',data));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(data.total / data.size),
                    itemTexts: function (type,page,current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            default:
                                return page;
                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        //type: 如果是具体的页码，类型是page
                        //如果是首页，type：first
                        //上一页：type:prev
                        //下一页:type:next
                        //尾页：last
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            default:
                                return "跳转到第" + page + "页";
                        }

                    },
                    useBootstrapTooltip: true,
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        render();
                    }
                });
            }

        })

    }
    render();

    $(".btn_add").on("click", function () {
        $("#secondModal").modal("show");

        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success: function (data) {
                console.log(data);

                $(".dropdown-menu").html(template("tpl2",data));
            }
        })
    })
    
    $("dropdown-menu").on("click","a", function () {
        $(".dropdown-text").text($(this).text());

        $("[name='categoryId']").val($(this).data("id"));

        $form.data("bootstrapValidator").updateStatus("categoryId","VALID");
    });

    
});
