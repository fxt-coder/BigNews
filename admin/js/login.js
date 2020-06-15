$(function () {
  $('.input_sub').on('click', function (e) {
    e.preventDefault();
    var username = $('.input_txt').val().trim();
    var password = $('.input_pass').val().trim();
    if (username == '' || password == '') {
      // alert('账号密码非空');
      $("#myModal .modal-body").text("账号和密码不能为空!");
      $("#myModal").modal();
      return;
    }
    $.ajax({
      type: 'post',
      url: window.BigNew.user_login,
      data: {
        username: username,
        password: password
      },
      success: function (backData) {
        console.log(backData);
        // alert(backData.msg);
        $("#myModal .modal-body").text(backData.msg);
        $("#myModal").modal();
        if (backData.code == 200) {
          window.localStorage.setItem("token", backData.token);
          $('#myModal').on('hidden.bs.modal', function (e) {
            window.location.href = './index.html'
            // do something...
          })
        }
      }
    })
  })
})