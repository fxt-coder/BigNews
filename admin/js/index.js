$(function () {
  $.ajax({
    url: 'http://localhost:8080/api/v1/admin/user/info'
    , headers: {
      Authorization: window.localStorage.getItem('token')
    }, success: function (backData) {
      console.log(backData);
      if (backData.code == 200) {
        $('.user_info>span>i').text(backData.data.nickname);
        $('.user_info>img').attr('src', backData.data.userPic);
        $('.user_center_link>img').attr('src', backData.data.userPic);
      }
    }
  });
  $('.logout').on('click', function () {
    window.localStorage.removeItem('token');
    window.location.href = './login.html';
  });
})