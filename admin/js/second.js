$(function () {

    //分页渲染
    var page = 1;
    var pageSize = 4;
    var render = function () {
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (data) {
                $("tbody").html(template("tpl",data));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(data.total/data.size),
                    onPageClicked:function (a,b,c,p) {
                        page = p;
                        render();
                    }
                });
            }
        });
    }
    render();


    $(".btn_add").on("click", function () {

        $("#secondModal").modal("show");

        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                //console.log(data);
                $(".dropdown-menu").html(template("tpl2", data));

            }
        });
    });


    $(".dropdown-menu").on("click","a", function () {
        $(".dropdown-text").text($(this).text());

        $("[name='categoryId']").val($(this).data("id"));

        $form.data("bootstrapValidator").updateStatus("categoryId","VALID");
    });


    $("#fileupload").fileupload({
        dataType:"json",
        done: function (e,data) {
            //console.log(data)
            $(".img_box img").attr("src",data.result.picAddr);

            $("[name='brandLogo']").val(data.result.picAddr);

            $form.data("bootstrapValidator").updateStatus("brandLogo","VALID");

        }
    })

    var $form = $("form");
    $form.bootstrapValidator({
        excluded:[],//不校验的内容
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类的名称"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传品牌图片"
                    }
                }
            }
        }
    });

    $form.on("success.form.bv", function (e) {
        e.preventDefault();

        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$form.serialize(),
            success: function (data) {
                if(data.success){

                    $("#secondModal").modal("hide");

                    page=1;
                    render();

                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();

                    $(".dropdown-text").text("请选择一级分类");
                    $(".img_box img").attr("src","images/none.png");
                    $("[type='hidden']").val('');

                }
            }
        })
    })
});

