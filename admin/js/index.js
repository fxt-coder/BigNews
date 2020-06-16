$(function () {
  $.ajax({
    url: BigNew.user_info,
    // headers: {
    //   Authorization: window.localStorage.getItem('token')
    // },
    success: function (backData) {
      // console.log(backData);
      if (backData.code == 200) {
        $('.user_info>span>i').text(backData.data.nickname);
        $('.user_info>img').attr("src", backData.data.userPic);
        $('.user_center_link>img').attr('src', backData.data.userPic);
      }
    }
  });
  // 原生js发送ajax请求访问个人信息, 把token带过去.
  // var xhr = new XMLHttpRequest();
  // xhr.open('get', 'http://localhost:8080/api/v1/admin/user/info');
  // //设置一个请求头
  // xhr.setRequestHeader('Authorization', window.localStorage.getItem('token'));
  // xhr.onload = function () {
  //   console.log(xhr.response);
  // }
  // xhr.send();
  // 登出
  $('.logout').on('click', function () {
    window.localStorage.removeItem('token');
    window.location.href = './login.html';
  });



  // 一级菜单点击事件
  $("div.level01").on('click', function () {
    $(this).addClass('active').siblings('div').removeClass('active');
    if ($(this).index() == 1) {
      $('ul.level02').slideToggle();
      $(this).find('b').toggleClass('rotate0');
      $('ul.level02>li:eq(0)>a')[0].click();
    }
  });
  // 二级菜单点击事件
  $('ul.level02>li').on('click', function () {
    $(this).parent().siblings('div').removeClass('active');
    $(this).addClass('active').siblings('li').removeClass('active');
  });

})