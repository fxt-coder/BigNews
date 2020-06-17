$(function () {
  $.ajax({
    type: "get",
    url: BigNew.user_detail,
    success: function (backData) {
      // console.log(backData);
      if (backData.code == 200) {
        for (var key in backData.data) {
          $('.' + key).val(backData.data[key]);
        }
        $('img.user_pic').attr('src', backData.data.userPic);
      }
    }
  });

  // 图片预览
  $('#exampleInputFile').on('change', function () {
    var fileIcon = this.files[0];
    // console.log(fileIcon);
    var url = URL.createObjectURL(fileIcon);
    $('img.user_pic').attr('src', url);
  });

  //三: 点击修改按钮,完成个人信息的修改
  $('button.btn-edit').on('click', function (e) {
    e.preventDefault();
    var fd = new FormData($('#form')[0]);//form表单提交
    $.ajax({
      type: "post",
      url: BigNew.user_edit,
      data: fd,
      contentType: false,
      processData: false,
      success: function (backData) {
        // console.log(backData);
        if (backData.code == 200) {
          alert('修改成功');
          // 第一种方法解决刷新问题
          // parent.window.location.reload();
          // 第二种
          $.ajax({
            url: window.BigNew.user_info,
            success: function (backData) {
              //console.log(backData);
              if (backData.code == 200) {
                //给父页面的显示个人信息的标签设置新的值.
                parent.$(".user_info>span>i").text(backData.data.nickname);
                parent.$(".user_info>img").attr("src", backData.data.userPic);
                parent
                  .$(".user_center_link>img")
                  .attr("src", backData.data.userPic);
              }
            }
          });
        }
      }
    });
  });
})