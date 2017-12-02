$(function () {

    var page = 1;
    var pageSize = 5;
    var imgs = [];

    function render(){
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
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
                    totalPages:Math.ceil(data.total/data.size),
                    itemTexts: function (type,page,current) {
                        switch (type){
                            case "first":
                                return "首页";
                            case "prev":
                                return "下一页";
                            case "next":
                                return "上一页";
                            case "lase":
                                return "尾页";
                            default:
                                return page;
                        }
                    },
                    tooltipTitles:function(type,page,current){
                        switch (type){
                            case "first":
                                return "首页";
                            case "prev":
                                return "下一页";
                            case "next":
                                return "上一页";
                            case "lase":
                                return "尾页";
                            default:
                                return "跳转到第"+page+"页";
                        }
                    },
                    useBootstrapTooltip:true,
                    onPageClicked:function (a,b,c,p) {
                        page = p;
                        render();
                    }
                });
            }
        })

    }
    render();


    $(".btn_add").on("click", function () {

        //显示添加模态框
        $("#productModal").modal("show");


        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success: function (data) {
                //console.log(data);
                $(".dropdown-menu").html(template("tpl2", data));
            }
        })
    });

    $(".dropdown-menu").on("click","a", function () {

        $(".dropdown-text").text($(this).text());

        $("[name='brandId']").val($(this).data("id"));

        $form.data("bootstrapValidator").updateStatus("brandId", "VALID");

    });


    var $form = $("form");
    $form.bootstrapValidator({
        excluded:[],//不校验的内容
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择品牌"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的库存"
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"请输入一个不是0开头的库存"
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的尺码"
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入正确的尺码，例如（32-46）"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的原价"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的价格"
                    }
                }
            },
            productLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传3张图片"
                    }
                }
            }

        }
    });

    $("#fileupload").fileupload({
        dataType:"json",
        done: function (e,data) {

            if(imgs.length >= 3){
                return false;
            }


            $(".img_box").append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">')

            imgs.push(data.result);

            if(imgs.length === 3){
                $form.data("bootstrapValidator").updateStatus("productLogo","VALID");
            }else{
                $form.data("bootstrapValidator").updateStatus("productLogo","INVALID");
            }
        }
    });


    $form.on("success.form.bv", function (e) {
        e.preventDefault();

        var param = $form.serialize();
        param += "&picName1="+imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
        param += "&picName2="+imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
        param += "&picName3="+imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:param,
            success: function (data) {
                if(data.success){
                    $("#productModal").modal("hide");

                    page = 1;
                    render();

                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();

                    $("[name='brandId']").val('');
                    $(".dropdown-text").text("请选择品牌");
                    $(".img_box img").remove();

                    imgs=[];
                }
            }
        })
    });
});