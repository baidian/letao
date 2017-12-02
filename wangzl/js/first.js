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

    var $form = $('form');
    $form.bootstrapValidator({
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {

                validators: {
                    notEmpty: {
                        message: "一级分类的名称不能为空"
                    }
                }

            }
        }

    });

    $form.on("success.form.bv", function (e) {
        e.preventDefault();

        //console.log("呵呵");
        $.ajax({
            type: "post",
            url:"/category/addTopCategory",
            data: $form.serialize(),
            success:function(data) {
                if(data.success){

                    //关闭模态框
                    $("#firstModal").modal("hide");
                    //重新渲染第一页，因为新增的分类在第一页。
                    page = 1;
                    render();

                    //需要清空表单的值和样式
                    $form.data("bootstrapValidator").resetForm();
                    //重置表单的value值
                    $form[0].reset();
                }
            }
        });
    });
})
