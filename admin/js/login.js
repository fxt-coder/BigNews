$(function () {
  $('.input_sub').on('click', function (e) {
    e.preventDefault();
    var username = $('.input_txt').val().trim();
    var password = $('.input_pass').val().trim();
    if (username == '' || password == '') {
      alert('账号密码非空');
    }
    $.ajax({
      type: 'post',
      url: 'http://localhost:8080/api/v1/admin/user/login',
      data: {
        username: username,
        password: password
      },
      success: function (backData) {
        console.log(backData);
        alert(backData.msg);
        if (backData.code == 200) {
          window.location.href = './index.html'
        }
      }
    })
  })
})