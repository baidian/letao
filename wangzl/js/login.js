$(function () {

  var $form = $("form");
  $form.bootstrapValidator({
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度在6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  })

  $form.on("success.form.bv", function (e) {
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      success: function (data) {
        if(data.success){
          location.href = "index.html";
        }

        if(data.error === 1000){
          $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }

        if(data.error === 1001){
          $form.data("boorstrapValidator").updateStatus("username","INVALID","callback");
        }
      }
    });
  });

  $("[type = 'reset']").on("click", function () {
    $form.data("bootstrapValidator").resetForm();
  });

});